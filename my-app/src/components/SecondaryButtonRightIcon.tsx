import { Autour_One } from 'next/font/google'
import React from 'react'

export default function SecondaryButtonRightIcon({ icon, text }: { icon?: React.ReactNode, text: string }) {
    return (
        <button
            type="button"
            className="flex items-center justify-center w-50 py-2 text-sm font-regular text-white rounded-md shadow-2xl hover:bg-green-200  "
            style={{
                backgroundColor: 'rgba(46, 81, 43, 0.47)',
                borderColor: 'rgba(59, 255, 43, 0.66)',
                borderWidth: '2px',
                boxShadow: '0 4px 4px rgba(0, 0, 0, .3)',
            }}
        >

            <span className='mx-5' style={{ textShadow: '0px 2px 4px rgba(0, 0, 0, .3)' }}>
                {text}
            </span>
            {icon && <span
                className='flex items-center'
                style={{
                    textShadow: '0px 2px 4px rgba(0, 0, 0, .3)'
                }}>
                {icon}
            </span>}
        </button>
    )
}