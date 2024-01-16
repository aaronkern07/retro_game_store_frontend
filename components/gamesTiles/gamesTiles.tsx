'use client'
import { useState } from 'react';
import { getGames } from '../../app/actions';

type gameType = {
    id: number,
    name: string,
    console_name: string,
    price: string,
    condition: string,
    is_boxed: boolean
}

export default function GamesTiles({ initialGames } : { initialGames: gameType[] }) {
    const [games, setGames] = useState(initialGames);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const query = new URLSearchParams();

        for (let [key, value] of formData.entries() as IterableIterator<[string, FormDataEntryValue]>) {
            if (key === "is_boxed" && !e.currentTarget.is_boxed.checked) continue;
            if (value !== "") {
                query.append(key, value.toString() as string);
            }
        }
        setQuery(query.toString());
        query.append('page', "1");
        setPage(1);
        
        const gamesResponse = await getGames(`?${query.toString()}`);
        setGames(gamesResponse);
    }

    async function handlePageChange(pageMovement: number) {
        setPage(pageMovement);
        if (query === "") {
            const gamesResponse = await getGames(`?page=${pageMovement}`);
            setGames(gamesResponse);
        } else {
            const gamesResponse = await getGames(`?${query}&page=${pageMovement}`);
            setGames(gamesResponse);
        }
    }

    return (
        <>
            <div>
                <form className="flex flex-col items-center justify-center text-black" onSubmit={handleSubmit}>
                    <label htmlFor="sort" className='text-white'>Sort by: </label>
                    <div>
                        <select id="sort" name="sort">
                            <option value="">Select...</option>
                            <option value="name_asc">Name (A-Z)</option>
                            <option value="name_desc">Name (Z-A)</option>
                            <option value="price_asc">Price (Low to High)</option>
                            <option value="price_desc">Price (High to Low)</option>
                            {/* Add other sorting options as needed */}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="is_boxed" className='text-white'>Boxed Only: </label>
                        <input type="checkbox" name="is_boxed" id="is_boxed" value="true" />
                    </div>
                    <div>
                        <label htmlFor="console_id" className='text-white'>Console: </label>
                        <select name="console_id" id="console_id">
                            <option value="">Select...</option>
                            <option value="1">Super Nintendo</option>
                            <option value="2">Nintendo</option>
                            <option value="4">Gameboy</option>
                            <option value="5">Atari 2600</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="condition" className='text-white'>Condition: </label>
                        <select name="condition" id="condition">
                            <option value="">Select...</option>
                            <option value="Excellent">Excellent</option>
                            <option value="Good">Good</option>
                            <option value="fair">Fair</option>
                            <option value="poor">Poor</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="limit" className='text-white'>Items per Page: </label>
                        <select id="limit" name="limit">
                            <option value="">Default</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                        </select>
                    </div>
                    <button type="submit" className='text-white'>Apply Filters</button>
                </form>
            </div>
            <div className="flex flex-row justify-center">
                <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>Previous Page</button>
                <button onClick={() => handlePageChange(page + 1)}>Next Page</button>
            </div>
            <div className="flex flex-wrap justify-center">
                {games.map((game : gameType) => (
                    <div key={game.id} className="flex flex-col items-center justify-center m-4 border-white border-2 p-4 min-w-96">
                        <h2 className="text-xl font-bold text-yellow-200">{game.name}</h2>
                        <p className="text-lg text-green-200">{game.console_name}</p>
                        <hr className="w-48 h-1 mx-auto my-2 bg-gray-100 border-0 rounded md:my-5 dark:bg-gray-700" />
                        <p className="text-md text-pink-200">{game.price}</p>
                        <p className="text-md text-pink-200">{game.condition} Condition</p>
                        <p className="text-md text-pink-200">{game.is_boxed ? "In Box": "Cartridge Only"}</p>
                    </div>
                ))}
            </div>
        </>
    )
}