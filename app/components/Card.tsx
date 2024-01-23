"use client";

import { MouseEvent } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

export const Card = ({
  _id,
  opponentId,
  name,
  pokeId,
}: {
  _id: string;
  opponentId: string;
  name: string;
  pokeId: number;
}) => {
  const handleVote = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const response = await fetch("http://localhost:3000/api", {
      method: "POST",
      body: JSON.stringify({
        votedFor: _id,
        votedAgainst: opponentId,
      }),
    });
    if (!response.ok) {
      toast.error(`Falha ao computar voto para ${name}`);
      return;
    }

    window.location.replace("/");
  };
  return (
    <div className="flex flex-col justify-between items-center m-4">
      <Image
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeId}.png`}
        alt={name}
        width="180"
        height="180"
      />
      <h1 className="font-bold">{name}</h1>
      <button
        onClick={handleVote}
        className="px-8 py-2 bg-rose-500 w-full text-white hover:bg-rose-400 hover:ease-in ease-out duration-150"
      >
        Votar
      </button>
    </div>
  );
};
