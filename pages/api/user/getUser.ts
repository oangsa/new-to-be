// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import connectMongo from '@/src/libs/connectMongo'
import Note from '@/src/models/schemas'

export default async function getUser(req: NextApiRequest, res: NextApiResponse) {
    const username: string = req.body.username
    const password: string = req.body.password
    if (req.method !== "POST") return res.status(405).send({message: "Only POST method is allowed!"})

    try {
        connectMongo()

        const result = await Note.findOne({"loginData.username": username, "loginData.password": password})
        
        if (result === null) return res.status(400).send({message: "User is not valid."})

        return res.status(200).send(result)

    } catch (err) {
        return res.status(404).send({message: "Unknown Error"})
    }
}