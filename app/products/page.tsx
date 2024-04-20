"use client"

import {GET } from "../api/first/route"
import React from "react";
import { useState, useEffect } from "react";

export default function Hi() {
    const [text, setText] = useState(null)

    const getText = async () => {
        try {
            const res = await fetch('/api/movies', {
                method: 'GET',
            })
            const data = await res.json()
            console.log(data)
            setText(data.plot)
        }
        catch (err) {
            console.error(err)
        }
    }
    useEffect(() => {
        getText()
    }, [text])
    return(
        <>
        <h1>hi</h1>
        <h1>hi</h1>
        <h1>hi</h1>
        <h1>hi</h1>
        <h1>hi</h1>
        <h1>hi</h1>
        <h1>{text}</h1>
        </>
    )
}