'use client';

import Link from 'next/link';
import React from 'react';

// Components
import Features from '../components/Features';
import MainButton from '../components/MainButton';
import SecondaryButton from '../components/SecondaryButton';
import Terminal from '../components/Terminal_Component';
import Team from '../components/Team';
import Copy from '../components/Copy';

// Icons
import Github from '../icons/github';
import { ChevronRightIcon } from '@heroicons/react/20/solid'

// Export 
export default function Hero() {
  return (
    <div className='mt-10 px-6 py-54 sm:px-6 sm:py-10 lg:px-8'>
      <div className='mx-auto my-20 5 max-w-5xl text-center sm:my-20'>

        {/* Notificaiton bubbles on top */}
        <div className="mt-24 sm:mt-32 lg:mt-16">
          <div className="inline-flex space-x-6">
            <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-sm font-semibold leading-6 text-indigo-400 ring-1 ring-inset ring-indigo-500/20">
              Latest updates
            </span>
            <Link href={'https://github.com/oslabs-beta/supacache'} className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-300">
              <span>Just shipped v1.0</span>
              <ChevronRightIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Hero Section */}
        <h2 className='my-8 text-6xl font-bold tracking-tight text-white sm:text-8xl'>
          Configurable. Persistent. Fast.
        </h2>
        <p className='mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300 sm:text-lr lr:text-2xl'>
          Elevate your project with persistent caching and a fine-tuned Cache Invalidation Policy
        </p>

        {/* Action Buttons */}
        {/* <div className='mt-10 flex items-center justify-center gap-x-6'>
          <Link href={'/demo'}>
            <MainButton text='Try Demo' />
          </Link>
          <Link href={'https://github.com/oslabs-beta/supacache'}>
            <SecondaryButton icon={<Github />} text='GitHub' />
          </Link>
        </div> */}

        {/* Click to Copy */}
        <div className='my-10 flex flex-col items-center justify-center'>
          <Copy />
        </div>
      </div>
      {/* Features Section */}
      <Features />

      {/* Get Started */}
      <Terminal />

      {/* Team Section */}
      <Team />
    </div>
  )
}
