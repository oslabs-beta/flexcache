import { useState } from "react";
import React from "react";

import SecondaryButtonRightIcon from "./SecondaryButtonRightIcon";
import { Square2StackIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

export default function Copy() {

    const [copied, setCopiedStatus] = useState<boolean>(false);
    const textToCopy = 'npm install flex-cache';


    const handleClick = async () => {
        try {
            // copy to clipboard
            await navigator.clipboard.writeText(textToCopy);

            // set status to true
            setCopiedStatus(true);

            // set status back to false
            setTimeout(() => {
                setCopiedStatus(false)
            }, 1500)

        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <div onClick={handleClick}>
            {copied ?
                <SecondaryButtonRightIcon
                    icon={<CheckCircleIcon className="h-t w-5 mx-3" />}
                    text={textToCopy}
                />
                :
                <SecondaryButtonRightIcon
                    icon={<Square2StackIcon className="h-t w-5 mx-3" />}
                    text={textToCopy}
                />
            }
        </div>
    );
}