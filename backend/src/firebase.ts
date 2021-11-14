import { config } from "dotenv";
import * as firebaseAdmin from "firebase-admin";
import { File } from "formidable";
import { v4 } from "uuid";
import { runAsync } from "./utils";

if (process.env.NODE_ENV !== "production") config();

const serviceAccount = require("../serviceAccountKey.json");
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

export const bucket = firebaseAdmin.storage().bucket();

/**
 * Delete file in firebase storage
 *
 * @param destination - folder location in firebase storage where the file
 * is which you want to delete
 *
 * @remarks
 *
 * Here we don't delete the file but the folder in which the file is
 *
 * Be careful with `deleteFiles` used in this function as if empty string
 * is passed in the destination (i.e. prefix) then it will delete everything
 * in the bucket
 *
 * @returns Whether the file was deleted successfully or not
 */
export const deleteFileInFirebaseStorage = async (destination: string) => {
  // Note: Be careful with deleteFiles, if empty string is passed to prefix
  // then it will delete everything in the bucket
  const [, err] = await runAsync(bucket.deleteFiles({ prefix: destination }));

  // If there's only one file to be deleted then use the below method
  // Here destination will be destination of the file (with filename) and not
  // just the folder name in which the file is (which is the current case
  // with this function)
  // const [, err] = await runAsync(bucket.file(destination).delete());

  if (err) return false;
  return true;
};

/**
 * Save file to firebase storage
 *
 * @param destination - The folder name in which the file should be saved
 * @param metadata - Its an Object which will have contentType (if want to specific)
 * @returns Public URL of the file if the file is saved successfully else empty string
 * representing that file wasn't saved
 */
export const uploadToFirebaseStorage = async (
  destination: string,
  file: File,
  metadata = null
) => {
  const filename = file.originalFilename;
  destination = `${destination}/${filename}`;
  const uuid = v4();

  const [, err] = await runAsync(
    bucket.upload(file.filepath, {
      destination,
      metadata: {
        ...(metadata && metadata),
        metadata: { firebaseStorageDownloadTokens: uuid },
      },
    })
  );

  if (err) return "";
  const url =
    "https://firebasestorage.googleapis.com/v0/b/" +
    bucket.name +
    "/o/" +
    encodeURIComponent(destination) +
    "?alt=media&token=" +
    uuid;
  return url;
};
