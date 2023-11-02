import React, { useState, useEffect } from 'react';
import { Combobox } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

type Player = {
    id: number;
    first_name: string;
    last_name: string;
    team: { name: string };
    position: string;
    height_feet: number;
    height_inches: number;
    weight_pounds: number;
    pts?: number;
    ast?: number;
    reb?: number;
    stl?: number;
    blk?: number;
};

const Search: React.FC = () => { // FC stands for Function Component

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [results, setResults] = useState<Player[]>([]);
    const [selectedPlayer, setSelectedPlayer] = useState<Player>();

    // time trackers > couldn't figure out how to use in return without state
    const [externalTime, setExternalTime] = useState<number>(0);
    const [cacheTime, setCacheTime] = useState<number>(0);

    useEffect(() => {
        if (searchTerm) {
            const timeoutId = setTimeout(() => {
                fetch(`/api/searchPlayers?search=${searchTerm}`)
                    .then(res => res.json())
                    .then(data => {
                        if (data && data.data) { // return looks like {data: [{players}] }
                            setResults(data.data);
                        }
                    })
                    .catch(error => console.error('Error fetching player data:', error));
            }, 500); //500ms

            return () => {
                // canceling old setTimeouts
                clearTimeout(timeoutId);
            };
        }
    }, [searchTerm]);

    // Live search as user types
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handlePlayerSelect = async (playerId: number) => {
        try {
            const response = await fetch(`/api/speedTest?playerId=${playerId}`);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            // Update timings
            setExternalTime(data.externalTime);
            setCacheTime(data.cacheTime);

            // Find selected player from array of players
            const playerInfo = results.find(player => player.id === playerId);

            // console.log(data);

            // Check if data object exists and that it's not empty
            if (data.playerData) {
                //const playerStats = data.playerData.data[0];
                const playerStats = data.playerData.data[0];

                console.log(data.playerData[0]);

                // Combine player info and player stats (fetched differently from external api)
                setSelectedPlayer({
                    ...playerInfo,
                    ...playerStats,
                });
            }
            // console.log(playerInfo);
            // console.log(selectedPlayer);

            // Clear the results to hide the dropdown
            setResults([]);

        } catch (error) {
            console.error('Error fetching player stats:', error);
        }
    };


    return (
        // <section className='w-100 h-200 body lg:flex justify-center items-center flex-col gap-y-6'>
        <div className='flex flex-col items-center justify-center px-6 py-54 sm:px-6 sm:py-32 lg:px-8'>


            <div className='mx-auto my-auto max-w-5xl text-center text-5xl sm:px-50'>
                <h1>Discover your favorite Player</h1>
            </div>
            <div className='mt-10 flex flex-col items-center justify-center gap-x-6 relative'>
                <Combobox value={'Enter player name'}>
                    <div className="relative flex items-center border rounded w-half">
                        <Combobox.Input
                            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-slate-200 focus:ring-0"
                            displayValue={(player: any) => player.first_name}
                            onChange={handleSearchChange}
                        />
                        <Combobox.Button className="absolute flex items-center justify-center inset-y-0 right-0 pr-2">
                            <ChevronUpDownIcon
                                className="h-5 w-5 text-slate-100"
                                aria-hidden="true"
                            />
                        </Combobox.Button>
                    </div>
                    <Combobox.Options className="mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {results.map((player) => (
                            <Combobox.Option
                                key={player.id}
                                value={player}
                                onClick={() =>
                                    handlePlayerSelect(player.id)
                                }
                                className={({ active }) => `w-full relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-teal-600 text-white' : 'text-gray-900'
                                    }`}
                            >
                                {player.first_name} {player.last_name}
                            </Combobox.Option>
                        ))}
                    </Combobox.Options>
                </Combobox>
            </div>

            <div>
                {selectedPlayer && (
                    <div className='flex flex-col items-center'>
                        <strong>
                            {selectedPlayer.first_name} {selectedPlayer.last_name}
                        </strong>
                        <br />
                        Team: {selectedPlayer.team.name}
                        <br />
                        Position: {selectedPlayer.position}
                        <br />
                        Height: {selectedPlayer.height_feet} ft {selectedPlayer.height_inches} in
                        <br />
                        Weight: {selectedPlayer.weight_pounds} lbs
                        <br />
                        <br />
                        <b>
                            Season Average Stats
                        </b>
                        <div>
                            Points: {selectedPlayer.pts}
                            <br />
                            Assists: {selectedPlayer.ast}
                            <br />
                            Rebounds: {selectedPlayer.reb}
                            <br />
                            Steals: {selectedPlayer.stl}
                            <br />
                            Blocks: {selectedPlayer.blk}
                        </div>
                        <br />
                        <b>
                            Speed Test Results
                        </b>
                        <div>
                            External API Time: {externalTime} ms
                            <br />
                            Supacache Time: {cacheTime} ms
                        </div>
                    </div>
                )}
            </div>

            {/* </div> */}
        </div>
        // </section >

    );
};

export default Search;


{/* <div className='form'>
                <div className='form-group'>
                <input
                type='text'
                className='form-control'
                id='search'
                name='search'
                value={searchTerm}
                placeholder='Enter player name'
                onChange={handleSearchChange}
                />
                </div>
                {results.length > 0 && (
                    <ul className='dropdown'>
                    {results.map(player => (
                        <div key={player.id} onClick={() => handlePlayerSelect(player.id)}>
                        {player.first_name} {player.last_name}
                        </div>
                        ))}
                        </ul>
                        )}
                        </div>
                        
                        {selectedPlayer && (
                            <div className='player-stats'>
                            <strong>
                            {selectedPlayer.first_name} {selectedPlayer.last_name}
                            </strong>
                            <br />
                            Team: {selectedPlayer.team.name}
                            <br />
                            </div>
                            </div>
                            Position: {selectedPlayer.position}
                            <br />
                            Height: {selectedPlayer.height_feet} ft {selectedPlayer.height_inches} in
                            <br />
                            Weight: {selectedPlayer.weight_pounds} lbs
                            <br />
                            <br />
                            <b>
                            Season Average Stats
                            </b>
                            <div>
                            Points: {selectedPlayer.pts}
                            <br />
                            Assists: {selectedPlayer.ast}
                            <br />
                            Rebounds: {selectedPlayer.reb}
                            <br />
                            Steals: {selectedPlayer.stl}
                            <br />
                            Blocks: {selectedPlayer.blk}
                            </div>
                            <br />
                            <b>
                            Speed Test Results
                            </b>
                            <div>
                            External API Time: {externalTime} ms
                            <br />
                            Node-Cache Time: {cacheTime} ms
                            </div>
                            </div>
                        )} */}