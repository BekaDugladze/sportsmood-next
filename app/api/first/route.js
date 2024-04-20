"use server"

import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

const secretKey = process.env.SECRET_KEY;
const client = new MongoClient(process.env.MONGOURI);

export const setAuthTokenCookie = (token) => {

    // Set the JWT token in a cookie with appropriate options
    cookies().set('authToken', token, )
};

export const POST = async (req) => {
    try{
        await client.connect(); // Connect to MongoDB
        const data = await req.json()
        const user = data.user
        const pass = data.pass

        //mongoDB user
        const database = client.db('sm');
        const adminDb = database.collection('admin');
        const insert = await adminDb.findOne({ username: user });

        if(!insert){
            throw new Error('No MongoDB user found')
        }
        else {
            const compare = await bcrypt.compare(pass, insert.pass)
            if(!compare) throw new Error('Does not match')
            else{
                const token = await jwt.sign({username: user}, secretKey, {expiresIn: '8h'})
                setAuthTokenCookie(token);
                return NextResponse.json(token)
            }
        }

    }
    catch(err){
        throw new Error(err)
    }
}

export const GET = async (req) => {
    const cookie = cookies();
    try{
        const token = cookie.get('authToken')
        const decoded = await jwt.verify(token.value, secretKey)

        const database = client.db('sm');
        const adminDb = database.collection('admin');
        
        const getInfo = await adminDb.findOne({username: decoded.username});

        if(getInfo){
        return NextResponse.json(getInfo)
        }
        else {throw new Error('Could not find User');}
    }
    catch(err){
        throw new Error(err)
    }
}

export const PUT = async (req) => {
    try {
        const data = await req.json();

        const database = client.db('sm');
        const adminDb = database.collection('admin');
        const putInfo = await adminDb.updateOne({username: data.user}, { $set: {pic: data.pic}});
        if (putInfo.modifiedCount > 0) {
            return NextResponse.json({wow: 'Data is Updated successfully'})
        }
        else{
            throw new Error('Data update failed')
        }
    }
    catch(err){
        throw new Error(err)
    }
}

export const DELETE = async (req) => {
    try{
        const del = await cookies().delete('authToken')
        return NextResponse.json({data: del})
    }
    catch(err){
        throw new Error('Could not delete')
    }
}