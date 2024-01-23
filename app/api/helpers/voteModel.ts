import mongoose, { Schema, Types } from "mongoose";

mongoose.connect(
  process.env.DATABASE_URL! ||
    "mongodb+srv://fezin:Lua2711feka@arrombs.ublijke.mongodb.net/poke?retryWrites=true&w=majority"
);
mongoose.Promise = global.Promise;

export const voteModel = () => {
  const voteSchema = new Schema(
    {
      votedFor: Types.ObjectId,
      votedAgainst: Types.ObjectId,
    },

    { timestamps: true }
  );

  return mongoose.models.Vote || mongoose.model("Vote", voteSchema);
};
