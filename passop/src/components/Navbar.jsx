import React from 'react'

const Navbar = () => {
    return (
        <nav className=' text-white bg-slate-800  '>
            <div className="mycontainer flex justify-between items-center px-4 py-5 h-14 animate-pulse">

                <div className="logo font-bold text-2xl ">
                    <span className=' text-green-500'> &lt;</span>
                    <span>Pass</span>
                    <span className=' text-green-500'>OP/&gt;</span>

                </div>
                {/* <ul>
                    <li className='flex gap-4'>
                        <a className='hover:font-bold' href="#">Home</a>
                        <a className='hover:font-bold' href="#">About</a>
                        <a className='hover:font-bold' href="#">Contact</a>
                    </li>
                </ul> */}
                <button className='text-white bg-gray-900 p-2 rounded-full flex gap-3 ring-blue-800 ring-1 hover:ring-blue-500'>
                    <img className='invert w-6 cursor-pointer' src="icons/github.png" alt="github" />
                    <span className='font-bold'>GitHub</span>
                </button>

            </div>
        </nav>
    )
}

export default Navbar
