import React, { useState } from "react";

import Terminal from "./Terminal";

export default function GetStarted() {

    const [copied, setCopiedStatus] = useState<boolean>(false);

    return (
        <div className="lg:grid lr:grid-cols-2 gap-x-10 items-center justify-center mx-auto px-4 font-normal sm:px-8 py-10">
            <div>
                <p className="">If you don't have a Node.js project set up, you'll have to create a file and cd into that directory.</p>
                <br />
                <p className="">run the following command in your terminal:</p>
                <br />
                <div className="p-1 bg-slate-500/[.12] rounded-xl shadow-md mb-4 mr-80">
                    <div className="bg-gray-900 h-10 w-auto rounded-lg shadow-lg">
                        <pre className="text-gray-100 text-sm" style={{
                            fontFamily: "Menlo, monospace",
                            position: "relative",
                            top: "50%",
                            transform: "translateY(-50%)",
                            left: "10px"
                        }}>
                            npm init -y
                        </pre>
                    </div>
                </div>
                <p className="">
                    This will create a basic package.json file for your project.
                </p>
                <br />
                <p className="">
                    Continue by installing the "flex-cache" npm package using the following command:
                </p>
                <br />
                <div className="p-1 bg-slate-500/[.12] rounded-xl shadow-md mb-4 mr-80">
                    <div className="bg-gray-900 h-10 w-auto rounded-lg shadow-lg">
                        <pre className="text-gray-100 text-sm" style={{
                            fontFamily: "Menlo, monospace",
                            position: "relative",
                            top: "50%",
                            transform: "translateY(-50%)",
                            left: "10px"
                        }}>
                            npm install flex-cache
                        </pre>
                    </div>
                </div>
                <p className="">This will download and install the "flex-cache" library and add it as a dependency in your project.</p>
                <br />
                <p className="">You are all set! Now you can import the library in any javascript file and use flex-cache.</p>
            </div>
        </div>
    );
}
