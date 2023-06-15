// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectMongo from '@/src/libs/connectMongo'
import Note from '@/src/models/schemas'
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function update( req: NextApiRequest, res: NextApiResponse ) {
    if (req.method !== "GET") return res.status(405).send({ message: "Only GET method are allowed!" })
    const { id } = req.query
    
    try { 
        connectMongo()
        const result = await Note.findOne({"studentData.studentId": id})
        
        if (result === null) return res.status(400).send({message: "User is not valid."})

        return res.status(200).send(result)
    } 
    catch (err) {
        return res.status(404).send({message: "Unknown Error"})
    }
}