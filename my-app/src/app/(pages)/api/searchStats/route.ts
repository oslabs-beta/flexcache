import type { NextRequest, NextResponse } from 'next/server';
import fetch from 'node-fetch';

export const GET = async (req: NextRequest, res: NextResponse) => {
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get('id');
    console.log(query);
    try {
        const response = await fetch(`https://balldontlie.io/api/v1/season_averages?season=2022&player_ids[]=${query}&`);

        const data = await response.json();
        console.log(data);
        return new Response(JSON.stringify(data), { status: 200 });

    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Failed to fetch data' }), { status: 500 });
    }
};
