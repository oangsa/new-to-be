const checkA = async ( username: string, password: string ) => {
    const res = await fetch("/api/checkAuth", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({username: username, password: password}),
    })
    
    if (res.status !== 200) return false;
    
    return true
}

export default checkA