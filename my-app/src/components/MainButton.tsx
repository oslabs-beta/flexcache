import React from 'react'

export default function Button({ icon, text }: { icon?: React.ReactNode, text: string }) {
    return (
        <button
            type="button"
            className="flex items-center justify-center w-40 gap-2 px-3 py-2 text-sm font-regular text-white bg-green-600 border border-green-400 rounded-md shadow-2xl hover:bg-green-900"
        // style={{ boxShadow: '0 4px 4px rgba(0, 0, 0, .3)' }}
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