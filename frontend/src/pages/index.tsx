import { useEffect, useState } from "react";
import { z } from "zod";

const animalKindValidator = z.union([
  z.literal("cow"),
  z.literal("sheep"),
  z.literal("chicken"),
  z.literal("pig"),
]);

const animalSchema = z
  .object({
    id: z.number().int().positive(),
    name: z.string().min(1),
    kind: animalKindValidator,
    age: z.number().positive().int(),
    hasBeenFed: z.boolean(),
    imgUrl: z.string().url(),
  })
  .strict();

type Animal = z.infer<typeof animalSchema>;

const emailValidators = z.string().email();
const emailArrayValidator = z.array(emailValidators);
const safePasswordValidator = z.string().min(8).includes("#");

const userLoginValidator = z.object({
  email: emailArrayValidator,
  password: safePasswordValidator,
});

const arrayOfAnimalsValidator = z.array(animalSchema);

export default function Home() {
  const [animals, setAnimals] = useState<Animal[]>([]);

  useEffect(() => {
    const getAnimals = async () => {
      const response = await fetch("http://localhost:3001/animals");
      const data = await response.json();
      setAnimals(data);
    };
    getAnimals();
  }, []);
  return (
    <>
      <h1>Hello</h1>
      {animals.map((animal) => (
        <p key={animal.id}>{animal.name}</p>
      ))}
      <p>Yess</p>
    </>
  );
}
