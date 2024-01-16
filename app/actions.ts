'use server'
export async function getGames(query: string) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/games${query}`, { cache: 'no-store' });
        if (!res.ok) throw new Error(res.statusText);
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}