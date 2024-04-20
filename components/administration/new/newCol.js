import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBackward, faPen, faTrash } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react";

export const Colors = (props) => {

    return(
        <div className='flex flex-row flex-nowrap overflow-auto tablet:w-4/12 w-full'>
        {Object.entries(props.map).map(([color, sizes], colIndex) => (
            <div key={colIndex} className='bg-red-100 mx-2'>
            <h3 style={{background: color, color: color === 'white' ? 'black' : 'white', textAlign: 'center'}}>{color}</h3> {/* Display the color name */}
            <ul>
                {Object.entries(sizes).map(([sizes, qua], sizeIndex) => (
                    <div className='p-2' key={sizeIndex}>
                        <p style={{background: qua === 0 ? 'red': (qua < 10 ? 'orange' : 'none')}}>{sizes}:{qua}</p>
                    </div>
                ))}
            </ul>
            </div>
        ))}
        </div>)
}

export const Items = (props) => {
    const [deleting, setDeleting] = useState(false)

    const deleteItems = async (id) => {
        try{
            const connect = await fetch('/api/new', {
                method: 'DELETE',
                headers:{
                    'content-type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    itemId: id
                })
            })
            
        }
        catch(err){
            console.error(err)
        }
    }
    return (
        <>
        {props.items.map((item, index) => (
                    <div className="flex flex-col laptop:flex-row m-5 pb-2 bg-white w-screen justify-between items-center" key={index} style={{}}>
                        <div className="flex flex-col w-60" >
                                <img src={item.default || item.pics[0]} alt={item.title} className="w-full"/>
                            <div className="flex flex-row flex-nowrap overflow-auto">
                                {item.pics.map((pic, index) => (
                                    <img key={index} src={pic} alt={pic} style={{width: '60px', }} className="m-1"/>
                                ))}
                            </div>
                            <p style={{fontSize: '8px'}}>_id: {item._id}</p>
                        </div>
                        <div className="flex flex-col justify-center items-center laptop:w-2/12 w-full">
                            <h2 className="text-center text-red-700 text-m font-bold" style={{fontFamily: 'bodonimt', width: '100%'}}>{item.title}</h2>
                            <p className="text-red-800 p-1 text-sm overflow-auto laptop:h-28 h-20" >{item.description}</p>
                            <h3 className="text-center text-red-700 text-m font-bold">{item.category}</h3>
                        </div>
                        <div className="flex laptop:flex-col flex-row justify-center items-center laptop:w-2/12 w-full overflow-auto itemSkills my-1" >
                            <p style={{color: item.new ? 'green' : 'red'}}>{item.new ?  'new' : 'old'}</p>
                            <p style={{color: item.trend ? 'green' : 'red'}}>{item.trend ? 'trend': 'not trend'}</p>
                            <p style={{color: item.men ? 'green' : 'red'}}>{item.men ? 'man': 'not man'}</p>
                            <p style={{color: item.women ? 'green' : 'red'}}>{item.women ? 'woman': 'not woman'}</p>
                            <p style={{color: item.sale ? 'green' : 'red'}}>{item.sale ? 'saled': 'not saled'}</p>
                        </div>
                        <Colors map={item.Colors} />
                        <div className="flex flex-col justify-around items-center">
                            <p>{item.price} ლ</p>
                            {!deleting || deleting !== item._id ? (
                                <button onClick={() => {setDeleting(item._id); console.log(index)}} style={{color: 'red'}}>
                                    <FontAwesomeIcon icon={faTrash} /> delete
                                </button> 
                            ) : (
                                <div className='flex flex-row'>
                                    <button onClick={() => setDeleting(null)} style={{color: 'green', margin: '0 5px'}}>
                                        <FontAwesomeIcon icon={faBackward} />
                                    </button>
                                    <button onClick={() => {deleteItems(item._id); window.location.reload()}} style={{color: 'red'}}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                            )}
                            <button style={{color: 'orange'}}><FontAwesomeIcon icon={faPen} /> edit</button>
                        </div>
                    </div> 
                ))}
            </>
    )
}