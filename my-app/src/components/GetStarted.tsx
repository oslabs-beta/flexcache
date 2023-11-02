import React from "react";
import Terminal from "./Terminal";
import Copy from "./Copy";

export default function GetStarted() {

    return (
        <div className="flex justify-center items-center">
            <div className='xl:mx-20 lg:mx-20 grid max-w-screen-xl grid-cols-1 md:grid-cols-2 pb-20'>

                <div className="flex flex-col items-center justify-center mx-auto py-10 sm:w-auto sm:px-8 max-w-full">
                    <h1 className="flex justify-center items-center text-3xl pt-3 text-green-400 font-bold sm:text-4xl">Get Started</h1>
                    <br />
                    <div className="w-9/12 text-center space-y-5">
                        <p>Install "flex-cache" npm package:</p>
                        <div className="flex items-center justify-center">

                            <Copy
                                textToCopy={'npm install flex-cache'}
                                bgColor={'rgba(55, 55, 55, 0.47)'}
                                brColor={'rgba(85, 85, 85, 0.66)'}
                            />
                        </div>
                        <p>Now import into your Node file, initialize, and start caching right away.</p>
                    </div>
                </div>
                <div className="px-3">
                    <Terminal />
                </div>
            </div >
        </div>
    );
}
