'use client';
import React from 'react'
// import { ArrowPathIcon, CloudArrowUpIcon, LockClosedIcon } from '@heroicons/react/20/solid'

import { CubeTransparentIcon, AdjustmentsHorizontalIcon, Square2StackIcon, CheckCircleIcon, PuzzlePieceIcon } from '@heroicons/react/24/outline'

// import Copy from "./Copy";
// import Terminal from "./Terminal";

const features = [
    {
        name: 'Open Source',
        description:
            'Built open source, Free for open source',
        href: '#',
        icon: CubeTransparentIcon,
    },
    {
        name: 'Easy to Use',
        description:
            'Integrating should be as adding few lines',
        href: '#',
        icon: CheckCircleIcon,
    },
    {
        name: 'Configurable',
        description:
            'Built in templates but configure to your liking',
        href: '#',
        icon: AdjustmentsHorizontalIcon,
    },
]

export default function Features() {
    return (
        <div className='flex items-center justify-center'>
            <div
                className="xl:mx-20 lg:mx-20 max-w-screen-xl lg:my-20 lg:p-4 md:grid-cols-3 md:mx-90 md:my-20 md:p-3 my-5 mx-3 gap-3 items-center justify-center grid grid-cols-1 p-2.5 rounded-xl border border-white/[.15] bg-neutral-800/15 backdrop-blur shadow-[0_4px_15px_rgba(56,_61,_100,_.1)]"
            >
                <div className="md:col-span-3 md:py-20 flex flex-col items-center justify-center py-40 h-60 space-y-5 border rounded-lg bg-blue-900/[.08]
            shadow-[0_10px_70px_rgba(56,_61,_197,_.2),inset_0px_-8px_40px_rgba(53,_63,_166,_.3)] hover:shadow-[0_10px_70px_rgba(96,_165,_250,_.15)] 
            border-white/[.25] hover:border-blue-400/[.7] 
            z-2">
                    <p className=' text-indigo-400'>
                        Cache Faster
                    </p>
                    <h1 className='px-10 text-2xl md:text-4xl font-bold text-center'>
                        Your Ultimate Caching Toolkit
                    </h1>
                    <p className='text-sm md:text-md text-center font-light text-slate-300 px-10 md:px-50 lr:px-60'>
                        With a focus on simplicity and speed, our caching solutions seamlessly blend into
                        your platform for an immediate performance boost.
                    </p>
                </div>

                {/* "https://manuarora.in/boxshadows" */}
                {
                    features.map((feature) => (
                        <div
                            key={feature.name}
                            className="md:p-0 md:py-10 flex flex-col items-center justify-center p-10 rounded-lg border shadow-[inset_0_-30px_40px_19px_rgba(53,_63,_166,_.1),0_6px_20px_rgba(93,_109,_166,_.08)] hover:shadow-[0_10px_70px_rgba(96,_165,_250,_.10)] border-white/[.2] hover:border-blue-400/[.7] bg-black/[.15]"
                        >
                            <dt className="flex flex-col items-center text-center gap-x-3 text-base font-semibold leading-7 text-green-2åß00">
                                <feature.icon className="h-10 w-10 mb-3 flex-none text-green-400" aria-hidden="true" />
                                <p className='md:text-lg text-xl'>
                                    {feature.name}
                                </p>
                            </dt>
                            <dd className="md:text-sm md:px-5 mt-4 flex flex-auto flex-col px-10 text-center leading-7 text-slate-300">
                                <p className="flex-auto">{feature.description}</p>
                            </dd>
                        </div>
                    ))
                }
            </div >
        </div >
    )
}
