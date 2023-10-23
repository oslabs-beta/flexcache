import clientPromise from "../../../(lib)/mongodb";
import * as mongoDB from "mongodb";
import type { NextRequest, NextResponse } from 'next/server';
import { NextApiResponse } from "next";


export const GET = async (req: NextRequest, res: NextResponse) => {

    const searchParams = req.nextUrl.searchParams;
    const playerId = searchParams.get('player_id');
    //console.log(playerId);

    try {
        const client = await clientPromise;
        const db = client.db('test');

        const player: mongoDB.Collection = await db.collection('playerstats').findOne({
            player_id: playerId
        });

        console.log('player is ', player);

        // return res.json(player);
        return new Response(JSON.stringify(player), { status: 200 });

    } catch (e) {
        console.error(e);
        return new Response(JSON.stringify({ error: `Failed to fetch data: ${e}` }), { status: 500 });
    }
}
