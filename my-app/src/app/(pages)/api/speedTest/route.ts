import type { NextRequest, NextResponse } from 'next/server';
import fetch from 'node-fetch';
import { setCache, getCache } from '@/cache';

export const GET = async (req: NextRequest, res: NextResponse) => {
    const searchParams = req.nextUrl.searchParams;
    const playerId = searchParams.get('playerId');

    if (!playerId) {
        return new Response(JSON.stringify({ error: 'Player ID is required' }), { status: 400 });
    }

    let data;
    let externalTime = 0;
    let cacheTime = 0;

    try {

        let fetchedFromCache: boolean = false;

        // Check cache first
        const cacheStart = process.hrtime(); // Start timer
        const cachedData = getCache(playerId);
        const cacheDuration = process.hrtime(cacheStart); // Find timer difference
        cacheTime = cacheDuration[0] * 1000 + cacheDuration[1] / 1000000;  // Convert to ms

        if (cachedData) {
            data = cachedData;
            fetchedFromCache = true;
            console.log(`in if(cacheData). Cached Data: ${cachedData}`);
        } else {

            // If not in cache, fetch from API
            const apiStart = process.hrtime();
            const apiResponse = await fetch(`https://balldontlie.io/api/v1/season_averages?season=2022&player_ids[]=${playerId}`);
            data = await apiResponse.json();
            console.log(`in else statement in speedTest. Fetched Data: ${apiResponse}`);

            const apiDuration = process.hrtime(apiStart);
            externalTime = apiDuration[0] * 1000 + apiDuration[1] / 1000000;

            // Save to cache
            setCache(playerId, data);
        }

        return new Response(JSON.stringify({
            externalTime: externalTime,
            cacheTime: cacheTime,
            playerData: data
        }), { status: 200 });

    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Failed to fetch data' }), { status: 500 });
    }
};