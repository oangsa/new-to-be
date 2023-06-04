// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import connectMongo from '@/src/libs/connectMongo'
import Note from '@/src/models/schemas'

export default async function add( req: NextApiRequest,res: NextApiResponse) {
  if (req.method !== "POST" ) return res.status(405).send({message: "Only POST method is allowed!"})
  
  const { name, surname, studentID,  yearClass,  Class } = req.body

  console.log(name, surname, studentID,  yearClass,  Class)

  const auth1 = (name === undefined || surname === undefined || studentID === undefined || yearClass === undefined || Class === undefined)

  const auth2 = (name === "" || surname === "" || studentID === 11111 || yearClass === 0 || Class === 0)

  if ( auth1 || auth2 ) return res.status(401).send({ message: "Please send all of data in request!" })

  try {
    connectMongo()

    const check = await Note.findOne({"studentData.name" : name, "studentData.studentId" : studentID})

    console.log(check)

    if ( check !== null ) return res.status(201).send({ message: "Student is already exist!" })

    const studentStruct: student = {
        studentData: {
            name: name,
            surname: surname,
            studentId: studentID,
            yearClass: yearClass,
            class: Class,
            reason: '',
            total: 0,
            oldMonth: 0,
            timestamps: new Date(),
        },
        loginData: {
            username: studentID,
            password: studentID
        }
    }
    
    Note.create(studentStruct)

    return res.status(200).send({ message: "Success" })
  } 
  catch (err) {
    return res.status(404).send({ message: "Unexpected Error" })
  }

  
}