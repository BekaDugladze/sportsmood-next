'use client'

import React, {useState, useRef} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faPlusSquare } from "@fortawesome/free-regular-svg-icons"
import { useAppSelector } from '@/lib/hooks';
import { RedBut } from '../button';
import { faClose, faGear, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import CoWorkers from './coworkers'
import { useRouter } from 'next/navigation';

export default function AdminUser() {
    const [upload, setUpload] = useState(null)
    const [res, setRes] = useState('')
    const [change, setChange] = useState(false)
    const [changeMes, setChangeMes] = useState('')
    const [loading, setLoading] = useState(false)

    const imgRef = useRef(null)
    const passRef = useRef(null)

    const router = useRouter()
    const { user,  name, lastName, email, phone, pic} = useAppSelector(state => state)
    const deleteCookie = async () => {
        try{
            const del = await fetch('/api/first', {
                method: 'DELETE',
                credentials: 'include'
            })
            if(del){
                return router.push('/administration')
            }
        }
        catch(err) {
            throw new Error('could not delete cookie')
        }
    }
    const dinamicallyChangeUpload = () => {
        const file = imgRef.current.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUpload(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    const putPicture = async () => {
        try{
            if(upload) {
                const updatePic = await fetch('/api/first', {
                    method: 'PUT',
                    credentials: 'include',
                    headers: { 
                        'Content-Type': 'application/json' 
                    },
                    body: JSON.stringify({
                        user: user,
                        pic: upload
                    })
                })
                if(updatePic) {
                    setRes('Uploaded')
                }
                else{
                    setRes('Uploaded Failed')
                }
            }
        }
        catch(e){
            throw new Error(e.message);
        }
    }

    const trueChange = () => {
        setChange(true)
    }
    const falseChange = () => {
        setChange(false)
    }

    const renewPass = async () => {
        setLoading(true)
        try{
            const connect = await fetch('/api/coworkers', {
                method: 'PUT',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    user: user,
                    pass: passRef.current.value
                })
            })
            if(connect){ setChangeMes('Password updated'); setLoading(false); setTimeout(() => {setChangeMes('')}, 3000) }
            else{ setChangeMes('Password update failed'); setLoading(false);  setTimeout(() => {setChangeMes('')}, 3000)}
        }
        catch(err){
            setLoading(false); 
            throw new Error(err.message)
        }
    }
    return(
        <div className='flex flex-col h-full'>
            <div className='flex flex-row justify-around items-center flex-wrap py-1 px-5'>
            {pic === '' && !upload ? <FontAwesomeIcon className='text-red-700' icon={faUser} style={{fontSize: '40px',}}/> :
            <img 
            src={pic || upload} 
            width={100} 
            alt={[name, lastName, email, phone]}
            style={{ maxWidth: '70px', borderRadius: '10px'}}/>}
                <div className='flex flex-col justify-center items-center mx-2'>
                    <input 
                    type="file" 
                    accept='image/*' 
                    name="upload Img" 
                    style={{width: '105px', marginBottom: '5px'}} 
                    ref={imgRef} 
                    onChange={dinamicallyChangeUpload}
                    max={1}/>
                    <RedBut click={putPicture} name='upload Img'/>
                    <p>{res}</p>
                </div>
            {!change ? 
            <>
                <div className='flex flex-col justify-around adminInfo text-center tablet:text-start'>
                    <p><span>Name:</span> {name}</p>
                    <p><span>Last Name:</span> {lastName}</p>
                </div>
                <div className='flex flex-col justify-around adminInfo text-center tablet:text-start'>
                    <p><span>Email:</span> {email}</p>
                    <p><span>Phone:</span> {phone}</p>
                </div>
            </>
            :
            <>
                <form className='flex flex-col'>
                    <label className='label' htmlFor='password'>New Password</label>
                    <input ref={passRef} className='input' type='password' name='password' placeholder='New Password' />
                    <label className='label' htmlFor='re-password'>Repeat Password</label>
                    <input className='input' type='password' name='re-password' placeholder='Repeat Password' />
                    {loading ? 
                    <p className='text-center'>Loading...</p> 
                    : 
                    <button className='text-red-700 underline my-1' onClick={(e) => {renewPass(); e.preventDefault()}}>Renew Password</button>
                    }
                    <p className='text-sm text-black-700 text-center'>{changeMes}</p>
                </form>
            </>
            }
            <div className='flex flex-row laptop:flex-col justify-center'>
                {!change ? 
                <button className='text-red-700 flex flex-col justify-center items-center m-4' onClick={trueChange}><FontAwesomeIcon icon={faGear} style={{fontSize: '20px'}}/> <span style={{fontSize: '8px'}}>Change Password</span></button>
                :
                <button className='text-red-700 flex flex-col justify-center items-center m-4' onClick={falseChange}><FontAwesomeIcon icon={faClose} style={{fontSize: '20px'}}/> <span style={{fontSize: '8px'}}>Close</span></button>
                }
                <button className='text-red-700 flex flex-col justify-center items-center m-4' onClick={deleteCookie}><FontAwesomeIcon style={{fontSize: '20px'}} icon={faRightFromBracket} /> <span style={{fontSize: '8px'}}>Log Out</span></button>
            </div>
            </div>
            <CoWorkers />
        </div>
    )
}