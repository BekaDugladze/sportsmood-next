'use client'

import React, {useState, useRef, useEffect} from "react"
import { useAppDispatch } from "@/lib/hooks"
import { useRouter } from "next/navigation"
import { setAdminLog } from "@/lib/slicer/reducer"
import { Items } from '@/components/administration/new/newCol'

export default function NewItem() {
    const [loading, setLoading] = useState(true)
    const [items, setItems] = useState([])
    const [filteredItems, setFilteredItems] = useState([])
    const [filter, setFilter] = useState('')
    const [failed, setFailed] = useState('')

    const searchRef = useRef<HTMLInputElement>(null)

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

    const getNewProducts = async () => {
        try{
            const connect = await fetch('/api/woman', {
                method: 'GET',
                credentials: 'include',
                headers: {'Content-Type' : 'application/json'},
            })

            const data = await connect.json();
            setItems(data); 
        }
        catch(error: any){
            throw new Error(error.message)
        }
    }

    const handleFilter = (category: any) => {
            setFilter(category)
            const filtered = items.filter((item: any) => item.category === category);
            setFilteredItems(filtered);
    }

    const handleSearch = async () => {
        try{
            const connect = await fetch('/api/items/search', {
                method: 'POST',
                credentials: 'include',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({
                    search: searchRef.current?.value
                })
            })

            if(connect.ok){
                const data = await connect.json();
                setFilter('searched');
                setFilteredItems(data);
                setFailed('')
            }
            else{
                setFailed('Nothing Found')
            }
        }
        catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getAdminData();
        getNewProducts();
      }, []);
      
    return(
        <>
            {loading ? 
            <h1 className="w-screen h-screen text-center flex justify-center items-center">loading...</h1> 
            :
            <div className="tablet:pt-14 justify-center flex flex-row flex-wrap overflow-auto" style={{ width: '100%'}}> 
            <div className="flex flex-col justify-center items-center">
                <div className="flex flex-row justify-around items-center">
                    <ul className="flex flex-row overflow-auto flex-nowrap adminUl my-3" style={{width: '70vw'}}>
                        <p className="text-center text-red-700 text-m font-bold">Categories:</p>
                        <li onClick={() => handleFilter('T-Shirts')}>T-Shirts</li>
                        <li onClick={() => handleFilter('Tank Top')}>Tank Top</li>
                        <li onClick={() => handleFilter('Mini Skirt')}>Mini Skirt</li>
                        <li onClick={() => handleFilter('Pajama Pants')}>Pajama Pants</li>
                        <li onClick={() => handleFilter('Training Items')}>Training Items</li>
                        <li onClick={() => handleFilter('Tote Bag')}>Tote Bag</li>
                        <li onClick={() => handleFilter('Hoodies')}>Hoodies</li>
                        <li onClick={() => handleFilter('Tennis Skirts')}>Tennis Skirts</li>
                    </ul>
                    <button className="bg-white text-red-700 rounded-md h-fit w-fit px-3 py-1" onClick={() => setFilter('')}>clear</button>
                </div>
                <div>
                    <input ref={searchRef} className="input" type="search" placeholder="search" />
                    <button onClick={handleSearch} >search</button>
                    <p>{failed}</p>
                </div>
            </div>
            <Items items={filter === '' ? items : filteredItems}  />
            </div>
            }
        </>
    )
}