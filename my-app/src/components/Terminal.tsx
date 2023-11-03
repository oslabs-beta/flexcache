import React, { useState, useEffect, useRef } from "react";

export default function Terminal() {
  const contentToPrint = [
    { text: '// Import flexCache from npm flexcache', color: 'gray' },
    { text: '\nimport', color: 'lightskyblue' },
    { text: ' ', color: 'n/a' },
    { text: '{', color: 'silver' },
    { text: ' ', color: 'n/a' },
    { text: 'flexcache', color: 'sandybrown' },
    { text: ' ', color: 'n/a' },
    { text: '}', color: 'silver' },
    { text: ' ', color: 'n/a' },
    { text: 'from', color: 'lightskyblue' },
    { text: ' ', color: 'n/a' },
    { text: '"flexcache"', color: 'palegreen' },
    { text: ';', color: 'silver' },
    { text: '\n\n// Initialize FlexCache', color: 'gray' },
    { text: '\nconst', color: 'sandybrown' },
    { text: ' ', color: 'n/a' },
    { text: 'myCache', color: 'lightskyblue' },
    { text: ' ', color: 'n/a' },
    { text: '=', color: 'sandybrown' },
    { text: ' ', color: 'n/a' },
    { text: 'new', color: 'gold' },
    { text: ' ', color: 'n/a' },
    { text: 'flexCache', color: 'mediumpurple' },
    { text: '(', color: 'silver' },
    { text: ')', color: 'silver' },
    { text: ';', color: 'silver' },

    { text: '\n\n// Retrieve persisted snapshot of cache', color: 'gray' },
    { text: '\nmyCache', color: 'mediumpurple' },
    { text: '.', color: 'silver' },
    { text: 'retrieveCacheContents', color: 'gold' },
    { text: '(', color: 'silver' },
    { text: ')', color: 'silver' },
    { text: '\n  .', color: 'silver' },
    { text: 'then', color: 'gold' },
    { text: '(', color: 'silver' },
    { text: '(', color: 'silver' },
    { text: ')', color: 'silver' },
    { text: ' => ', color: 'silver' },
    { text: '{', color: 'silver' },
    { text: '\n  // initialize persistance loop', color: 'gray' },
    { text: '\n  myCache', color: 'mediumpurple' },
    { text: '.', color: 'silver' },
    { text: 'persistCacheContents', color: 'gold' },
    { text: '(', color: 'silver' },
    { text: ')', color: 'silver' },
    { text: '\n\n  {*add code here*}', color: 'gray' },
    { text: '\n\n }', color: 'silver' },
    { text: '\n\n//Invoke the set method', color: 'gray' },
    { text: '\nmyCache', color: 'mediumpurple' },
    { text: '.', color: 'silver' },
    { text: 'set', color: 'gold' },
    { text: '(', color: 'silver' },
    { text: 'key', color: 'turquoise' },
    { text: ',', color: 'silver' },
    { text: 'value', color: 'turquoise' },
    { text: ',', color: 'silver' },
    { text: 'ttl', color: 'turquoise' },
    { text: ')', color: 'silver' },
    { text: ';', color: 'silver' },
    { text: '\n\n//Invoke the get method', color: 'gray' },
    { text: '\nflexCache', color: 'mediumpurple' },
    { text: '.', color: 'silver' },
    { text: 'get', color: 'gold' },
    { text: '(', color: 'silver' },
    { text: 'key', color: 'turquoise' },
    { text: ')', color: 'silver' },
    { text: ';', color: 'silver' },
    { text: '\n\n//Invoke the delete method', color: 'gray' },
    { text: '\nflexCache', color: 'mediumpurple' },
    { text: '.', color: 'silver' },
    { text: 'del', color: 'gold' },
    { text: '(', color: 'silver' },
    { text: 'key', color: 'turquoise' },
    { text: ')', color: 'silver' },
    { text: ';', color: 'silver' },
    { text: '\n\n//Invoke the take method', color: 'gray' },
    { text: '\nflexCache', color: 'mediumpurple' },
    { text: '.', color: 'silver' },
    { text: 'take', color: 'gold' },
    { text: '(', color: 'silver' },
    { text: 'key', color: 'turquoise' },
    { text: ')', color: 'silver' },
    { text: ';', color: 'silver' },
    { text: '\n\n//Reset the TTL', color: 'gray' },
    { text: '\nflexCache', color: 'mediumpurple' },
    { text: '.', color: 'silver' },
    { text: 'ttl', color: 'gold' },
    { text: '(', color: 'silver' },
    { text: 'key', color: 'turquoise' },
    { text: ')', color: 'silver' },
    { text: ';', color: 'silver' },
    { text: '\n\n//Read the TTL', color: 'gray' },
    { text: '\nflexCache', color: 'mediumpurple' },
    { text: '.', color: 'silver' },
    { text: 'getTtl', color: 'gold' },
    { text: '(', color: 'silver' },
    { text: 'key', color: 'turquoise' },
    { text: ')', color: 'silver' },
    { text: ';', color: 'silver' },
    { text: '\n\n//Get all cached key(s)', color: 'gray' },
    { text: '\nflexCache', color: 'mediumpurple' },
    { text: '.', color: 'silver' },
    { text: 'keys', color: 'gold' },
    { text: '(', color: 'silver' },
    { text: 'key', color: 'turquoise' },
    { text: ')', color: 'silver' },
    { text: ';', color: 'silver' },
  ];
  type outputMessage = {
    text: string
    color: string
  }
  const [output, setOutput] = useState<outputMessage[]>([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);


  const terminalRef = useRef(null);

  useEffect(() => {
    const printContent = () => {
      if (currentMessageIndex < contentToPrint.length) {
        const currentMessage = contentToPrint[currentMessageIndex];
        const currentText = currentMessage.text;

        if (currentCharacterIndex < currentText.length) {
          setOutput((prevOutput: any) => [
            ...prevOutput, {
              text: currentText[currentCharacterIndex],
              color: currentMessage.color
            }])

          setCurrentCharacterIndex(currentCharacterIndex + 1);
        } else {
          setCurrentCharacterIndex(0);
          setCurrentMessageIndex(currentMessageIndex + 1);
        }
      }
    };

    const interval = setInterval(printContent, 25);

    if (currentMessageIndex >= contentToPrint.length) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [currentMessageIndex, currentCharacterIndex]);

  return (
    <div ref={terminalRef} className="">
      <div className="flex flex-col lg:gap-10 max-w-2xl mx-auto">
        <div className="flex flex-col p-1 bg-slate-500/[.12] rounded-xl shadow-md">
          <div className="flex items-center justify-start bg-gray-700 p-2 rounded-t-lg">
            <div className="h-3 w-3 bg-red-500 rounded-full mx-1"></div>
            <div className="h-3 w-3 bg-yellow-500 rounded-full mx-1"></div>
            <div className="h-3 w-3 bg-green-500 rounded-full mx-1"></div>
          </div>
          <div className="flex flex-col bg-slate-900/[.7] p-5 rounded-b-lg shadow-md min-w-0 sm:w-full md:max-w-2xl lg:max-w-2xl xl:max-w-2xl h-96 overflow-y-auto">
            <pre className="text-xs sm:text-sm" style={{ fontFamily: "Menlo, monospace" }}>
              {output.map((item, index) => (
                <span key={index} style={{ color: item.color }}>
                  {item.text}
                </span>
              ))}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
