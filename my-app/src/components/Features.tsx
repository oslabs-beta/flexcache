import React from 'react'
import { ArrowPathIcon, CloudArrowUpIcon, LockClosedIcon } from '@heroicons/react/20/solid'

import { CubeTransparentIcon, AdjustmentsHorizontalIcon, Square2StackIcon, CheckCircleIcon, PuzzlePieceIcon } from '@heroicons/react/24/outline'


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

        <div
            className="mx-20 my-40 gap-4 grid grid-cols-1 md:grid-cols-3 rounded-xl border border-white/[.15] p-4 bg-neutral-600/20 backdrop-blur"
            style={{
                boxShadow: '0 4px 15px rgba(0, 0, 0, .2)'
            }}
        >
            <div className="md:col-span-3 flex flex-col items-center justify-center border border-white/[.25] rounded-lg bg-black/[.12] h-60 z-1"
                style={{
                    boxShadow: 'inset 0 -30px 40px 19px rgba(56, 61, 197, .08) ,0 6px 20px rgba(93, 109, 166, .15)'
                }}>
                <p className='text-indigo-400'>Cache Faster</p>
                <h1 className='text-4xl font-bold'>Your Ultimate Caching Toolkit</h1>
                <p className='text-md font-light text-slate-400'>With a focus on simplicity and speed, our caching solutions seamlessly blend into
                    your platform for an immediate performance boost.</p>
            </div>
            {features.map((feature) => (
                <div
                    key={feature.name}
                    className="flex flex-col items-center justify-center p-10 rounded-lg h-60 border border-white/[.2] hover:border-blue-400/[.7]  bg-black/[.15]"
                    style={{
                        boxShadow: 'inset 0 -30px 40px 19px rgba(59, 63, 166, .08) ,0 6px 20px rgba(93, 109, 166, .15)'
                    }}>
                    <dt className="flex flex-col items-center text-center gap-x-3 text-base font-semibold leading-7 text-green-2åß00">
                        <feature.icon className="h-10 w-10 mb-3 flex-none text-green-400" aria-hidden="true" />
                        <p className='text-xl'>
                            {feature.name}
                        </p>
                    </dt>
                    <dd className="mt-4 flex flex-auto flex-col px-10 text-center leading-7 text-slate-400">
                        <p className="flex-auto">{feature.description}</p>
                    </dd>
                </div>
            ))}
        </div>
    )
}
