'use client';

import React, { useState, useEffect } from 'react';
import Search from '../../../components/Search';

export default function Page() {


    const [data, setData] = useState<any>();

    const handleClick = () => {
        fetch('https://www.balldontlie.io/api/v1/players/237')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setData(data);
                console.log(data);
            })
            .catch(error => {
                console.log('There was a problem with the fetch operation:', error.message);
            });
    };


    return (

        <>
        //         {/* <button
        //                 type="button"
        //                 onClick={() => handleClick()}
        //                 className="flex items-center justify-center w-40 gap-2 px-3 py-2 text-sm font-regular text-white bg-green-600 border border-green-400 rounded-md shadow-lr hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
        //                 style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, .3)' }}
        //             >
        //                 <span style={{ textShadow: '0px 2px 4px rgba(0, 0, 0, .3)' }}>
        //                     Search
        //                 </span>
        //             </button>
        //             <div>
        //                 {data && (
        //                     <div>
        //                         <p>Name: {data.first_name} {data.last_name}</p>
        //                         <p>Height: {data.height_feet} feet {data.height_inches} inches</p>
        //                     </div>
        //                 )}
        //             </div> */}

            < Search />
            <div className='flex items-center justify-center'>
                <iframe src="https://snapshots.raintank.io/dashboard-solo/snapshot/tD4U1QvaHoDxdA845xHlOtHso2RvjKbO?orgId=2&from=1698861926219&to=1698862435340&panelId=1" width="450" height="400"></iframe>
            </div >
        </>
    );
}
