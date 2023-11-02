import React from 'react'

export default function SecondaryButton({ icon, text }: { icon?: React.ReactNode, text: string }) {
    return (
        <button
            type="button"
            className="flex items-center justify-center w-40 gap-2 px-3 py-2 ml-3 text-sm font-regular text-white rounded-md shadow-lr hover:bg-green-500"
            style={{
                backgroundColor: 'rgba(46, 81, 43, 0.47)',
                borderColor: 'rgba(59, 255, 43, 0.66)',
                borderWidth: '2px',
                boxShadow: '0 4px 4px rgba(0, 0, 0, .3)'
            }}
        >
            {icon && <span className='flex items-center' style={{ textShadow: '0px 2px 4px rgba(0, 0, 0, .3)' }}>
                {icon}
            </span>}
            <span style={{ textShadow: '0px 2px 4px rgba(0, 0, 0, .3)' }}>
                {text}
            </span>
        </button>
    )
}