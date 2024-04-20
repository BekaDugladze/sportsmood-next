import React from 'react';
import { WhiteBut} from '../button'
import { ProductBox } from '../productBox'
import { Cabin } from "next/font/google";
import pic from '../pic.webp'

const cabin = Cabin({subsets: ["latin"]})

export default function FisrtPart(){
    return(
        <>
        <div className="
            flex
            flex-col
            justify-center
            items-center
            w-full">
                <h2 className="
                text-red-50 text-3xl "
                style={{fontFamily: 'bodonimt'}}>Our New Collection</h2>
                <p className={`${cabin.className} text-red-50 text-s w-5/6 my-14`} >Lorem ipsum dolor sit amet consectetur. 
                Nisl pretium nulla amet viverra pulvinar donec. 
                Venenatis id arcu interdum duis nullam donec id sed. 
                Mauris ac adipiscing tortor congue consectetur urna. 
                At dictum faucibus gravida elementum.</p>
                <a href=""><WhiteBut style={{margin: '30px 0'}} name='Explore All' /></a>
          </div>
          <div className="flex flex-col items-center justify-center w-full">
            <ProductBox src={pic} price='25ლ' description='Lorem ipsum dolor sit amet consectetur. Nisl pretium nulla amet viverra pulvinar donec. Venenatis id arcu interdum duis nullam donec id sed. Mauris ac adipiscing tortor congue consectetur urna. At dictum faucibus gravida elementum.' name='Sport Hood White Black' />
          </div>
          </>
    )
}