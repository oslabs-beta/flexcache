import React, { useState } from "react";
import Terminal from "./Terminal";
import Copy from "./Copy";

export default function GetStarted() {

    return (
        <div className="flex justify-center items-center">
            <div className='xl:mx-20 lg:mx-20 grid max-w-screen-xl grid-cols-1 md:grid-cols-2 pb-20'>

                <div className="flex flex-col items-center justify-center mx-auto py-10 sm:w-auto sm:px-8 max-w-full">
                    <h1 className="flex justify-center items-center text-3xl pt-3 text-green-400 font-bold sm:text-4xl">Get Started</h1>
                    {/* <p>If you don't have a Node.js project set up, you'll have to create a file and cd into that directory.</p>
                <br />
                <p>Run the following command in your terminal:</p>
                <br />
                <Copy
                    textToCopy={'npm init -y'}
                    bgColor={'rgba(46, 81, 43, 0.47)'}
                    brColor={'rgba(59, 255, 43, 0.66)'}
                />
                <br />
                <p>This will create a basic package.json file for your project.</p>
                <br /> */}
                    {/* <p>Continue by installing the "flex-cache" npm package using the following command:</p> */}
                    <br />
                    {/* <p>Install "flex-cache" npm package using the following command:</p> */}
                    <div className="w-9/12 text-center space-y-5">
                        <p>Install "flex-cache" npm package:</p>
                        <div className="flex items-center justify-center">

                            <Copy
                                textToCopy={'npm install flex-cache'}
                                bgColor={'rgba(55, 55, 55, 0.47)'}
                                brColor={'rgba(85, 85, 85, 0.66)'}
                            />
                        </div>
                        {/* <p className="text-slate-300">Now import into file, initialize, and start caching right away.</p> */}
                        {/* <p>This will download and install the "flex-cache" library and add it as a dependency in your project.</p> */}
                        {/* <p className="text-slate-300">You are all set!</p> */}
                        {/* <br /> */}
                        <p>Now import into file, initialize, and start caching right away.</p>
                    </div>
                    {/* <p className="text-slate-300">Now import the library in any javascript file and use flex-cache.</p> */}
                </div>
                <div className="px-3">
                    <Terminal />
                </div>
            </div >
        </div>
    );
}
