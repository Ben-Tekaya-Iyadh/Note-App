import { useEffect, useState } from "react";

export default function useFetech(route, method, body) {
    const [fetchedData, setfetchedData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("http://localhost:3000" + route, {
                method,
                body,
                headers: {
                    "Contetnt-Type" : "application/json"
                }
            })

            if(!response.ok) {
                throw new Error("Request Failed!")
            }

            const respData = await response.json();

            return respData
        }
        
    })
} 