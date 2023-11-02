'use client';
import React from 'react';
import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, StarIcon } from '@heroicons/react/24/outline';

import Image from 'next/image';
import Link from 'next/link';
import DemoButton from './MainButton';

// Navigation object
const navigation = [
    // { name: 'Features', href: '/features' },
    { name: 'Docs', href: '/docs' },
    // { name: 'About', href: '/about' },
];

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className='shadow-md sticky top-0 z-10 h-20 border-b border-b-slate-500 bg-white/10 backdrop-blur'
            style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, .3)' }} >
            <nav
                className='mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8'
                aria-label='Global'>

                <div className='flex items-center gap-x-12 '>
                    <Link
                        href={'/'}
                        className='ml-4 p-1.5'>
                        <span className='sr-only'>flexcache</span>
                        <Image
                            src='/flexcache.svg'
                            alt='flexcache'
                            width={100}
                            height={20}
                            className='max-w-[100px]'
                        />
                    </Link>
                    <div className='hidden lg:flex lg:gap-x-12'>
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className='text-sm leading-6 text-slate-50 hover:text-green-400'>
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
                <div className='flex lg:hidden'>
                    <button
                        type='button'
                        className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-200'
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <span className='sr-only'>Open main menu</span>
                        {mobileMenuOpen ?
                            <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                            : <Bars3Icon className='h-6 w-6' aria-hidden='true' />}

                    </button>
                </div>
                <div className='hidden lg:flex'>
                    <Link
                        href={'https://github.com/oslabs-beta/supacache'}
                        className='inline-flex items-center w-40 mr-3 text-sm leading-6 text-slate-50 hover:text-green-400'>
                        <StarIcon className='h-5 w-7 inline' aria-hidden='true' /> Star us on GitHub
                    </Link>
                    <Link href={'/demo'}>
                        <DemoButton text='Try Demo' />
                    </Link>
                </div>
            </nav >

            {/* Mobile Hamburger Menu */}
            <Dialog
                as='div'
                className='lg:hidden'
                open={mobileMenuOpen}
                onClose={setMobileMenuOpen}>
                <div className='fixed inset-0' />
                <Dialog.Panel className='fixed inset-y-0 right-0 w-full overflow-y-auto bg-slate-800 px-6 py-10 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10'>
                    <div className='flex flex-row items-center justify-between'>
                        <button onClick={() => setMobileMenuOpen(false)}
                        >
                            <Link
                                href={'/'}
                                className=' invisible ml-4 p-1.5'>
                                width={100}
                                height={20}
                            </Link>
                        </button>

                        <button
                            type='button'
                            className='-m-2.5 rounded-md p-2.5 text-gray-700'
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className='sr-only'>Close menu</span>
                            <XMarkIcon className='h-6 w-6' />
                        </button>
                    </div>
                    <div className='mt-10 flow-root'>
                        <div className='-my-6 divide-y divide-gray-500/10'>
                            <div className='space-y-2 py-6'>
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => { setMobileMenuOpen(false); }}
                                        className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-200 hover:bg-gray-50'
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                            <div className='py-6'>
                                <Link
                                    href={'/demo'}
                                    onClick={() => {
                                        setMobileMenuOpen(false);
                                    }}
                                >
                                    <DemoButton text='Try Demo' />
                                </Link>
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header >
    )
}