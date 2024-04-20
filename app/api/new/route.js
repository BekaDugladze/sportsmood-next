"use server"

import { NextResponse } from 'next/server'
import { MongoClient, ObjectId } from 'mongodb'
import {Storage} from '@google-cloud/storage'


const client = new MongoClient(process.env.MONGOURI);

export const GET = async (req) => {
    new Storage({keyFilename: process.env.GOOGLE_CLOUD_KEYFILE});
    try{
        const database = client.db('sm')
        const collection = database.collection('products');

        const getNew = await collection.find({new: true}).toArray();

        if(getNew.length > 0) return NextResponse.json(getNew);
        else throw new Error('Could not find')
    }
    catch(err){
        throw new Error(err.message)
    }
}

export const DELETE = async (req) => {
    try{
        const data = await req.json();
        console.log(data.itemId)
        const database = client.db('sm')
        const collection = database.collection('products');

        const deleteProduct = await collection.deleteOne({_id: new ObjectId(data.itemId) })

        if(deleteProduct.deletedCount > 0) {
            return NextResponse.json({success: true});
        }
        else{
            throw new Error(`Cannot delete`)
        }
    }
    catch(err){
        throw new Error(err.message)
    }
}