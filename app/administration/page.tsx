"use client"

import React from "react";
import { RedBut } from "@/components/button";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { setAdminLog } from "@/lib/slicer/reducer";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";


export default function Admin(){
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('')
    const router = useRouter()
    const dispatch = useAppDispatch()

    const isButtonDisabled = user === '' || pass === '';

    const handleUser = (e: React.ChangeEvent<HTMLInputElement>) => {
        const changedUser = e.target.value;
        setUser(changedUser)
    }
    const handlePass = (e: React.ChangeEvent<HTMLInputElement>) => {
        const changedPass = e.target.value;
        setPass(changedPass)
    }

    const submit = async () => {
        try{
            setLoading(true)
            const connect = await fetch('/api/first', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: user,
                    pass: pass
                })
            })
            if(connect.ok) { setLoading(false); router.push('/administration/handle'); 
            dispatch(setAdminLog(true, '', '', '', '', '', false, ''))}
            else {setLoading(false); setError('Incorrect user or password'); setTimeout(() => {setError('')}, 5000);}
        }
        catch(err) {
            if (err instanceof Error) {
                throw new Error(err.message);
            } else {
                throw new Error('An error occurred');
            }
        }
    } 
    return(
        <div className="flex flex-col h-screen w-full justify-center items-center firstDiv">
            <form className="bg-red-50 p-5 rounded-lg flex flex-col justify-center items-center">
            <h1 className="text-center text-red-700 font-extrabold mb-4" style={{fontFamily: 'bodonimt'}}>Are you Admin? <br></br> Log In!</h1>
                <div className="flex flex-col">
                    <label className="text-xs text-red-700" htmlFor="user">user</label>
                    <input className="input" type="text" name="user" placeholder="user" required value={user} onChange={handleUser}/>
                </div>
                <div className="flex flex-col my-8">
                    <label className="text-xs text-red-700" htmlFor="Password">password</label>
                    <input className="input" type="password" name="password" placeholder="password" required value={pass} onChange={handlePass}/>
                </div>
                {loading ? <p>Loading...</p> :
                <RedBut type="button" name="Log In" isButtonDisabled={isButtonDisabled} style={{padding: '5px'}} click={(e: React.MouseEvent<HTMLButtonElement>) => {e.preventDefault(); submit(); }}/>}
                {error === '' ? <></> : <p className="my-4">{error}</p>}
            </form>
        </div>
    )
}