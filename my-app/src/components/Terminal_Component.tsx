import React, { useState, useEffect } from "react";

export default function Terminal() {
  const [output, setOutput] = useState("");
  const contentToPrint = [
    'import { flexCache } from "flex-cache";',
    '',
    'const flexCache = new flexCache();',
    '',
    'flexCache.set( key, value, optional)',
    ''
  ];
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);

  useEffect(() => {
    const printContent = () => {
      if (currentMessageIndex < contentToPrint.length) {
        const currentMessage = contentToPrint[currentMessageIndex];

        if (currentCharacterIndex < currentMessage.length) {
          setOutput((prevOutput) => prevOutput + currentMessage[currentCharacterIndex]);
          setCurrentCharacterIndex(currentCharacterIndex + 1);
        } else {
          // Add a line break and move to the next message
          setOutput((prevOutput) => prevOutput + "\n");
          setCurrentCharacterIndex(0);
          setCurrentMessageIndex(currentMessageIndex + 1);
        }
      }
    };

    // Set the interval to print letter by letter
    const interval = setInterval(printContent, 40); // Adjust the delay as needed

    // Clear the interval after all messages are printed
    if (currentMessageIndex >= contentToPrint.length) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [currentMessageIndex, currentCharacterIndex]);

  return (
    <div className="lg:grid grid-cols-2 gap-x-10 items-center container max-w-[85rem] mx-auto px-4 sm:px-8 pt-20 pb-28">
      <div>
        <span>Before you implement flex-cache into your code, first npm install flex-cache!</span>
      </div>
      <div style={{ backgroundColor: "rgba(169, 169, 169, 0.12)" }} className="p-4 rounded-xl shadow-md mb-4">
        <div className="flex items-center justify-start bg-gray-700 p-2 rounded-t-xl">
          <div className="h-3 w-3 bg-red-500 rounded-full mx-1"></div>
          <div className="h-3 w-3 bg-yellow-500 rounded-full mx-1"></div>
          <div className="h-3 w-3 bg-green-500 rounded-full mx-1"></div>
        </div>
        <div className="bg-gray-900 p-6 h-96 overflow-scroll rounded-b-xl shadow-lg relative">
          <pre className="text-gray-100 text-sm" style={{ fontFamily: "Menlo, monospace" }}>
            {output}
          </pre>
        </div>
      </div>
    </div>
  );
}
