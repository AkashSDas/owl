import crypto from "crypto";
import { Document, model, Schema } from "mongoose";
import MongoPaging from "mongo-cursor-pagination";

type HashPassword = (password: string) => string;
type Authenticate = (password: string) => boolean;

/**
 * Note - Keep properties of UserDocument and UserSchema in sync (that's dev work)
 */
export type UserDocument = Document & {
  email: string;
  username: string;
  profilePicURL: string;
  dateOfBirth: Date;
  roles: string[];

  salt: string;
  encryptPassword: string;
  _password?: string;
  hashPassword: HashPassword;
  authenticate: Authenticate;

  createdAt: Date;
  updatedAt: Date;
};

const UserSchema = new Schema<UserDocument>(
  {
    email: { type: String, required: true, unique: true, trim: true },
    username: { type: String, required: true, trim: true, maxlength: 64 },
    profilePicURL: {
      type: String,
      required: true,
      default: process.env.DEFAULT_USER_PROFILE_PIC_URL,
    },
    dateOfBirth: { type: Date, required: true },

    // Current roles are - student, teacher
    roles: { type: [String], default: ["student"], required: true },

    salt: { type: String, required: true },
    encryptPassword: { type: String, required: true },
  },
  { timestamps: true }
);

/**
 * Hashing user's password before creating a user
 */
const hashPassword: HashPassword = function (this: UserDocument, password) {
  // if password's length is less than 6 then returning empty string which will
  // cause error since encryptPassword field is required
  if (password.length < 6) return "";

  try {
    return crypto
      .createHmac("sha256", this.salt)
      .update(password)
      .digest("hex");
  } catch (err) {
    return "";
  }
};
UserSchema.methods.hashPassword = hashPassword;

/**
 * Authenticate user with given password and saved hash
 */
const authenticate: Authenticate = function (this: UserDocument, password) {
  return this.hashPassword(password) === this.encryptPassword;
};
UserSchema.methods.authenticate = authenticate;

/**
 * Setter - hashing the given password by user and saving user's salt and encrypted password
 * Getter - returning user's password rather than encrypted password when asked for password using password as property
 *
 * I'm not sure to include _password field in UserDocument without which this._password will give
 * type error as _password is not in UserDocument, this can be avoided by either
 * - setting _password field in UserDocument, or
 * - casting this._password to any and then setting password to it
 *
 * Virtual property is not stored in MongoDB, they are typically used for computed properties
 * on documents. These won't be displayed on client side as we've not set virtual=true
 * for any option in UserSchema.
 *
 * If you want the virtual field to be displayed on client side, then set
 * {virtuals: true} for toObject and toJSON in schema options
 */
UserSchema.virtual("password")
  .set(function (this: UserDocument, password: string): void {
    this._password = password;
    this.salt = crypto.randomUUID();
    this.encryptPassword = this.hashPassword(password);
  })
  .get(function (this: UserDocument) {
    return this._password;
  });

// Pagination
UserSchema.plugin(MongoPaging.mongoosePlugin, { name: "paginateUser" });

const User = model<UserDocument>("User", UserSchema);
export default User;
