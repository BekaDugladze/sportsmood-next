'use server'


import { MongoClient } from 'mongodb'
import { NextResponse } from 'next/server'


const client = new MongoClient(process.env.MONGOURI);

export const POST = async (req) => {
    try{
        const itemData = await req.json();

        const database = client.db('sm')
        const collection = database.collection('products');
        const addItem = await collection.insertOne({
            category: itemData.category,
            pics: itemData.pics,
            default: itemData.default,
            title: itemData.title,
            description: itemData.description,
            price: itemData.price,
            Colors: itemData.colors,
            new: itemData.new,
            trend: itemData.trend,
            men: itemData.men,
            women: itemData.women,
            sale: itemData.sale,
            addedBy: itemData.user
        })

        if(addItem.insertedId) {
            return NextResponse.json({success: addItem.insertedId})
        }
        else{
            throw new Error('Could not add item')
        }
    }
    catch(err){
        throw new Error(err.message)
    }
}