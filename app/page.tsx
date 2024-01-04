type gameType = {
  id: number,
  name: string,
  console_name: string,
  price: string,
  condition: string,
  is_boxed: boolean
}

async function fetchGames() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/games`, { cache: 'no-store' })
  const data = await res.json()
  return data
};

export default async function Home() {
  const games = await fetchGames()
  return (
    <main className="flex flex-col items-center justify-between p-12">
      <h1 className="text-4xl font-bold">Retro Game Store</h1>
      <div className="flex flex-wrap justify-center">
        {games.map((game : gameType) => (
          <div key={game.id} className="flex flex-col items-center justify-center m-4 border-white border-2 p-4 min-w-96">
            <h2 className="text-xl font-bold">{game.name}</h2>
            <p className="text-lg">{game.console_name}</p>
            <p className="text-md">{game.price}</p>
            <p className="text-md">{game.condition} Condition</p>
            <p className="text-md">{game.is_boxed ? "In Box": "Cartridge Only"}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
