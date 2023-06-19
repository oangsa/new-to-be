import { ChangeEvent, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context"
import { FcLock } from 'react-icons/fc'
import checkA from "@/src/libs/checkAuth"
import Swal from "sweetalert2"
import { hasCookie } from "cookies-next"
import PageContainer from "@/src/components/container/PageContainer"

export default function LoginPage() {
    const router: AppRouterInstance = useRouter()
    const [data, setData] = useState({
        username: '',
        password: ''
    })

    useEffect(() => {
        const goShit = () => {
            return process.env.NODE_ENV === 'development' ?  "" : !hasCookie("user-token") ? "" : router.push("/")
        }
        goShit()
    })
    
    const swalSuccess = () => {
        Swal.fire({
            title: 'Authenticated!',
            icon: "success",
        })

        router.refresh()
    }

    const swalError = () => {
        
        Swal.fire({
            title: 'Authenticate Failed!',
            icon: "error",
        })

        router.refresh()
    }

    const submit = async () => {
        Swal.fire({
            title: 'Checking',
            icon: "warning",
            didOpen: async () => {
                
                Swal.showLoading()

                if (await checkA(data.username, data.password)) return setTimeout(swalSuccess, 500);

                return setTimeout(swalError, 500);

            },
        })

    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setData((prev) => ({...prev, [name]: value}))
    }

    return (
        <PageContainer title="Login" description="Authentication System">
            <div className="">
                <div className="flex flex-col items-center justify-center px-16 py-8 mx-auto md:h-screen">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="items-center flex lg:text-sm md:text-sm sm:text-xs font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
                                📝 ลงทะเบียนเข้าใช้งานศูนย์เพื่อนใจ TO BE NUMBER ONE R.S
                            </h1>
                            <p className="text-red-500">
                                *ชื่อผู้ใช้และรหัสผ่าน ใช้เลขประจำตัวนักเรียน ถ้าไม่ได้ให้ใส่ชื่อแทน*
                            </p>
                            <form className="space-y-4 md:space-y-6">
                                <div>
                                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ชื่อผู้ใช้</label>
                                    <input value={data.username} onChange={handleChange} placeholder="12345" id="username" name="username" type="text" required className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">รหัสผ่าน</label>
                                    <input value={data.password} onChange={handleChange} placeholder="•••••" id="password" name="password" type="password" required className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                                </div>
                                <div className="flex items-center justify-between">
                                    <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">ลืมรหัสผ่าน?</a>
                                </div>
                            </form>
                            <button onClick={submit} className="w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">เข้าสู่ระบบ</button>
                        </div>
                    </div>
                </div>  
            </div>
        </PageContainer>
      )
}

