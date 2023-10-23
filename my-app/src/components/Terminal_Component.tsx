import React, { useState, useEffect } from "react";

export default function Terminal() {
	const [output, setOutput] = useState("");
  const contentToPrint = [
    'import {flexcache} from "flexcache"',
    'more messages...',
    'etc...',
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
    <div className="Terminal">
      <pre className="output">{output}</pre>
    </div>
  );
}
