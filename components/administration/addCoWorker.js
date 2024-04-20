'use client'

import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { Poppins } from 'next/font/google';

const inter = Poppins({subsets: ['latin'], weight: '400'})


export default function AddCoWorker() {
    const nameRef = useRef(null)
    const lastNameRef = useRef(null)
    const userRef = useRef(null)
    const emailRef = useRef(null)
    const phoneRef = useRef(null)
    const passRef = useRef(null)
    const rePassRef = useRef(null)
    const adminRef = useRef(null)
    const [user, setUser] = useState('')
    

    const postAdmin = async () => {
        try {
            /**/
            const addCoWorker = await fetch('/api/coworkers', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    name: nameRef.current.value,
                    lastName: lastNameRef.current.value,
                    email: emailRef.current.value,pass: passRef.current.value,
                    pass: passRef.current.value,
                    phone: phoneRef.current.value,
                    user: userRef.current.value,
                    admin: adminRef.current.checked,
                    pic: ''
                })
            })
            if(addCoWorker) {
                setUser('Co-Worker is added! ;)')
            }
            else{
                setUser('You are fucking shit')
            }
        }
        catch (err) {
            console.error(err)
        }
    }


    return(
        <div className='flex flex-col items-center py-4' style={{background: 'white'}}>
            <h2 className={`text-red-700 ${inter.className} font-bold`}>Add Co-Worker</h2>
            <form className='flex flex-col w-1/2 my-5'>
                <div className='flex flex-row justify-between'>
                    <div className='flex flex-col'>
                        <label className='label' for="Name">Name</label>
                        <input ref={nameRef} className='input' type='text' placeholder="Name" name='name' />
                    </div>
                    <div className='flex flex-col'>
                        <label className='label' for="LastName">LastName</label>
                        <input ref={lastNameRef} className='input' type='text' placeholder="LastName" name='LastName' />
                    </div>
                </div>
                <div className='flex flex-row justify-between'>
                    <div className='flex flex-col'>
                        <label className='label' for="Email">Email</label>
                        <input ref={emailRef} className='input' type='text' placeholder="Email" name='Email' />
                    </div>
                    <div className='flex flex-col'>
                        <label className='label' for="Phone">Phone</label>
                        <input ref={phoneRef} className='input' type='text' placeholder="Phone" name='Phone' />
                    </div>
                </div>
                <div className='flex flex-row justify-between'>
                    <div className='flex flex-col'>
                        <label className='label' for="user" aria-required="true">Username*</label>
                        <input ref={userRef} className='input' type='text' placeholder="Username" name='user' required/>
                    </div>
                    <div className='flex flex-col'>
                        <label className='label' for="admin">Is he/she Admin? *</label>
                        <input ref={adminRef} className='input' type='checkbox' name='adminCheck'/>
                    </div>
                </div>
                <div className='flex flex-row justify-between'>
                    <div className='flex flex-col'>
                        <label className='label' for="password">Password*</label>
                        <input ref={passRef} className='input' type='password' placeholder="Password" name='password' />
                    </div>
                    <div className='flex flex-col'>
                        <label className='label' for="password">Repeat Password*</label>
                        <input ref={rePassRef} className='input' type='password' placeholder="Repeat Password" name='repeat_password' />
                    </div>
                </div>
                <button onClick={(e) => {e.preventDefault(); postAdmin()}}
                className='mt-4 w-fit self-center px-3 py-1 rounded-xl text-red-900' 
                style={{background: 'white', border: '1px solid rgb(146, 24, 24)'}}>
                    <FontAwesomeIcon icon={faAdd} /> 
                    Add Co-Worker
                </button>
                <p>{user}</p>
            </form>
        </div>
    )
}