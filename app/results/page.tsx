import Image from "next/image";

const getLeaderBoard = async () => {
  const response = await fetch("https://pokerrombados.vercel.app/api/votes", {
    cache: "no-store",
  });

  return response.json();
};

export default async function Results() {
  const leaderBoard = await getLeaderBoard();

  if (!leaderBoard) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl">
          Algo deu <span className="text-rose-500">Errado</span> :({" "}
        </h1>
      </main>
    );
  }
  const [first, second, third] = leaderBoard;

  return (
    <div className="min-h-screen flex flex-col justify-center items-center space-y-8">
      <h1 className="text-3xl">
        <span className="text-rose-500">Arrombados</span> de hoje
      </h1>
      <div className="relative bg-yellow-500 py-8 px-6 rounded-lg w-32 h-32">
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-white rounded-full overflow-hidden">
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${first.pokeId}.png`}
            alt={first.name}
            width={128}
            height={128}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <p className="text-2xl font-bold text-yellow-500">
        1º Lugar ({first.name})
      </p>

      <div className="relative bg-gray-400 py-6 px-4 rounded-lg w-24 h-24">
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-white rounded-full overflow-hidden">
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${second.pokeId}.png`}
            alt={second.name}
            width={128}
            height={128}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <p className="text-lg text-gray-800">2º Lugar ({second.name})</p>

      <div className="relative bg-orange-400 py-4 px-3 rounded-lg w-20 h-20">
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-white rounded-full overflow-hidden">
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${third.pokeId}.png`}
            alt={third.name}
            width={128}
            height={128}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <p className="text-base text-orange-500">3º Lugar ({third.name})</p>
    </div>
  );
}
