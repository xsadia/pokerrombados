import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.DATABASE_URL! || "mongodb://localhost:27017/poke");
mongoose.Promise = global.Promise;

export const pokemonModel = () => {
  const pokemonSchema = new Schema({
    pokeId: Number,
    name: String,
  });

  return mongoose.models.Pokemon || mongoose.model("Pokemon", pokemonSchema);
};
