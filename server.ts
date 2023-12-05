import express from "express";
import { json } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const app = express();
const prisma = new PrismaClient();
const port = 3101;

app.use(cors());
app.use(json());

// interface Animal {
//   id: number;
//   name: string;
//   kind: string;
//   age: number;
//   hasBeenFed: boolean;
//   imgUrl: string;
// }

app.get("/animals", async (req, res) => {
  // Getting data from Prisma we can 'trust'
  // prisma.animals.findMany()
  const allAnimals = await prisma.animal.findMany();
  res.send(allAnimals);
});

// creating tweet schema in zod
const tweetValidator = z
  .object({
    message: z.string().max(180),
    private: z.boolean(),
  })
  .strict();

app.post("/tweets", async (req, res) => {
  const requestBody = req.body;

  const parsedBody = tweetValidator.safeParse(requestBody);

  if (parsedBody.success) {
    try {
      const newTweet = await prisma.tweet.create({
        data: parsedBody.data,
      });
      res.status(201).send(newTweet);
    } catch (error) {
      res.status(500).send({ message: "Something went wrong!" });
    }
  } else {
    res.status(400).send(parsedBody.error.flatten());
  }
});

app.listen(port, () => {
  console.log(`⚡ Server listening on port: ${port}`);
});
