// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectMongo from '@/src/libs/connectMongo'
import Note from '@/src/models/schemas'
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function update( req: NextApiRequest, res: NextApiResponse ) {
    if (req.method !== "POST") return res.status(405).send({ message: "Only POST method are allowed!" })
    const { name, surname, yearClass, studentID, Class, username, password } = req.body
    const { id, isUserUpdate } = req.query
    var pass = false
    console.log(name, surname, yearClass, Class, username, password, studentID)
    
    try { 
        connectMongo()
        
        const c_1 = (name === "" || surname === "" || yearClass === "" || Class === "" || username === "" || password === "" || studentID === "")
        const c_2 = (name === undefined || surname === undefined || yearClass === undefined || Class === undefined || username === undefined || password === undefined || studentID === undefined)
        
        if (c_1 && isUserUpdate === 'false' ) return res.status(201).send({ message: "Please full fill all of data" })
        if (c_2 && isUserUpdate === 'false' ) return res.status(202).send({ message: "Please full fill all of data" })
        
        const check:any[] = await Note.find({"loginData.username" : username})  
        const oldData:any = await Note.findOne({"studentData.studentId" : id})
        
        if ( check.length > 1 && isUserUpdate === 'false') var pass = !(check[0].loginData.username === username && oldData.loginData.username !== username)
        else if ( check.length > 1 && isUserUpdate === 'true' ) var pass = false
        else var pass = true
        
        if ( !pass ) return res.status(202).send({message: "Username is already taken."})
        
        if ( isUserUpdate === 'false' ) await Note.updateOne({ "studentData.studentId": id }, {$set: {"studentData.name": name, "studentData.surname": surname, "studentData.yearClass": yearClass, "studentData.studentId": studentID, "loginData.username": username, "loginData.password": password}})
        if ( isUserUpdate === 'true' ) await Note.updateOne({ "studentData.studentId": id }, {$set: {"loginData.username": username !== "" ? username : oldData.loginData.username, "loginData.password": password !== "" ? password : oldData.loginData.password } })
        
        return res.status(200).send({ message: true })
    } 
    catch (err) {
        return res.status(404).send({message: "Unknown Error"})
    }
}