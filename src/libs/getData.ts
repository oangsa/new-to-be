import { CookieValueTypes } from "cookies-next";

const getData = async ( username: CookieValueTypes, password: CookieValueTypes ) => {
    const res = await fetch("/api/user/getUser", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({username: username, password: password}),
    })
    
    if (res.status !== 200) return false;
    
    return await res.json()
}

export default getData