'use client'

import React, {useState, useRef, useEffect} from "react"
import AdminUser from "@/components/administration/adminUser"
import { useAppDispatch } from "@/lib/hooks"
import { useRouter } from "next/navigation"
import { setAdminLog } from "@/lib/slicer/reducer"
import ItemForm from "@/components/administration/additem/itemForm"

export default function AddItem() {
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const dispatch = useAppDispatch()
    
    const getAdminData = async () => {
        try{
            const fetchData = await fetch('/api/first', {
                method: 'GET',
                credentials: 'include',
            })
            if (!fetchData.ok) { router.push('/administration')}
            else {
                const data = await fetchData.json();
                if(data){
                    dispatch(setAdminLog(true, data.username, data.name, data.lastName, data.email, data.phone, data.admin, data.pic));
                    setLoading(false)
                }
            }
        }
        catch(error: any){
            router.push('/administration');
            setLoading(false)
            console.log(error.message)
        }
    }
    useEffect(() => {
        getAdminData()
      }, []);
      
    return(
        <>
            {loading ? 
            <h1 className="w-screen h-screen text-center flex justify-center items-center">loading...</h1> 
            :
            <div className="tablet:pt-14 items-center" style={{ width: '100%', overflowX: 'hidden'}}> 
                <ItemForm />
            </div>
            }
        </>
    )
}