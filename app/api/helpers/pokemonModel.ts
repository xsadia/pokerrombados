import mongoose, { Schema } from "mongoose";

mongoose.connect(
  process.env.DATABASE_URL! ||
    "mongodb+srv://fezin:Lua2711feka@arrombs.ublijke.mongodb.net/poke?retryWrites=true&w=majority"
);
mongoose.Promise = global.Promise;

export const pokemonModel = () => {
  const pokemonSchema = new Schema({
    pokeId: Number,
    name: String,
  });

  return mongoose.models.Pokemon || mongoose.model("Pokemon", pokemonSchema);
};
