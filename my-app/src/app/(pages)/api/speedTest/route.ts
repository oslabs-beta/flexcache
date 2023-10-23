import type { NextRequest, NextResponse } from 'next/server';
import fetch from 'node-fetch';
import { setCache, getCache } from '@/cache';
const server = "http://localhost:3000";
//import { connectToDataBase } from '@/database'
//const supacache = require('/Users/PK/Desktop/codesmith/supacache/src/index.js');


export const GET = async (req: NextRequest, res: NextResponse) => {
    const searchParams = req.nextUrl.searchParams;
    const playerId = searchParams.get('playerId');

    console.log(playerId);

    if (!playerId) {
        return new Response(JSON.stringify({ error: 'Player ID is required' }), { status: 400 });
    }

    let data;
    let externalTime_api = 0;
    let externalTime_db = 0;
    let cacheTime = 0;

    try {

        let fetchedFromCache: boolean = false;
        let player_data;

        // Check cache first
        const cacheStart = process.hrtime(); // Start timer
        const cachedData = getCache(playerId);
        console.log('cachedData is ', cachedData);
        //const cachedData = false;
        const cacheDuration = process.hrtime(cacheStart); // Find timer difference
        cacheTime = cacheDuration[0] * 1000 + cacheDuration[1] / 1000000; // Convert to ms

        if (cachedData) {
            data = cachedData;
            console.log(data);
            fetchedFromCache = true;
            console.log(`in if(cacheData). Cached Data: ${cachedData}`);
        } else {

            //If not in cache, fetch from database
            const dbStart = process.hrtime();
            let db_response = await fetch(`${server}/api/getFromMongo?player_id=${playerId}`);
            player_data = await db_response.json();
            console.log('in player data ', player_data);
            console.log('in else statement (database)');
            const dbDuration = process.hrtime(dbStart);
            externalTime_db = dbDuration[0] * 1000 + dbDuration[1] / 1000000;


            // If not in cache, fetch from API
            // console.log('hi');
            // const apiStart = process.hrtime();
            // const apiResponse = await fetch(`https://balldontlie.io/api/v1/season_averages?season=2022&player_ids[]=${playerId}`);
            // data = await apiResponse.json();
            // console.log(`in else statement in speedTest. Fetched Data: ${data}`);
            // console.log(data);
            // const apiDuration = process.hrtime(apiStart);
            // externalTime_api = apiDuration[0] * 1000 + apiDuration[1] / 1000000;
            // Save to cache
            setCache(playerId, player_data);


        }

        //console.log('player_data ', player_data);

        return new Response(JSON.stringify({
            externalTime: externalTime_db,
            cacheTime: cacheTime,
            playerData: player_data
        }), { status: 200 });

    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Failed to fetch data' }), { status: 500 });
    }
};