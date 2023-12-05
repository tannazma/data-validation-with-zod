import { useEffect, useState } from "react";
import { z } from "zod";

// Our validator for a single validator
const animalValidator = z.object({
  id: z.number().int(), // Id should be a round number
  name: z.string(),
  kind: z.union([
    z.literal("cow"),
    z.literal("sheep"),
    z.literal("chicken"),
    z.literal("pig"),
  ]),
  age: z.number().int(),
  hasBeenFed: z.boolean(),
  imgUrl: z.string().url(),
});

// Generate a type from the validator
type Animal = z.infer<typeof animalValidator>;

// Out validator but for an array of animals
const animalArrayValidator = z.array(animalValidator);

const Animals = () => {
  const [animals, setAnimals] = useState<Animal[] | null>(null);
  useEffect(() => {
    const getAnimals = async () => {
      const response = await fetch(
        "https://reader.mindmingle.nl/api/exercises/react/animals"
      );
      const data = await response.json();
      // Validate the list
      const parsedAnimals = animalArrayValidator.safeParse(data);

      if (parsedAnimals.success) {
        // If our validation was a succes
        setAnimals(parsedAnimals.data);
      } else {
        console.log(parsedAnimals.error);
      }
    };
    getAnimals();
  }, []);

  return (
    <main>
      <h1>Animals</h1>
      {animals && animals.map((animal) => (<p key={animal.id}>Name: {animal.name} and age: {animal.age}</p>))}
    </main>
  );
};

export default Animals;
