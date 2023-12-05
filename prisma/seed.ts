import { PrismaClient } from "@prisma/client";
import animals from "../../zod/animals.json";

const prisma = new PrismaClient();

const seed = async () => {
  for (let i = 0; i < animals.length; i += 1) {
    const animalsData = animals[i];
    if (animalsData) {
      await prisma.animal.create({
        data: animalsData,
      });
    }
  }
};
seed();
