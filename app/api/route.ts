import { NextRequest, NextResponse } from "next/server";
import { db } from "./helpers/db";
import { Types } from "mongoose";

const getId = (id?: number): number => {
  const pokeId = Math.floor(Math.random() * 420) + 1;
  if (id === pokeId) {
    return getId(id);
  }

  return pokeId;
};

export async function GET() {
  const firstId = getId();
  const secondId = getId(firstId);

  const pokemon = await db.pokemonModel.find({
    pokeId: { $in: [firstId, secondId] },
  });

  return NextResponse.json(pokemon, { status: 200 });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  await db.voteModel.create({
    votedFor: new Types.ObjectId(body.votedFor),
    votedAgainst: new Types.ObjectId(body.votedAgainst),
  });

  return NextResponse.json({ success: true }, { status: 200 });
}
