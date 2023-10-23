import Image from 'next/image';
import Github from '@/icons/github';
import LinkedIn from '@/icons/linkedin';
import Link from 'next/link';

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
        <div className='mx-auto mt-20 max-w-7xl px-6 sm:mt-48 lg:px-8'>
            <div className='mx-auto max-w-2xl lg:mx-0'>
                <h2 className='text-3xl font-bold tracking-tight text-slate-200 sm:text-4xl'>Meet the Team!</h2>
                <p className="mt-6 text-lg leading-8 text-gray-400">
                    We’re a dynamic group of individuals who are passionate and dedicated to deliverying amazing software.
                </p>
            </div>

            <ul
                role='list'
                className='mx-auto my-20 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-12 text-center md:grid-cols-4 lg:mx-0 lg:max-w-none'
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
                                <button
                                    type="button"
                                >
                                    <Github />
                                </button>
                            </Link>
                            <Link href={`https://www.linkedin.com/in/${person.linkedin}`}>
                                <button
                                    type="button"
                                >
                                    <LinkedIn />
                                </button>
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
