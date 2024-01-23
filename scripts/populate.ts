import { db } from "@/app/api/helpers/db";
import mongoose, { connect, Collection } from "mongoose";
const getPokemon = async (id: number) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

  const data = await response.json();
  return { name: data.name, pokeId: id };
};

(async () => {
  const args = process.argv.slice(2);
  if (args.length < 1) {
    throw new Error("Missing DB URL");
  }

  const conn = await connect(args[0]);

  const caught = [];
  for (let i = 1; i <= 10; i++) {
    const pokemon = await getPokemon(i);
    console.log("got: ", pokemon);
    caught.push(pokemon);
  }
  await db.pokemonModel.insertMany(Object.values(caught));

  process.exit(0);
})();
