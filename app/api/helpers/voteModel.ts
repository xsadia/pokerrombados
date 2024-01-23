import mongoose, { Schema, Types } from "mongoose";

mongoose.connect(process.env.DATABASE_URL! || "mongodb://localhost:27017/poke");
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
