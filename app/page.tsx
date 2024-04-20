'use client'

import FirstPart from '../components/homepg/firstPart'
import notFound from './not-found';
import { useAppSelector, useAppDispatch, useAppStore } from '../lib/hooks'
import { setAdminLog } from '@/lib/slicer/reducer';
import { useEffect } from 'react';

const found = false

export default function Home() {
  if (!found){
    notFound()
  }
  
  return (
    <main className="bg-red-50 ">
      <div
        className="
        flex
        flex-row
        justify-around
        items-center
        h-screen
        w-full
        firstDiv">
          <FirstPart />
      </div>
      <div
        className="
        flex
        flex-row-reverse
        justify-around
        items-center
        h-screen
        w-full
        firstDiv">
          <FirstPart />
        </div>
    </main>
  );
}
