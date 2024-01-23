import { NextResponse } from "next/server";
import { db } from "../helpers/db";

export async function GET() {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const top3 = await db.voteModel.aggregate([
    {
      $match: {
        createdAt: { $gte: today },
      },
    },
    {
      $group: {
        _id: "$votedFor",
        count: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: "pokemons",
        localField: "_id",
        foreignField: "_id",
        as: "pokemon",
      },
    },
    {
      $unwind: "$pokemon",
    },
    {
      $project: {
        _id: 0,
        pokeId: "$pokemon.pokeId",
        name: "$pokemon.name",
        voteCount: "$count",
      },
    },
    {
      $sort: { voteCount: -1 },
    },
    {
      $limit: 3,
    },
  ]);

  console.log("----->", top3, today);

  return NextResponse.json(top3, { status: 200 });
}
