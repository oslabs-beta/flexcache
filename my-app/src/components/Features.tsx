import React from 'react'
import { ArrowPathIcon, CloudArrowUpIcon, LockClosedIcon } from '@heroicons/react/20/solid'

const features = [
    {
        name: 'Open Source',
        description:
            'Built open source, Free for open source',
        href: '#',
        icon: CloudArrowUpIcon,
    },
    {
        name: 'Easy to Use',
        description:
            'Integrating should be as adding few lines',
        href: '#',
        icon: LockClosedIcon,
    },
    {
        name: 'Configurable',
        description:
            'Built in templates but configure to your liking',
        href: '#',
        icon: ArrowPathIcon,
    },
]

export default function Features() {
    return (
        <div className=" py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-indigo-600">Cache faster</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-slate-200 sm:text-4xl">
                        Everything you need to cache your app
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        It is a long established fact that a reader will be distracted by the readable content of a page when
                        looking at its layout.
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                        {features.map((feature) => (
                            <div key={feature.name} className="flex flex-col">
                                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-green-2åß00">
                                    <feature.icon className="h-5 w-5 flex-none text-green-400" aria-hidden="true" />
                                    {feature.name}
                                </dt>
                                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-400">
                                    <p className="flex-auto">{feature.description}</p>
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>

    )
}
