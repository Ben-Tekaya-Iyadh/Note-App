export async function fetchData(route, method, body, cb) {
    const response = await fetch("https://back-j4hv6ww1t-shadow-childs-projects.vercel.app/" + route, {
        method,
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    })

    
    if(!response.ok) {
        const err = await response.json()
        console.log(err)
        throw new Error("Request Failed!")
    }
    const respData = await response.json();
    //console.log(respData)

    (cb && respData) && cb(respData);

    return respData
}
