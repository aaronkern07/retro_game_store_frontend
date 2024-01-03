
async function fetchGames() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/games`)
  const data = await res.json()
  console.log(data);
  
  return data
};

export default async function Home() {
  const games = await fetchGames()
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Retro Game Store</h1>
      <div className="flex flex-wrap justify-center">
        {games.map((game) => (
          <div key={game.id} className="flex flex-col items-center justify-center m-4">
            <h2 className="text-xl font-bold">{game.name}</h2>
            <p className="text-lg">{game.price}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
