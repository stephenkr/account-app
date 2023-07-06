import { MongoMemoryServer } from "mongodb-memory-server";
import { Connection, connect } from "mongoose";

export interface TestDatabase {
  connection: Connection;
  down: () => Promise<void>;
  reset: () => Promise<void>;
  seed: (key: string, documents: unknown[]) => Promise<void>;
}

export const getTestDatabase = async (): Promise<TestDatabase> => {
  const mongod = await MongoMemoryServer.create();
  const connectionInstance = await connect(mongod.getUri())
  const mongoConnection = connectionInstance.connection;

  return {
    connection: mongoConnection,
    down: async () => {
      await mongoConnection.dropDatabase();
      await mongoConnection.close();
      await mongod.stop();
    },
    reset: async () => {
      const collections = mongoConnection.collections;
      for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany({});
      }
    },
    seed: async (key, documents) => {
      const collection = mongoConnection.collections[key];
      await collection.insertMany(documents)
    }
  }
}