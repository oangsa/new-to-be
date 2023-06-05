// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import connectMongo from '@/src/libs/connectMongo'
import Note from '@/src/models/schemas'
import { SignJWT } from 'jose'
import { nanoid } from 'nanoid'
import { getJwtSecretKey } from '@/src/libs/auth'
import cookie from 'cookie'

export default async function checkAuth(req: NextApiRequest, res: NextApiResponse) {
    const username: string = req.body.username
    const password: string = req.body.password
    if (req.method !== "POST") return res.status(405).send({message: "Only POST method is allowed!"})

    var isAdmin = false

    try {
        connectMongo()
        
        console.log(username, password)

        if (username === "admin" && password === "password") isAdmin = true

        const result = await Note.findOne({"loginData.username": username, "loginData.password": password})

        if (result === null) return res.status(400).send({message: "User is not valid."})

        const token = await new SignJWT({})
            .setProtectedHeader({ alg: 'HS256', studentId: result.studentData.studentId , username: result.loginData.username, password: result.loginData.password, isAdmin: isAdmin === true ? true : false })
            .setJti(nanoid())
            .setExpirationTime('30 days')
            .sign(new TextEncoder().encode(getJwtSecretKey()))
        
        res.setHeader('Set-Cookie', cookie.serialize('user-token', token, {
            path: '/',
            httpOnly: false,
            sameSite: "strict"
        }))

        return res.status(200).send(result)

    } catch (err) {
        return res.status(404).send({message: "Unknown Error"})
    }
}