import { useState } from "react"

export async function fetchData(route, method, body, cb) {

    const response = await fetch("http://localhost:3000/" + route, {
        method,
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    })


    if (!response.ok) {
        const err = await response.json()
        throw new Error("Request Failed!")
    }
    const respData = await response.json();

    console.log(respData);

    (cb && respData) && cb(respData);

    return respData
}