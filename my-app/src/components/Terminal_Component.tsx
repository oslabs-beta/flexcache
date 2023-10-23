import React, { useState, useEffect } from "react";
import ClipboardJS from "clipboard";

export default function Terminal() {
  const [output, setOutput] = useState("");
  const contentToPrint = [
    'import { flexCache } from "flex-cache";',
    '',
    'const flexCache = new flexCache();',
    '',
    'flexCache.set( key, value, optional)',
    '',
    'flexCache.get( key, value )'
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

  useEffect(() => {
    // Initialize ClipboardJS to enable copying the code
    new ClipboardJS(".copy-button");
  }, []);

  return (
    <div className="lg:grid grid-cols-2 gap-x-10 items-center container max-w-[85rem] mx-auto px-4 sm:px-8 pt-20 pb-28">
      <div className="p-4">
        <h1>Docs</h1>
        {/* Add your documentation content here */}
      </div>
      <div className="bg-black p-6 h-64 overflow-scroll rounded-2xl shadow-lg relative">
        <pre className="output text-gray-100 font-mono whitespace-pre-wrap">{output}</pre>
        <button
          className="copy-button bg-gray-500 text-white px-4 py-2 rounded absolute top-4 right-4"
          data-clipboard-target=".output">
        icon
        </button>
      </div>
    </div>
  );
}