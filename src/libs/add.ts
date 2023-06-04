interface data {
    (name: string,
    surname: string,
    studentID: number, 
    yearClass: number, 
    Class: number): Promise<Response>
}

const add: data = async (name: string, surname: string, studentID: number,  yearClass: number,  Class: number) => {
    
    const struc = { name: name, surname: surname, studentID: studentID, yearClass: yearClass, Class: Class }

    const res = await fetch("/api/user/add", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(struc),
    })


    return res
    
}

export default add