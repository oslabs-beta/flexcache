"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from "framer-motion";

// components
import Features from '../components/Features';
import Team from '../components/Team';
import Copy from '../components/Copy';
import GetStarted from '../components/GetStarted';

// icons
import { ChevronRightIcon } from '@heroicons/react/20/solid';


export default function Hero() {
  const [isTerminalVisible, setIsTerminalVisible] = useState(false);
  const terminalRef = useRef(null);
  const scrollRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["-0.2 1", ".5 1"],
  });

  const scaleProgess = useTransform(scrollYProgress, [-1, 1], [0.6, 1]);
  const opacityProgess = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

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
      <div className='mx-auto mt-5 md:my-5  max-w-5xl text-center'>
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
          </div>
        </div>
        {/* Hero Section */}
        <div className='flex flex-col items-center justify-center'>
          <h2 className='my-8 mx-5 tracking-tight text-5xl font-bold text-white sm:text-8xl'>
            {["Configurable.", "Persistent.", "Fast."].map((word, index) => (
              <motion.span
                key={index}
                style={{
                  display: "inline-block",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * .20 }}>
                {word}&nbsp;
              </motion.span>
            ))}
          </h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", damping: 10, stiffness: 100 }}>
            <p className='mx-8 max-w-xl text-md leading-8 text-gray-300 sm:text-lr lr:text-2xl'>
              Elevate your project with persistent caching and a fine-tuned cache invalidation policy
            </p>
          </motion.div>
          <div className='mt-10 flex flex-col items-center justify-center'>
            <motion.div
              initial={{ opacity: 0, x: -20, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ type: "spring", damping: 10, stiffness: 100 }}>
              <Copy
                textToCopy={'npm install flex-cache'}
                bgColor={'rgba(55, 55, 55, 0.47)'}
                brColor={'rgba(85, 85, 85, 0.66)'}
              />
            </motion.div>
          </div>
        </div>
      </div>
      {/* Features Section */}
      <motion.div
        id='features'
        ref={scrollRef}
        style={{
          scale: scaleProgess,
          opacity: opacityProgess,
        }}>
        <Features />
      </motion.div>
      <div ref={terminalRef}>
        {isTerminalVisible && <GetStarted />}
      </div>
      {/* Team Section */}
      <Team />
    </div>
  );
}
