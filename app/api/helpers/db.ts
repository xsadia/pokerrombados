import { pokemonModel } from "./pokemonModel";
import { voteModel } from "./voteModel";

export const db = {
  pokemonModel: pokemonModel(),
  voteModel: voteModel(),
};
