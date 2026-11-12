import "dotenv/config";
import mongoose from "mongoose";

const collection = "addresses";

try {
  await mongoose.connect(process.env.MONGO_URI);
  const addresses = mongoose.connection.db.collection(collection);
  const indexes = await addresses.indexes();

  // Remove the old global unique index. It incorrectly prevents different
  // users from having the same address type.
  if (indexes.some((index) => index.name === "type_1")) {
    await addresses.dropIndex("type_1");
  }

  await addresses.createIndex(
    { user: 1, type: 1 },
    { unique: true, name: "user_1_type_1" }
  );
  console.log("Address type index migrated to be unique per user.");
} catch (error) {
  console.error("Could not migrate the address type index:", error);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
