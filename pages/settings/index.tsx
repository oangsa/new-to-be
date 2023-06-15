import { NextRouter, useRouter } from 'next/router'
import { ChangeEvent, useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { CookieValueTypes, getCookie } from 'cookies-next'
import jwtDecode from 'jwt-decode'
import getStudent from '@/src/libs/getData'

interface studentData {
    name: string,
    surname: string,
    studentId: number,
    yearClass: number,
    class: number,
    reason: string,
    total: number,
    oldMonth: number,
    timestamps: Date,
}

interface loginData {
    username: string,
    password: string
}

const Settings = () => {
    const router: NextRouter = useRouter()

    const [studentData, setStudentData] = useState<studentData>({
        name: "",
        surname: "",
        studentId: 0,
        yearClass: 0,
        class: 0,
        reason: "",
        total: 0,
        oldMonth: 0,
        timestamps: new Date(),
    })
    
    const [loginData, setLoginData] = useState<loginData>({
        username: "",
        password: ""
    })


    const swalFunc = () => {
        Swal.fire({
            title: 'Student is already exist!',
            icon: "error",
        })
    }

    const update = async (id : any) => {

        const res = await fetch(`/api/user/update/${id}?isUserUpdate=true`, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: loginData.username, password: loginData.password }),
        })

        console.log(await res.json())

        if (res.status !== 200) return swalFunc()

        Swal.fire({
            title: 'Updated',
            icon: "success",
        })

        setTimeout(() => router.reload(), 1000)
    }

    const submit = async () => {
        
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirm'
        }).then(async (result) => {
            
            if (result.isConfirmed) {
                update(studentData.studentId)
            }
        })
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setLoginData((prev: any) => ({...prev, [name]: value}))
    }

    useEffect(() => {

        const getData = async () => {
            const cookie: any = getCookie("user-token")
            const token: any = jwtDecode(cookie, {header: true})
            const data: Promise<any> = getStudent(token.studentId)
            const [student] = await Promise.all([data])
            
            setStudentData(student.studentData)
            setLoginData(student.loginData)
        }
        getData()
    },[])

    return (
        <div>
            <div className="overflow-y-auto top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 md:h-full">
                <div className="relative p-8 w-full h-full md:h-auto">
                    <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                        <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                ข้อมูลทั่วไป 📝
                            </h3>
                        </div>
                        <form>
                            <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ชื่อ</label>
                                    <input value={studentData.name} disabled type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="ประยุทธ์" required />
                                </div>
                                <div>
                                    <label htmlFor="surname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">นามสกุล</label>
                                    <input value={studentData.surname} disabled type="text" name="surname" id="surname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="ประยุทธ์" required />
                                </div>
                                <div>
                                    <label htmlFor="studentId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">เลขประจำตัวนักเรียน</label>
                                    <input value={studentData.studentId} disabled type="text" name="studentId" id="studentId" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="ประยุทธ์" required />
                                </div>
                                <div>
                                    <label htmlFor="yearClass" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ชั้นมัธยมศึกษาปีที่</label>
                                    <input value={studentData.yearClass} disabled type="text" name="yearClass" id="yearClass" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="ประยุทธ์" required />
                                </div>
                                <div>
                                    <label htmlFor="Class" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ห้อง</label>
                                    <input value={studentData.class} disabled type="text" name="Class" id="Class" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="ประยุทธ์" required />
                                </div>
                            </div>
                            <div className="mt-4 flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    ตั้งค่าชื่อผู้ใช้ และรหัสผ่าน 📝
                                </h3>
                            </div>
                            <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">username</label>
                                    <input onChange={(e) => {setLoginData((prev: any) => ({...prev, "username": e.target.value}))}} value={loginData.username} type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="ประยุทธ์" required />
                                </div>                                
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">password</label>
                                    <input onChange={(e) => {setLoginData((prev: any) => ({...prev, "password": e.target.value}))}} value={loginData.password} type="text" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="ประยุทธ์" required />
                                </div>                                
                            </div>
                        </form>
                        <button onClick={submit} className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                            <svg className="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                            บันทึก
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings;