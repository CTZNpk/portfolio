import { MongoClient } from "mongodb";

declare global {
  var portfolioMongoClientPromise: Promise<MongoClient> | undefined;
}

export function hasMongoConfig() {
  return Boolean(process.env.MONGODB_URI);
}

export function getMongoDatabaseName() {
  return process.env.MONGODB_DB || "portfolio";
}

export function getMongoClient() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is not configured.");
  }

  if (!globalThis.portfolioMongoClientPromise) {
    const client = new MongoClient(uri);
    globalThis.portfolioMongoClientPromise = client.connect().catch((error) => {
      globalThis.portfolioMongoClientPromise = undefined;
      throw error;
    });
  }

  return globalThis.portfolioMongoClientPromise;
}
