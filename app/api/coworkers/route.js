'use server'


import { MongoClient } from 'mongodb'
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server'


const client = new MongoClient(process.env.MONGOURI);


export const POST = async (req) => {
    try{
        const clientData = await req.json()

        
        const database = client.db('sm')
        const collection = database.collection('admin')
        const checkUser = await collection.findOne({username: clientData.user, email: clientData.email})

        if(checkUser){
            throw new Error('User exists')
        }

        const saltRound = 10;
        const bcryptPass = await bcrypt.hash(clientData.pass, saltRound);

        console.log(bcryptPass)

        if(bcryptPass) {
        const insert = await collection.insertOne({ 
            username: clientData.user, 
            pass: bcryptPass, 
            name: clientData.name, 
            lastName: clientData.lastName, 
            email: clientData.email, 
            phone: clientData.phone,
            admin: clientData.admin,
            pic: clientData.pic
        });
            return NextResponse.json({insert: insert})
        }
        else {
            throw new Error('Password bcrypt error: ' + clientData.pass)
        }
    }
    catch(err){
        throw new Error(err.message)
    }
}

export const GET = async () => {
    try{
        const database = client.db('sm');
        const adminDb = database.collection('admin');
        const getInfo = await adminDb.find().toArray();

        return NextResponse.json(getInfo)
    }
    catch(err){
        throw new Error(err.message)
    }
}

export const DELETE = async (req) => {
    try{
        const data = await req.json()

        const database = client.db('sm');
        const adminDb = database.collection('admin');
        const delInfo = await adminDb.deleteOne({username: data.user});

        if(delInfo.deletedCount > 0) return NextResponse.json({delete: 'deleted'})
        else return NextResponse.json({delete: 'failed'});
    }
    catch(err){
        throw new Error(err.message)
    }
}

export const PUT = async (req) => {
    try{
        const data = await req.json()

        const database = client.db('sm');
        const adminDb = database.collection('admin');
        const info = await adminDb.findOne({username: data.user});

        if(info){
            const saltRound = 10;
            const bcryptPass = await bcrypt.hash(data.pass, saltRound);
            
            if(bcryptPass){
                const putInfo = await adminDb.updateOne({username: data.user}, { $set: {pass: bcryptPass}});
                if (putInfo.modifiedCount > 0) {
                    return NextResponse.json({wow: 'Data is Updated successfully'})
                }
                else{
                    throw new Error('Data update failed')
                }
            }
        }
        else{
            throw new Error('No one found')
        }
    }
    catch(err){
        throw new Error(err.message)
    }
}