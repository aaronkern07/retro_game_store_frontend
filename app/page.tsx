import GamesTiles from "@/components/gamesTiles/gamesTiles"

async function getInitialGames() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/games`, { cache: 'no-store' });
  const data = await res.json();
  return data;
}

export default async function Home() {
  const initialGames = await getInitialGames();
  return (
    <main className="flex flex-col items-center justify-between p-12">
      <h1 className="text-4xl font-bold text-cyan-200">Retro Game Store</h1>
      <GamesTiles initialGames={initialGames}/>
    </main>
  )
}
