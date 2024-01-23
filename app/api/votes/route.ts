import { NextResponse } from "next/server";
import { db } from "../helpers/db";

export async function GET() {
  const top3 = await db.voteModel.aggregate([
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

  return NextResponse.json(top3, { status: 200 });
}
