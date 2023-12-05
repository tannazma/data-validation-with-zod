import express from "express";
import { json } from "express";
import animals from "./animals.json";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(json());

const port = 3101;

app.get("/animals", (req, res) => {
  // Getting data from Prisma we can 'trust'
  // prisma.animals.findMany()
  res.send(animals);
});

app.post("/tweets", async (req, res) => {
  const requestBody = req.body;

  if ("message" in requestBody && "private" in requestBody) {
    try {
      const newTweet = await prisma.tweet.create({
        data: requestBody,
      });
      res.status(201).send(newTweet);
    } catch (error) {
      res.status(500).send({ message: "Something went wrong!" });
    }
  } else {
    res.status(400).send({ message: "'message' and 'private' are required" });
  }
});

app.listen(port, () => {
  console.log(`⚡ Server listening on port: ${port}`);
});
