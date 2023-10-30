"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Terminal from '../components/Terminal_Component';
import Features from '../components/Features';
import MainButton from '../components/MainButton';
import SecondaryButton from '../components/SecondaryButton';
import Team from '../components/Team';
import Copy from '../components/Copy';
import Github from '../icons/github';
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
    <div className='mt-10 px-6 py-54 sm:px-6 sm:py-10 lg:px-8'>
      <div className='mx-auto my-20 5 max-w-5xl text-center sm:my-20'>
        {/* ... Notification bubbles on top ... */}
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
      <Features />
      {/* Features Section */}
      <p className="mt-2 text-3xl font-bold tracking-tight text-slate-200 sm:text-4xl ml-32">Get Started</p>
      {/* Get Started/ Terminal */}
      <div ref={terminalRef}>
        {isTerminalVisible && <Terminal />}
      </div>
      {/* Team Section */}
      <Team />
    </div>
  );
}

