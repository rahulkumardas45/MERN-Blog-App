import { createClient } from "redis";

const client = createClient({
  username: "default",
  password: process.env.REDIS_PASSWORD, 
  socket: {
    host: "redis-16331.crce286.ap-south-1-1.ec2.cloud.redislabs.com",
    port: 16331
  }
});


client.on("error", (err) => console.log("Redis Client Error:", err));

export const connectRedis = async () => {
  try {
    await client.connect();  
    console.log(" Redis connected");
  } catch (err) {
    console.log("❌ Redis not running");
  }
};

export default client;