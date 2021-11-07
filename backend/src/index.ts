// First loading env variables and then importing from other modules
import { config } from "dotenv";
import { connect } from "mongoose";

// Load env variables
if (process.env.NODE_ENV !== "production") config();

import { app } from "./api";

// Connect to MongoDB
connect(process.env.MONGODB_CONNECT_URL)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) =>
    console.log(`Cannot connect to MongoDB Atlas\nError: ${err}`)
  );

// Start the server
const port = process.env.PORT || 8000;
app.listen(port, () =>
  console.log(`API is available on http://localhost:${port}`)
);
