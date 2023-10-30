import React, { useState, useEffect, useRef } from "react";

export default function Terminal() {
  const contentToPrint = [
    { text: '//import FlexCache from npm flex-cache', color: 'gray' },
    { text: '\nimport', color: 'lightskyblue' },
    { text: ' ', color: 'n/a' },
    { text: '{', color: 'silver' },
    { text: ' ', color: 'n/a' },
    { text: 'FlexCache', color: 'sandybrown' },
    { text: ' ', color: 'n/a' },
    { text: '}', color: 'silver' },
    { text: ' ', color: 'n/a' },
    { text: 'from', color: 'lightskyblue' },
    { text: ' ', color: 'n/a' },
    { text: '"flex-cache"', color: 'palegreen' },
    { text: ';', color: 'silver' },
    { text: '\n\n//Initial FlexCache', color: 'gray' },
    { text: '\nconst', color: 'sandybrown' },
    { text: ' ', color: 'n/a' },
    { text: 'flexCache', color: 'lightskyblue' },
    { text: ' ', color: 'n/a' },
    { text: '=', color: 'sandybrown' },
    { text: ' ', color: 'n/a' },
    { text: 'new', color: 'gold' },
    { text: ' ', color: 'n/a' },
    { text: 'flexCache', color: 'mediumpurple' },
    { text: '(', color: 'silver' },
    { text: ')', color: 'silver' },
    { text: ';', color: 'silver' },
    { text: '\n\n//Invoke the set method from FlexCache', color: 'gray' },
    { text: '\nflexCache', color: 'mediumpurple' },
    { text: '.', color: 'silver' },
    { text: 'set', color: 'gold' },
    { text: '(', color: 'silver' },
    { text: 'key', color: 'turquoise' },
    { text: ',', color: 'silver' },
    { text: 'value', color: 'turquoise' },
    { text: ',', color: 'silver' },
    { text: 'optional', color: 'turquoise' },
    { text: ')', color: 'silver' },
    { text: ';', color: 'silver' },
    { text: '\n\n//Invoke the get method from FlexCache', color: 'gray' },
    { text: '\nflexCache', color: 'mediumpurple' },
    { text: '.', color: 'silver' },
    { text: 'get', color: 'gold' },
    { text: '(', color: 'silver' },
    { text: 'key', color: 'turquoise' },
    { text: ')', color: 'silver' },
    { text: ';', color: 'silver' },
    { text: '\n\n//Invoke the delete method from FlexCache', color: 'gray' },
    { text: '\nflexCache', color: 'mediumpurple' },
    { text: '.', color: 'silver' },
    { text: 'del', color: 'gold' },
    { text: '(', color: 'silver' },
    { text: 'key', color: 'turquoise' },
    { text: ')', color: 'silver' },
    { text: ';', color: 'silver' },
    { text: '\n\n//Invoke the take method from FlexCache', color: 'gray' },
    { text: '\nflexCache', color: 'mediumpurple' },
    { text: '.', color: 'silver' },
    { text: 'take', color: 'gold' },
    { text: '(', color: 'silver' },
    { text: 'key', color: 'turquoise' },
    { text: ')', color: 'silver' },
    { text: ';', color: 'silver' },
    { text: '\n\n//Reset the time to live of a key with the ttl method', color: 'gray' },
    { text: '\nflexCache', color: 'mediumpurple' },
    { text: '.', color: 'silver' },
    { text: 'ttl', color: 'gold' },
    { text: '(', color: 'silver' },
    { text: 'key', color: 'turquoise' },
    { text: ')', color: 'silver' },
    { text: ';', color: 'silver' },
    { text: '\n\n//Read the time to live of a key with getTtl the method', color: 'gray' },
    { text: '\nflexCache', color: 'mediumpurple' },
    { text: '.', color: 'silver' },
    { text: 'getTtl', color: 'gold' },
    { text: '(', color: 'silver' },
    { text: 'key', color: 'turquoise' },
    { text: ')', color: 'silver' },
    { text: ';', color: 'silver' },
    { text: '\n\n//Read all cached key(s) with keys method', color: 'gray' },
    { text: '\nflexCache', color: 'mediumpurple' },
    { text: '.', color: 'silver' },
    { text: 'keys', color: 'gold' },
    { text: '(', color: 'silver' },
    { text: 'key', color: 'turquoise' },
    { text: ')', color: 'silver' },
    { text: ';', color: 'silver' },
  ];

  const [output, setOutput] = useState([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);
  const [copied, setCopiedStatus] = useState<boolean>(false);


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
    <div
      ref={terminalRef}
      className="lg:grid grid-cols-2 gap-x-10 items-center container mx-auto px-4 font-normal sm:px-8 py-10">
      <div>
        <p className="font-normal	 tracking-tight">If you don't have a Node.js project set up, you'll have to create a file and cd into that directory.</p>
        <br />
        <p className="tracking-tight">run the following command in your terminal:</p>
        <br />
        <div className="p-1 bg-slate-500/[.12] rounded-xl shadow-md mb-4 mr-80">
          <div className="bg-gray-900 h-10 w-auto rounded-lg shadow-lg relative">
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
        <p className="tracking-tight">
          This will create a basic package.json file for your project.
        </p>
        <br />
        <p className="tracking-tight">
          Continue by installing the "flex-cache" npm package using the following command:
        </p>
        <br />
        <div className="p-1 bg-slate-500/[.12] rounded-xl shadow-md mb-4 mr-80">
          <div className="bg-gray-900 h-10 w-auto rounded-lg shadow-lg relative">
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
        <p className="tracking-tight">This will download and install the "flex-cache" library and add it as a dependency in your project.</p>
        <br />
        <p className="tracking-tight">You are all set! Now you can import the library in any javascript file and use flex-cache.</p>
      </div>

      <div className="p-2 bg-slate-500/[.12] rounded-xl shadow-md mb-4">
        <div className="flex items-center justify-start bg-gray-700 p-1 rounded-t-lg">
          <div className="h-3 w-3 bg-red-500 rounded-full mx-1"></div>
          <div className="h-3 w-3 bg-yellow-500 rounded-full mx-1"></div>
          <div className="h-3 w-3 bg-green-500 rounded-full mx-1"></div>
        </div>
        <div className="bg-gray-900 p-6 h-96 overflow-scroll rounded-b-xl shadow-lg relative">
          <pre className="text-gray-100 text-sm" style={{ fontFamily: "Menlo, monospace" }}>
            {output.map((item: any, index: number) => (
              <span key={index} style={{ color: item.color }}>
                {item.text}
              </span>
            ))}
          </pre>
        </div>
      </div>
    </div>
  );
}
