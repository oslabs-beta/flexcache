import React from "react";

export default function Page() {
	return (
		<div style={{paddingLeft: "10rem", maxWidth: "60rem", width: "auto"}}>
			<h2 className="my-8 font-bold tracking-tight text-white sm:text-4xl">
				Install
				<hr style={{width: "auto"}}/>
			</h2>
			<div className="ml-6">
				<div className="p-1 bg-slate-500/[.12] rounded-xl shadow-md" style={{ width: "auto"}}>
  				<div className="bg-gray-900 rounded-lg shadow-lg relative">
        		<pre className="text-gray-100 text-sm p-3"> npm install flex-cache </pre>
    			</div>
	    	</div>
					<br />
					<p>Or require the flex-cache.js file to get FlexCache</p>
				</div>
			<h2 className="my-8 font-bold tracking-tight text-white sm:text-4xl">
				Initialize
				<hr style={{width: "auto"}}/>
			</h2>
			<div className="ml-6">
				<div className="p-1 bg-slate-500/[.12] rounded-xl shadow-md" style={{ width: "auto"}}>
  				<div className="bg-gray-900 rounded-lg shadow-lg relative">
        		<pre className="text-gray-100 text-sm p-3"> 
						const FlexCache = require( "flex-cache" );
						<br />
						<br />
						const myCache = new FlexCache;
						</pre>
    			</div>
    		</div>
			</div>
			<h2 className="my-8 font-bold tracking-tight text-white sm:text-4xl">
				Methods
				<hr style={{width: "auto"}}/>
			</h2>
			<div className="ml-6">
			{/* keys */}
				<span className="my-8 tracking-tight text-white sm:text-xl">Log key(s) in the cache (keys)</span>
					<hr style={{maxWidth: "20rem"}}/>
					<br />
					<div className="p-1 bg-slate-500/[.12] rounded-xl shadow-md" style={{ width: "auto"}}>
  					<div className="bg-gray-900 rounded-lg shadow-lg relative">
        			<pre className="text-gray-100 text-sm p-3"> 
								<code>
									let myKeys = myCache.keys();
									<br />
									<br />
									console.log( myKeys );
									<br />
									// returns [ key1, key2, key3, key4 ]
								</code>
							</pre>
    				</div>
    			</div>
					<br />
					<span>Returns an array of all existing keys.</span>
				{/* set */}
					<br />
					<br />
					<span className="my-8 tracking-tight text-white sm:text-xl">Store key(s) in the cache (set)</span>
						<hr style={{maxWidth: "20rem"}}/>
						<br />
						<div className="p-1 bg-slate-500/[.12] rounded-xl shadow-md" style={{ width: "auto"}}>
  						<div className="bg-gray-900 rounded-lg shadow-lg relative">
        				<pre className="text-gray-100 text-sm p-3"> 
									<code>
									let data = &#123; name: John, age: 21&#125;;
									<br />
									<br />
									myCache.set( "key", data, 10000 );
									<br />
									// returns true
									</code>
								</pre>
    					</div>
						</div>
					<br />
					<span>Sets a key value pair. It is possible to define a ttl (in seconds). Returns true on success.</span>
				{/* get */}
					<br />
					<br />
					<span className="my-8 tracking-tight text-white sm:text-xl">Retrieve key(s) from cache (get):</span>
						<hr style={{maxWidth: "20rem"}}/>
						<br />
						<div className="p-1 bg-slate-500/[.12] rounded-xl shadow-md" style={{ width: "auto"}}>
							<div className="bg-gray-900 rounded-lg shadow-lg relative">
								<pre className="text-gray-100 text-sm p-3"> 
									<code>
									let value = myCache.get( "key" );
									<br />
									<br />
									if(!value) &#123; <br /><br />  //handle miss <br /><br />&#125;; <br />// returns &#123; "myKey", keyValue &#125;;
									</code>
								</pre>
							</div>
						</div>
					<br />
					<span>Gets a saved value from the cache. Returns a undefined if not found or expired. If the value was found it returns the value.</span>
				{/* remove */}
					<br />
					<br />
					<span className="my-8 tracking-tight text-white sm:text-xl">Remove key value pair(s) (del):</span>
						<hr style={{maxWidth: "20rem"}}/>
						<br />
						<div className="p-1 bg-slate-500/[.12] rounded-xl shadow-md" style={{ width: "auto"}}>
  						<div className="bg-gray-900 rounded-lg shadow-lg relative">
        				<pre className="text-gray-100 text-sm p-3"> 
									<code>
										let delete = myCache.del( "key" );
										<br />
										// returns 1
									</code>
								</pre>
    					</div>
    				</div>
						<br />
						<span>Delete a key. Returns the number of deleted entries. A delete will never fail.</span>
				{/* take */}
					<span className="my-8 tracking-tight text-white sm:text-xl">Retrieve a key and remove from cache (take):</span>
						<hr style={{maxWidth: "20rem"}}/>
						<br />
						<div className="p-1 bg-slate-500/[.12] rounded-xl shadow-md" style={{ width: "auto"}}>
  						<div className="bg-gray-900 rounded-lg shadow-lg relative">
        				<pre className="text-gray-100 text-sm p-3"> 
									<code>
										let value = myCache.take( "key" );
										<br />
										// returns key value but also deletes key
									</code>
								</pre>
    					</div>
    				</div>
						<br />
						<span>Gets a saved value from the cache. Returns a undefined if not found or expired. If the value was found it returns the value.</span>
				{/* ttl */}
					<br />
					<br />
					<span className="my-8 tracking-tight text-white sm:text-xl">Change time to live of a key (ttl):</span>
						<hr style={{maxWidth: "20rem"}}/>
						<br />
						<div className="p-1 bg-slate-500/[.12] rounded-xl shadow-md" style={{ width: "auto"}}>
  						<div className="bg-gray-900 rounded-lg shadow-lg relative">
        				<pre className="text-gray-100 text-sm p-3"> 
									<code>
										let changeTtl1 = myCache.ttl( "exsitent_Key", 100 );
										<br />
										// returns true
										<br />
										<br />
										let changeTtl2 = myCache.ttl( "non-Exsitent_Key", 100 );
										<br />
										// returns false
									</code>
								</pre>
    					</div>
    				</div>
						<br />
						<p>Redefine the ttl of a key. Returns true if the key has been found and changed. Otherwise returns false. If the ttl-argument isn't passed the default-TTL will be used.</p>
						<br />
						<p>The key will be deleted when passing in a ttl &lt; 0.</p>
				{/*get TTL*/}
				<br />
				<span className="my-8 tracking-tight text-white sm:text-xl">Log time to live of a key (getTtl):</span>
					<hr style={{maxWidth: "20rem"}}/>
					<br />
					<div className="p-1 bg-slate-500/[.12] rounded-xl shadow-md" style={{ width: "auto"}}>
						<div className="bg-gray-900 rounded-lg shadow-lg relative">
							<pre className="text-gray-100 text-sm p-3"> 
								<code>
									let value = myCache.take( "key" );
									<br />
									<br />
									// returns key value but also deletes key
								</code>
							</pre>
						</div>
					</div>
					<br />
					<p>Receive the ttl of a key. You will get:</p>
					<br />
					<p> - undefined if the key does not exist</p>
					<p> - 0 if this key has no ttl</p>
					<p> - a timestamp in ms representing the time at which the key will expire</p>
				{/*has*/}
				<br />
				<br />
				<span className="my-8 tracking-tight text-white sm:text-xl">Check if key exist in cache (has):</span>
					<hr style={{maxWidth: "20rem"}}/>
					<br />
					<div className="p-1 bg-slate-500/[.12] rounded-xl shadow-md" style={{ width: "auto"}}>
						<div className="bg-gray-900 rounded-lg shadow-lg relative">
							<pre className="text-gray-100 text-sm p-3"> 
								<code>
									let value = myCache.take( "key" );
									<br />
									<br />
									// returns key value but also deletes key
								</code>
							</pre>
						</div>
					</div>
					<br />
					<p>Returns boolean indicating if the key is cached.</p>
				{/*getStats*/}
				<br />
				<br />
				<span className="my-8 tracking-tight text-white sm:text-xl">Statistics (getStats):</span>
					<hr style={{maxWidth: "20rem"}}/>
					<br />
					<div className="p-1 bg-slate-500/[.12] rounded-xl shadow-md" style={{ width: "auto"}}>
						<div className="bg-gray-900 rounded-lg shadow-lg relative">
							<pre className="text-gray-100 text-sm p-3"> 
								<code>
									<p>myCache.getStats();</p>
									<br />
									/* 
									<p>   &#123;</p>
									<p>     hits: 0   //global hit count</p>
									<p>     misses: 0   //global miss count</p>
									<p>     keys: 0   //global key count</p>
									<p>     ksize: 0   //global key size count in approximately bytes</p>
									<p>     vsize: 0   //value size count in approximately bytes</p>
									<p>   &#125;</p>
									*/
								</code>
							</pre>
						</div>
					</div>
					<br />
					<p>Returns the statistics.</p>
				{/*flushStats*/}
				<br />
				<br />
				<span className="my-8 tracking-tight text-white sm:text-xl">Clear cache stats (flushStats):</span>
					<hr style={{maxWidth: "20rem"}}/>
					<br />
					<div className="p-1 bg-slate-500/[.12] rounded-xl shadow-md" style={{ width: "auto"}}>
						<div className="bg-gray-900 rounded-lg shadow-lg relative">
							<pre className="text-gray-100 text-sm p-3"> 
								<code>
								<p>myCache.flushStats();</p>
								<br />
								<p>myCache.getStats();</p>
									<br />
									/* 
									<p>   &#123;</p>
									<p>     hits: 0   //global hit count</p>
									<p>     misses: 0   //global miss count</p>
									<p>     keys: 0   //global key count</p>
									<p>     ksize: 0   //global key size count in approximately bytes</p>
									<p>     vsize: 0   //value size count in approximately bytes</p>
									<p>   &#125;</p>
									*/
								</code>
							</pre>
						</div>
					</div>
					<br />
					<p>Flush the stats.</p>
				{/*flushAll*/}
				<br />
				<br />
				<span className="my-8 tracking-tight text-white sm:text-xl">Reset cache data/stats(flushAll):</span>
					<hr style={{maxWidth: "20rem"}}/>
					<br />
					<div className="p-1 bg-slate-500/[.12] rounded-xl shadow-md" style={{ width: "auto"}}>
						<div className="bg-gray-900 rounded-lg shadow-lg relative">
							<pre className="text-gray-100 text-sm p-3"> 
								<code>
								<p>myCache.flushAll();</p>
								<br />
								<p>myCache.getStats();</p>
									<br />
									/* 
									<p>   &#123;</p>
									<p>     hits: 0   //global hit count</p>
									<p>     misses: 0   //global miss count</p>
									<p>     keys: 0   //global key count</p>
									<p>     ksize: 0   //global key size count in approximately bytes</p>
									<p>     vsize: 0   //value size count in approximately bytes</p>
									<p>   &#125;</p>
									*/
								</code>
							</pre>
						</div>
					</div>
					<br />
					<p>Flush all data.</p>
				{/*close*/}
				<br />
				<br />
				<span className="my-8 tracking-tight text-white sm:text-xl">Close the cache(close):</span>
					<hr style={{maxWidth: "20rem"}}/>
					<br />
					<div className="p-1 bg-slate-500/[.12] rounded-xl shadow-md" style={{ width: "auto"}}>
						<div className="bg-gray-900 rounded-lg shadow-lg relative">
							<pre className="text-gray-100 text-sm p-3"> 
								<code>
									<p>myCache.close();</p>
								</code>
							</pre>
						</div>
					</div>
					<br />
					<p>This will clear the interval timeout which is set on check period option.</p>
				</div> {/*marginLeft div*/}
		</div>
  );
};