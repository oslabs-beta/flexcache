import React from 'react';

import Link from 'next/link';
import Image from 'next/image';

import Github from '../icons/github';
import LinkedIn from '../icons/linkedin';

const team = [
    {
        name: 'Charlie Woodlief',
        role: 'Software Engineer',
        imageUrl: '/charlie.png',
        linkedin: 'charlie-woodlief-b70a19168',
        github: 'cwoodlief26',
    },
    {
        name: 'Brian Yang',
        role: 'Software Engineer',
        imageUrl: '/brian.png',
        linkedin: 'brian-yang-profile',
        github: 'brian-yg',
    },
    {
        name: 'Pravek Karwe',
        role: 'Software Engineer',
        imageUrl: '/pk.png',
        linkedin: 'pravek-karwe',
        github: 'pkarwe62',
    },
    {
        name: 'Jake Bayar',
        role: 'Software Engineer',
        imageUrl: '/jake.png',
        linkedin: 'jakebayar',
        github: 'jakebayar',
    },
]

export default function Team() {
    return (

        <div className='flex justify-center'>
            <div
                className="max-w-screen-xl lg:my-20 lg:p-4  md:mx-90 md:my-20 md:p-3 my-5 mx-3 gap-3 items-center justify-center p-2.5 rounded-xl border border-white/[.15] bg-neutral-800/15 backdrop-blur shadow-[0_4px_15px_rgba(56,_61,_100,_.1)]"
            >
                <div className="
                flex 
                flex-col 
                items-center 
                justify-center 
                space-y-5
                border 
                rounded-lg 
                bg-blue-900/[.08]
                shadow-[0_10px_70px_rgba(56,_61,_197,_.2),inset_0px_-8px_40px_rgba(53,_63,_166,_.3)] 
                hover:shadow-[0_10px_70px_rgba(96,_165,_250,_.15)] 
                border-white/[.25] 
                hover:border-blue-400/[.7] 
                z-2
                "
                >
                    <div className=' p-5 mt-5 lg:mx-20 lg:mt-10 max-w-7xl'>
                        <div className='mx-auto max-w-2xl lg:mx-0'>
                            <h2 className='text-3xl font-bold tracking-tight text-slate-200 sm:text-4xl'>Meet the Team!</h2>
                            <p className="mt-6 text-lg leading-8 text-gray-400">
                                We’re a dynamic group of individuals who are passionate and dedicated to deliverying amazing software.
                            </p>
                        </div>

                        <ul
                            role='list'
                            className='mx-auto mt-10 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-12 text-center md:grid-cols-4 lg:mx-0 lg:max-w-none'
                        >
                            {team.map((person) => (
                                <li key={person.name} className='bg-slate-00 rounded-3xl sm:py-12'>
                                    <Image
                                        src={person.imageUrl}
                                        width={200}
                                        height={124}
                                        alt='person image'
                                        className='mx-auto h-35 w-35 rounded-full'
                                    />
                                    <h3 className='mt-6 text-base font-semibold leading-7 tracking-tight text-slate-200'>{person.name}</h3>
                                    <p className='text-sm leading-6 text-slate-400'>{person.role}</p>

                                    <div className='flex justify-center items-center flex-row gap-2 mt-3'>
                                        <Link href={`https://github.com/${person.github}`}>
                                            <button type="button">
                                                <Github />
                                            </button>
                                        </Link>
                                        <Link href={`https://www.linkedin.com/in/${person.linkedin}`}>
                                            <button type="button">
                                                <LinkedIn />
                                            </button>
                                        </Link>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
