import { createClient } from "redis";

const client = createClient({
  url: process.env.REDIS_URL
});

client.on("error", (err) => console.log("Redis Client Error:", err));

export const connectRedis = async () => {
  try {
    await client.connect();
    console.log("Redis connected");
  } catch (err) {
    console.log("❌ Redis not running");
  }
};

export default client;