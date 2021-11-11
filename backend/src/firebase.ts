import { config } from "dotenv";
import * as firebaseAdmin from "firebase-admin";

if (process.env.NODE_ENV !== "production") config();

const serviceAccount = require("../serviceAccountKey.json");
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

export const bucket = firebaseAdmin.storage().bucket();
