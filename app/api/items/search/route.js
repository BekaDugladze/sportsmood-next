'use server'


import { NextResponse } from 'next/server'
import { MongoClient, ObjectId } from 'mongodb'


const client = new MongoClient(process.env.MONGOURI);

export const POST = async (req) => {
    try{
        const data = await req.json();

        const database = client.db('sm')
        const collection = database.collection('products');

        const getItem = await collection.find({title: { $regex: data.search, $options: 'i' }}).toArray();

        if(getItem.length > 0) {
            return NextResponse.json(getItem)
        }
        else{
            throw new Error('Nothing found')
        }
    }
    catch(err){
        throw new Error(err);
    }
}