"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// components
import Terminal from '../components/Terminal';
import Features from '../components/Features';
import MainButton from '../components/MainButton';
import SecondaryButton from '../components/SecondaryButton';
import Github from '../icons/github';
import Team from '../components/Team';
import Copy from '../components/Copy';
import GetStarted from '../components/GetStarted';

// icons
import { ChevronRightIcon } from '@heroicons/react/20/solid';


export default function Hero() {
  const [isTerminalVisible, setIsTerminalVisible] = useState(false);
  const terminalRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setIsTerminalVisible(true);
      }
    }, options);

    if (terminalRef.current) {
      observer.observe(terminalRef.current);
    }

    return () => {
      if (terminalRef.current) {
        observer.unobserve(terminalRef.current);
      }
    };
  }, []);

  return (
    <div className='pt-5 sm:px-6 sm:py-10 lg:px-8 '>
      <div className='mx-auto mt-5 mb-10 max-w-5xl text-center sm:my-20'>
        {/* ... Notification bubbles on top ... */}
        <div className="mt-15 sm:mt-32 lg:mt-16 lg:mb-5">
          <div className="inline-flex space-x-1">
            <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-sm font-semibold leading-6 text-indigo-400 ring-1 ring-inset ring-indigo-500/20">
              Latest update:
              <Link
                href={'https://github.com/oslabs-beta/supacache'}
                className="inline-flex items-center px-1 text-sm font-medium leading-6 text-gray-300">
                <span> Just shipped v1.0</span>
                <ChevronRightIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
              </Link>
            </span>
            {/* <Link href={'https://github.com/oslabs-beta/supacache'} className="inline-flex items-center space-x- text-sm font-medium leading-6 text-gray-300">
              <span>Just shipped v1.0</span>
              <ChevronRightIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
            </Link> */}
          </div>
        </div>
        {/* Hero Section */}
        <div className='flex flex-col items-center justify-center'>

          <h2 className='my-8 mx-5 text-5xl font-bold tracking-tight text-white sm:text-8xl'>
            Configurable. Persistent. Cache.
          </h2>
          <p className='mx-8 max-w-xl text-md leading-8 text-gray-300 sm:text-lr lr:text-2xl'>
            Elevate your project with persistent caching and a fine-tuned Cache Invalidation Policy
          </p>

          {/* Click to Copy */}
          <div className='my-10 flex flex-col items-center justify-center'>
            {/* <Copy
              textToCopy={'npm install flex-cache'}
              bgColor={'rgba(46, 81, 43, 0.47)'}
              brColor={'rgba(59, 255, 43, 0.66)'} /> */}
            <Copy
              textToCopy={'npm install flex-cache'}
              bgColor={'rgba(55, 55, 55, 0.47)'}
              brColor={'rgba(85, 85, 85, 0.66)'}
            />
          </div>
        </div>
        {/* Action Buttons */}
        {/* <div className='mt-10 flex items-center justify-center gap-x-6'>
          <Link href={'/demo'}>
            <MainButton text='Try Demo' />
          </Link>
          <Link href={'https://github.com/oslabs-beta/supacache'}>
            <SecondaryButton icon={<Github />} text='GitHub' />
          </Link>
        </div> */}
      </div>

      {/* Features Section */}
      <Features />

      {/* <p className="flex justify-center items-center text-3x text-slate-200 sm:text-4xl">Get Started</p> */}
      {/* Get Started/ Terminal */}
      <div ref={terminalRef}>
        {isTerminalVisible && <GetStarted />}
      </div>

      {/* Get Started Section */}
      {/* <GetStarted /> */}

      {/* Team Section */}
      <Team />
    </div>
  );
}

