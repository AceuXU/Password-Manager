import React from 'react'

const Footer = () => {
    return (
        <div className=' text-white flex col justify-center items-center gap-2 bottom-0 w-full'>
            <div className="logo font-bold text-2xl ">
                <span className=' text-green-500'> &lt;</span>
                <span>Pass</span>
                <span className=' text-green-500'>OP/&gt;</span>

            </div>
            <div className='flex gap-1 justify-center items-center font-serif'>
                Created with <img className=' w-[18px]' src="public/icons/heart.png" alt="" /> By Ratan
            </div>
        </div>
    )
}

export default Footer
