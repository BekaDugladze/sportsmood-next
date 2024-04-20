'use client'

import React, { useRef, useState } from 'react';
import { useAppSelector } from '@/lib/hooks';
import pic from '@/app/firstBack.webp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faAdd, width } from '@fortawesome/free-solid-svg-icons/faAdd';

export default function ItemForm() {
    const [loading, setLoading] = useState(false)
    const [Uploaded, setUploaded] = useState('')
    const { user, admin } = useAppSelector(state => state)
    const [colArr, setColArr] = useState([])
    const [select, setSelect] = useState(false)
    const [cat, setCat] = useState('')
    const [sizeArr, setSizeArr] = useState(['XS', 'S', 'M', 'L', 'XL'])
    const [itemPic, setItemPic] = useState([])
    const [selectedPic, setSelectedPic] = useState(null)
    const [defaultPic, setDefaultPic] = useState(null)  
    const [quantities, setQuantities] = useState({});
    const [imgUrls, setImgUrls] = useState([])


    const colRef = useRef(null)
    const picRef = useRef(null)
    const quaRef = sizeArr.map(() => useRef(null));
    const titleRef = useRef(null)
    const descRef = useRef(null)
    const newRef = useRef(null)
    const trendRef = useRef(null)
    const menRef = useRef(null)
    const womenRef = useRef(null)
    const saleRef = useRef(null)
    const priceRef = useRef(null)
    

    const categories = ['Tank Top', 'Mini Skirt', 'T-Shirts', 'Pajama Pants', 'Training Items', 'Tote Bag', 'Hoodies', 'Tennis Skirts' ]

    const addCol = () => {
        const newCol = colRef.current.value
        setColArr(prev => [...prev, newCol])
    }
    const delCol = (index) =>{
        // Create a copy of the colArr array
        const newArr = [...colArr];
        // Remove the item at the specified index
        newArr.splice(index, 1);
        // Update the state with the new array without the deleted item
        setColArr(newArr);
    }
    const handleSel = () => {
        setSelect(prev => !prev)
    }

    const dinamicallyChangeUpload = () => {
        const files = picRef.current.files;
        if (files) {
            const imagesArray = [];
            for (let i = 0; i < files.length; i++) {
                // Create a new FileReader object
                const reader = new FileReader();
    
                // Define the 'onload' handler for the FileReader
                reader.onload = (function(theFile) {
                    return function(e) {
                        // Add the base64 image to the imagesArray
                        imagesArray.push({base64: e.target.result, name: theFile.name});
    
                        // Check if all files have been processed
                        if (imagesArray.length === files.length) {
                            // Update state with all base64 images
                            setItemPic(prev => [...prev, ...imagesArray]);
                        }
                    };
                })(files[i]);
    
                // Read the file as a Data URL (base64)
                reader.readAsDataURL(files[i]);
            }
        }
    };
    
    const deleteSelectedPic = () => {
        if (selectedPic !== null) {
            // Find the index of the selected picture in the itemPic array
            const index = itemPic.indexOf(selectedPic);
            if (index > -1) { // Check if the picture is found
                const newPicArray = [...itemPic]; // Create a copy of the itemPic array
                newPicArray.splice(index, 1); // Remove the picture at the found index
                setItemPic(newPicArray); // Update the state with the new array
                setSelectedPic(null); // Optionally, clear the selectedPic state
            }
        }
    };

      

      const handleQuantityChange = (col, size) => (event) => {
        const { name, value } = event.target;
        setQuantities(prevQuantities => ({
          ...prevQuantities,
          [col]: {
            ...(prevQuantities[col] || {}),
            [size]: value
          }
        }));
      };
      
      const colors = colArr.map((col) => ({
        color: col,
        sizes: sizeArr.map((size) => ({
          size: size,
          quantity: parseInt(quantities[col]?.[size] || 0)
        }))
      }));

      const colorsObject = {};

      colors.forEach(color => {
          const { color: colorName, sizes } = color;
          const sizesObject = {};
      
          sizes.forEach(({ size, quantity }) => {
              sizesObject[size] = quantity;
          });
      
          colorsObject[colorName] = sizesObject;
      });
      
        const uploadImageToServer = async (imageBase64, fileName) => {
            try {
                const response = await fetch('/api/items/cloud', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ imageBase64, fileName })
                });

                const data = await response.json();
                if (response.ok) {
                    return data.url; // Return the URL
                } else {
                    return null; // Handle failure case appropriately
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };


      const addItem = async () => {
        setLoading(true)
        let urls = await Promise.all(itemPic.map((pic) => 
            uploadImageToServer(pic.base64, pic.name)
        ))
        try{
            const connect = await fetch('/api/items', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    category: cat,
                    pics: urls.map(pic => (pic)),
                    default: defaultPic,
                    title: titleRef.current.textContent,
                    description: descRef.current.textContent,
                    price: priceRef.current.value,
                    colors: colorsObject,
                    new: newRef.current.checked,
                    trend: trendRef.current.checked,
                    men: menRef.current.checked,
                    women: womenRef.current.checked,
                    sale: saleRef.current.checked,
                    user: user
                })
            })

            if(connect) {setLoading(false); setUploaded('uploaded'); setTimeout(() => setUploaded(''), 3000)}
            else {setUploaded('Failed'); setLoading(false);}
        }
        catch(err){
            console.error(err);
            setLoading(false)
        }
      }

    return(
        <>
        <h1 className='font-bold text-red-700 text-center m-1 text-xl' style={{fontFamily: 'bodonimt'}}>Add Item</h1>
        <div className='flex flex-col overflow-auto ' style={{height: '83vh'}}>
                <div className='flex flex-row justify-around'>
                    <div className='flex flex-col justify-center addImg'>
                        <input ref={picRef} type="file" accept='image/*' name='pictures of the item' multiple 
                        style={{width: '115px', margin: '5px 0'}} onChange={dinamicallyChangeUpload}/>
                        <button onClick={deleteSelectedPic} className='text-red-500'><FontAwesomeIcon icon={faTrash} style={{margin: '5px 5px'}}/> Delete</button>
                        <button onClick={() => {setDefaultPic(selectedPic)}} className='text-orange-500'><FontAwesomeIcon icon={faStar} style={{margin: '5px 5px'}}/> Default</button>
                        {defaultPic && defaultPic === selectedPic && <p>This is Default Pic</p> }
                    </div>
                    <div style={{width: '45vw'}}>
                            {itemPic.length > 0 ? 
                            <>
                                <div className='flex flex-col justify-center items-center'>
                                    <img src={selectedPic ? selectedPic : itemPic[0].base64} alt='2' width={500} style={{width: 'auto', height:'auto', maxHeight: '60vh'}} />
                                </div>
                                    <div className='flex flex-row flex-nowrap overflow-auto' style={{width: '100%'}}>
                                    {itemPic.map((pic, index) => (
                                            <img onClick={() => setSelectedPic(pic.base64)} key={index} className='m-1' src={pic.base64} alt={pic.name} width={100} />
                                    ))}
                                </div>
                            </> 
                            : <p>No Img</p>}
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center my-5'>
                    <label className='label' htmlFor='header'>Header</label>
                    <div 
                    ref={titleRef}
                    aria-label='Header' 
                    id='header'
                    contentEditable 
                    autoCorrect='false'
                    spellCheck='false'
                    className='w-1/2 h-26 text-red-700' 
                    style={{
                        border: '1px solid black', 
                        borderRadius: '25px', 
                        padding:'5px 15px', 
                        fontSize:'15px',  
                        fontWeight: 'bold',
                        outline: 'none'
                    }}></div>
                    <label className='label' htmlFor='description'>Description</label>
                    <div 
                    ref={descRef}
                    aria-label='Description' 
                    contentEditable 
                    autoCorrect='false'
                    spellCheck='false'
                    className='tablet:w-1/2 w-5/6 h-28 text-red-700 overflow-y-auto' 
                    style={{
                        border: '1px solid black', 
                        borderRadius: '25px', 
                        padding:'5px 15px', 
                        fontSize:'12px',  
                        fontWeight: 'normal',
                        outline: 'none'
                    }}></div>
                    
                    <label className='label' htmlFor='price'>Price</label>
                    <input ref={priceRef} className='input' type='number' name='price' min={1} id='price' />

                        <div className='flex flex-col justify-center items-center'>
                            <h3>Colors</h3>
                            <div className='flex flex-row'>
                                <input type="text" ref={colRef} name="colors" placeholder="Colors" className='input'/>
                                <button className='text-green-600' onClick={addCol}><FontAwesomeIcon icon={faCheck} /> Add</button>
                            </div>
                        </div>
                    <div className='flex flex-col w-full oflow' style={{width: '70%'}}>
                        <h3 className='text-center'>Sizes</h3>
                        {colArr.length > 0 && 
                        <div className=' flex flex-row oflow' >
                            {colArr.map((col, index) => (
                                <div className='mx-2 w-fit flex flex-col justify-center items-center' key={index}>
                                    <button 
                                        style={{
                                            width: '20px', 
                                            height:'20px', 
                                            background: col, 
                                            color: 'white', 
                                            textAlign: 'center',
                                            borderRadius: '25px'
                                        }}
                                        onClick={() => delCol(index)}>
                                        X
                                    </button>
                                    <h3>In Stoke</h3>
                                    <div className='flex flex-col justify-center items-center'>
                                        <p>{col}</p>
                                        {sizeArr.map((size, sizeIndex) => (
                                            <div className='flex flex-col' key={sizeIndex}>
                                                <label className='label' htmlFor={`${col}-${size}`}>{size}</label>
                                                <input 
                                                    ref={quaRef[index * sizeArr.length + sizeIndex]} 
                                                    className='input' 
                                                    type='number' 
                                                    min={0} 
                                                    id={`${col}-${size}`} 
                                                    onChange={handleQuantityChange(col, size)} 
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        }
                    </div>
                        <form className='flex flex-row justify-center my-2'>
                            <div className='mx-2'>
                                <label className='label mx-1' htmlFor='new'>Is New?</label>
                                <input ref={newRef} className='input' type='checkbox' id='new' />
                            </div>
                            <div className='mx-2'>
                                <label className='label mx-1' htmlFor='trend'>Is Trended?</label>
                                <input ref={trendRef} className='input' type='checkbox' id='trend' />
                            </div>
                            <div className='mx-2'>
                                <label className='label mx-1' htmlFor='man'>Is for Men?</label>
                                <input ref={menRef} className='input' type='checkbox' id='man' />
                            </div>
                            <div className='mx-2'>
                                <label className='label mx-1' htmlFor='woman'>Is for Women?</label>
                                <input ref={womenRef} className='input' type='checkbox' id='woman' />
                            </div>
                            <div className='mx-2'>
                                <label className='label mx-1' htmlFor='sale'>Is saled?</label>
                                <input ref={saleRef} className='input' type='checkbox' id='sale' />
                            </div>
                        </form>
                        <div className='flex flex-row oflow my-2'>
                            <button onClick={() => handleSel()} className='bg-white text-red-700 mx-2 px-2 rounded-xl'>Select Category</button>
                            {select ? 
                            <div className='my-2 flex flex-row'>
                                {categories.map((category, index) => (
                                    <React.Fragment key={index}>
                                        <button onClick={() => {setCat(category); setSelect(false)}} className='bg-red-700 text-white mx-1 rounded-xl px-2' key={index}>{category}</button> 
                                    </React.Fragment>
                                ))}
                            </div>
                            :
                            <>
                                {cat === '' ? <p className='bg-red-700 text-white mx-2 px-2 rounded-xl'>Not Selected</p> : <p className='bg-red-700 text-white mx-2 px-2 rounded-xl'>{cat}</p>}
                            </>}
                        </div>
                    {loading ? <p>Loading</p> :
                    <button onClick={() => {addItem()}} className='bg-white text-red-700 px-2 rounded-xl tablet:my-2 mt-2 mb-4'>Upload Item</button>}
                    <p>{Uploaded}</p>
                </div>
        </div>
        </>
    )
}