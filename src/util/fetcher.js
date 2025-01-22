import { useState } from "react"

export async function fetchData(route, method, body, cb) {

    // const path = "http://localhost:3000/"   for development phase
    const path = "https://note-app-opal-six.vercel.app/"

    const response = await fetch(path + route, {
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