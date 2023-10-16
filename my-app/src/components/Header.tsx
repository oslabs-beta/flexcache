'use client';

import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, StarIcon } from '@heroicons/react/24/outline';

import Image from 'next/image';
import Link from 'next/link';
import DemoButton from './MainButton';

const navigation = [
    { name: 'Features', href: '/features' },
    { name: 'Resources', href: '/resources' },
    { name: 'Docs', href: '/docs' },
    { name: 'About', href: '/about' },
];

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <header className='shadow-md sticky top-0 h-20 border-b border-b-slate-500 bg-white/10 backdrop-blur'
            style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, .3)' }} >
            <nav className='mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8' aria-label='Global'>

                <div className='flex items-center gap-x-12'>
                    <Link href={'/'} className='-m-1.5 p-1.5'>
                        <span className='sr-only'>supacache</span>
                        <Image src='/supacache.svg' alt='supacache' width={150} height={32} />
                    </Link>
                    <div className='hidden lg:flex lg:gap-x-12'>
                        {navigation.map((item) => (
                            <Link key={item.name} href={item.href} className='text-sm leading-6 text-slate-50'>
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
                <div className='flex lg:hidden'>
                    <button
                        type='button'
                        className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700'
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className='sr-only'>Open main menu</span>
                        <Bars3Icon className='h-6 w-6' aria-hidden='true' />
                    </button>
                </div>
                <div className='hidden lg:flex'>

                    <Link href={'https://github.com/oslabs-beta/supacache'} className='inline-flex items-center w-40 mr-3 text-sm leading-6 text-slate-50'>
                        <StarIcon className='h-5 w-7 inline' aria-hidden='true' /> Star us on GitHub
                    </Link>
                    <Link href={'/demo'}>
                        <DemoButton text='Try Demo' />
                    </Link>
                </div>
            </nav >

            <Dialog as='div' className='lg:hidden' open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className='fixed inset-0 z-10' />
                <Dialog.Panel className='fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10'>
                    <div className='flex items-center justify-between'>
                        <Link href={'#'} className='-m-1.5 p-1.5'>
                            <span className='sr-only'>supacache</span>
                            <Image
                                src='/supacache.svg'
                                alt='Logo'
                                width={150}
                                height={32}
                            />

                            <button
                                type='button'
                                className='-m-2.5 rounded-md p-2.5 text-gray-700'
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className='sr-only'>Close menu</span>
                                <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                            </button>
                        </Link>
                    </div>
                    <div className='mt-6 flow-root'>
                        <div className='-my-6 divide-y divide-gray-500/10'>
                            <div className='space-y-2 py-6'>
                                {navigation.map((item) => (
                                    <Link key={item.name} href={item.href} className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'>
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                            <div className='py-6'>
                                <Link href={'#'} className='-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'>
                                    Try Demo
                                </Link>
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header >
    )
}