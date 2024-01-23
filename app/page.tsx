import { Card } from "./components/Card";
import { Toaster } from "react-hot-toast";

const getContestants = async () => {
  const response = await fetch(`${process.env.API_URL}/api`, {
    cache: "no-store",
  });

  return response.json();
};

export default async function Home() {
  const contestants = await getContestants();

  if (!contestants) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl">
          Algo deu <span className="text-rose-500">Errado</span> :({" "}
        </h1>
      </main>
    );
  }

  const [first, second] = contestants;

  return (
    <>
      <Toaster position="top-right" />
      <main className="py-24 lg:justify-center px-8 flex flex-col min-h-screen items-center justify-around">
        <h1 className="font-bold text-3xl text-center lg:mb-8">
          Qual pokémon parece ser o mais{" "}
          <span className="text-rose-500">ARROMBADO</span>?
        </h1>
        <section className="flex flex-col lg:flex-row items-center justify-around">
          <Card
            _id={first._id}
            name={first.name}
            pokeId={first.pokeId}
            opponentId={second._id}
          />
          <span className="my-8">ou</span>
          <Card
            _id={second._id}
            name={second.name}
            pokeId={second.pokeId}
            opponentId={first._id}
          />
        </section>
      </main>
    </>
  );
}
