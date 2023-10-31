import React from "react";
 
export default function Page() {
  return (
		<div className="pl-16">
			<p className="my-8 text-6xl tracking-tight text-white sm:text-4xl">
				Install
				<div className="absolute mt-1 w-1/3 h-1 bg-gradient-to-r from-white to-transparent"></div>
			</p>
				<div className="p-1 bg-slate-500/[.12] rounded-xl shadow-md" style={{ width: "16.5rem" }}>
          <div className="bg-gray-900 h-10 w-64 rounded-lg shadow-lg relative">
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
			<br />
			<p>Or require the flex-cache.js file to get FlexCache</p>
			<p className="my-8 text-6xl tracking-tight text-white sm:text-4xl">
				Initialize
				<div className="absolute mt-1 w-1/3 h-1 bg-gradient-to-r from-white to-transparent"></div>
			</p>
			<div className="p-1 bg-slate-500/[.12] rounded-xl shadow-md" style={{ width: "23rem" }}>
          <div className="bg-gray-900 rounded-lg shadow-lg relative" style={{ height: "6rem", width: "22.5rem" }}>
            <pre className="text-gray-100 text-sm" style={{
              fontFamily: "Menlo, monospace",
              position: "relative",
              top: "50%",
              transform: "translateY(-50%)",
              left: "10px"
            }}>
							const FlexCache = require("flex-cache");
							<br />
							<br />
							const MyNewCache = new FlexCache;
            </pre>
          </div>
        </div>
			<p className="my-8 text-6xl tracking-tight text-white sm:text-4xl">
				Methods
				<div className="absolute mt-1 w-1/3 h-1 bg-gradient-to-r from-white to-transparent"></div>
			</p>
			<p className="my-8 text-6xl tracking-tight text-white sm:text-xl">Log key(s) in the cache (keys)</p>
			  <p>MyNewCache.keys()</p>
			<p className="my-8 text-6xl tracking-tight text-white sm:text-xl">Store a key(s) in cache (set)</p>
				<p>MyNewCache.set(key, value, ttl(optional))</p>
			<p className="my-8 text-6xl tracking-tight text-white sm:text-xl">Retrieve a key(s) value (get)</p>
				<p>MyNewCache.get(key)</p>
			<p className="my-8 text-6xl tracking-tight text-white sm:text-xl">Remove key value pair(s) (del)</p>
			<p className="my-8 text-6xl tracking-tight text-white sm:text-xl">Retrieve a key and remove from cache (TAKE)</p>
			<p className="my-8 text-6xl tracking-tight text-white sm:text-xl">Change time to live of a key (ttl)</p>
			<p className="my-8 text-6xl tracking-tight text-white sm:text-xl">Log time to live of a key (getTtl)</p>
			<p className="my-8 text-6xl tracking-tight text-white sm:text-xl">Log whether or not key exist in cache (has)</p>
			<p className="my-8 text-6xl tracking-tight text-white sm:text-xl">Log the stats of the cache (getStats)</p>
			<p className="my-8 text-6xl tracking-tight text-white sm:text-xl">Empty cache stats(flushStats)</p>
			<p className="my-8 text-6xl tracking-tight text-white sm:text-xl">Empty cache data and stats(flushAll)</p>
			<p className="my-8 text-6xl tracking-tight text-white sm:text-xl">Clear timeout interval set on checkperiod option (close)</p>
		</div>
  );
};