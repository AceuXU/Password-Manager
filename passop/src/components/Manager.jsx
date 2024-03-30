import React, { useEffect } from 'react'
import { useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords")
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }
    }, []);

    const copyText = (text) => {
        toast.success('Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }

    const showPassword = () => {
        passwordRef.current.type = "text"
        if (ref.current.src.includes("public/icons/hidden.png")) {
            ref.current.src = "public/icons/eye.png"
            passwordRef.current.type = "password"
        }

        else {
            passwordRef.current.type = "text"
            ref.current.src = "public/icons/hidden.png"
        }
    }


    const savePassword = () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            localStorage.setItem("password", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            console.log([...passwordArray, form])
            setform({ site: "", username: "", password: "" })

            toast.success('Password saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        else{
            toast('Error : Password not saved!');
        }
    }

    const deletePassword = (id) => {
        console.log("Deleting password with Id", id)
        let conformation = confirm("Are you sure you want to delete this password ?")
        if (conformation) {
            setPasswordArray(passwordArray.filter(item => item.id !== id))
            localStorage.setItem("password", JSON.stringify(passwordArray.filter(item => item.id !== id)))

            toast.success('Password deleted!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }

    }

    const editPassword = (id) => {
        console.log("Editing password with Id", id)
        setform(passwordArray.filter(i => i.id === id)[0])
        setPasswordArray(passwordArray.filter(item => item.id !== id))
    }


    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition:Bounce
            />

            <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>


            <div className="p-2 md:mycontainer min-h-[87vh]">
                <h1 className='text-4xl font-bold text-center'>
                    <span className=' text-green-600'> &lt;</span>
                    <span className='text-white'>Pass</span>
                    <span className=' text-green-600'>OP/&gt;</span>
                </h1>
                <p className='text-green-600 text-lg font-bold text-center'>Your own Password Manager</p>

                <div className="flex flex-col p-4 text-white gap-7 items-center">
                    <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className='rounded-full border font-bold text-black bg-gray-200 border-green-500 w-full p-4 py-1' type="text" name='site' id='site' />
                    <div className="flex flex-col md:flex-row w-full justify-between gap-7">
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username ' className='rounded-full border font-bold text-black bg-gray-200 border-green-500 w-full p-4 py-1' type="text" name='username' id='username' />

                        <div className="relative">
                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border font-bold text-black bg-gray-200 border-green-500 w-full p-4 py-1' type="password" name='password' id='password' />
                            <span className='absolute right-[3px] top-[3px] cursor-pointer' onClick={showPassword}><img ref={ref} className='p-1' width={30} src="public/icons/eye.png" /></span>
                        </div>
                    </div>


                    <button onClick={savePassword} className='flex justify-center items-center gap-2 bg-green-400 hover:bg-green-500 rounded-full w-fit px-5 py-2 border border-green-700'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>
                        Save Password</button>
                </div>

                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4 text-white'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No passwords to show</div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden mb-2">
                        <thead className=' bg-green-700 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Passwords</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='text-white bg-slate-900'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className=' py-2 border border-gray-500 text-center'>
                                        <div className='flex items-center justify-center'>
                                            <a href={item.site} target='_blank' >{item.site}</a>
                                            <div className='size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                <lord-icon
                                                    style={{ "width": "22px", "height": "22px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/vdjwmfqs.json"
                                                    trigger="hover"
                                                    colors="primary:#ffffff">
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className=' justify-center py-2 border border-gray-500 text-center'>
                                        <div className='flex items-center justify-center'>
                                            <span>{item.username}</span>
                                            <div className='size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                <lord-icon
                                                    style={{ "width": "22px", "height": "22px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/vdjwmfqs.json"
                                                    trigger="hover"
                                                    colors="primary:#ffffff">
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-gray-500 text-center'>
                                        <div className='flex items-center justify-center'>
                                            <span>{item.password}</span>
                                            <div className='size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                                                <lord-icon
                                                    style={{ "width": "22px", "height": "22px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/vdjwmfqs.json"
                                                    trigger="hover"
                                                    colors="primary:#ffffff">
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className=' justify-center py-2 border border-gray-500 text-center'>
                                        <span className=' cursor-pointer ' onClick={() => { editPassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/lzgmgrnn.json"
                                                trigger="hover"
                                                colors="primary:#ffffff"
                                                style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}>
                                            </lord-icon>
                                        </span>
                                        <span className=' cursor-pointer mx-2' onClick={() => { deletePassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                colors="primary:#ffffff"
                                                style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "12px" }}>
                                            </lord-icon>
                                        </span>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>}
                </div>

            </div>
        </>
    )
}

export default Manager
