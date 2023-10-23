'use client';

import Link from 'next/link';
import MainButton from '@/components/MainButton';
import SecondaryButton from '@/components/SecondaryButton';
import Github from '@/icons/github';
import Terminal from '@/components/Terminal_Component';

export default function Hero() {
  return (
    <main>
      <div className='px-6 py-54 sm:px-6 sm:py-32 lg:px-8'>
        <div className='mx-auto my-auto max-w-5xl text-center'>
          <h2 className='text-3xl font-bold tracking-tight text-white sm:text-7xl'>
            Fast. Persistent. Configurable.
          </h2>
          <p className='mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300'>
            Elevate your project with persistent caching and a fine-tuned Cache Invalidation Policy.
          </p>
          <div className='mt-10 flex items-center justify-center gap-x-6'>
            <Link href={'/demo'}>
              <MainButton text='Try Demo' />
            </Link>
            <Link href={'https://github.com/oslabs-beta/supacache'}>
              <SecondaryButton icon={<Github />} text='GitHub' />
            </Link>
          </div>
        </div>
      <span className='font-bold text-white text-3xl mx-auto mt-6 leading-8'>Quick Start</span>
      <Terminal />
    </div>
  </main>
  )
}
