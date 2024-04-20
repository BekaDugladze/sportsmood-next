import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faPlusSquare, faEdit } from "@fortawesome/free-regular-svg-icons"
import AddCoWorker from './addCoWorker'
import { faClose, faDeleteLeft, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useAppSelector } from '@/lib/hooks';

export default function CoWorkers(){
    const [workers, setWorkers] = useState([])
    const [add, setAdd] = useState(false)
    const {admin} = useAppSelector(state => state)
    const [mes, setMes] = useState('')

    const addShow = () => {
        setAdd(true)
    }
    const addClose = () => {
        setAdd(false)
    }

    const getCoWorkers = async () => {
        try{
            const getAll = await fetch('/api/coworkers', {
                method: 'GET',
                credentials: 'include'
            })
            if(!getAll){
                throw new Error('Could not find')
            }
            else{
                const data = await getAll.json()
                setWorkers(data)
                console.log(data)
            }
        }
        catch(err){
            throw new Error(err.message)
        }
    }

    const delCo = async (user) =>{
        try{

            const delFetch = await fetch('/api/coworkers', {
                method: 'DELETE',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user: user,
                })
            })

            if (delFetch) {setMes('deleted'); setTimeout(() => setMes(''), 3000)}
            else setMes('deleted failed')
        }
        catch(err){
            throw new Error(err.message)
        }
    }
    
    useEffect(()=> {
        getCoWorkers()
    }, [])
    return(
        <div className='flex flex-col mt-4'>
            <div className='flex flex-row justify-around items-center'>
                <h2 className='text-red-700 font-bold'>Co-Workers</h2>
                {admin ? 
                <>
                {!add ? <button 
                className='flex flex-col text-red-700 items-center'
                onClick={addShow}><FontAwesomeIcon icon={faPlusSquare} style={{fontSize: '20px'}}/> <span style={{fontSize: '8px'}}>Add Worker</span></button>
                :
                <button className=' text-red-700' onClick={addClose}><FontAwesomeIcon icon={faClose} /> close</button>}
                </>
                : <></>}
            </div>
            {add ? 
            <div>
                <AddCoWorker />
            </div> 
            :
            <>
                {workers.length === 0 
                ? 
                <p className='text-red-700 text-center mt-5'>You haven't added any workers yet</p> 
                : 
                <div className='flex flex-col overflow-y-auto mb-16 tablet:mb-0' style={{maxHeight: '55vh'}}>
                {workers.map((worker, index) => (
                    <div key={index} className='flex flex-col tablet:flex-row justify-between tablet:items-center my-2 rounded-lg max-w-screen'
                    style={{background: 'white', padding: '10px 30px'}}>
                        <div className='flex flex-col tablet:flex-row items-center'>
                            {worker.pic === '' ? <FontAwesomeIcon icon={faUser} /> : <img src={worker.pic} width={100} alt={[worker.name, worker.lastName]} />}
                            <div className='flex flex-row tablet:flex-col mx-5'>
                                <div className='flex flex-col tablet:flex-row coworkers'>
                                    <h2><span>Name:</span> {worker.name}</h2>
                                    <h2><span>Lastname:</span> {worker.lastName}</h2>
                                    <p><span>User:</span> {worker.username}</p>
                                </div>
                                <div className='flex flex-col tablet:flex-row coworkers'>
                                    <p><span>Email:</span> <a href={`mailto: ${worker.email}`}>{worker.email}</a></p>
                                    <p><span>Phone:</span> <a href={`tel: ${worker.phone}`}>{worker.phone}</a></p>
                                    <p>{worker.admin ? 'Admin' : 'Not Admin'}</p>
                                </div>
                            </div>
                        </div>
                        {admin ? <div className='flex flex-col'>
                            {worker.admin ? <></> : 
                            <button 
                            className='text-red-700 my-1'
                            onClick={() => { delCo(worker.username); getCoWorkers()}}><FontAwesomeIcon icon={faTrash} /> delete</button>}
                        </div> 
                        : <></>}
                    </div>
                ))}
                </div>}
            </>
            }
            <h1 className='text-center'>{mes}</h1>
        </div>
    )
}