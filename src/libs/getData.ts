import { CookieValueTypes } from "cookies-next";

const getStudent = async (id: CookieValueTypes) => {
    const res = await fetch(`/api/user/get/${id}`)

    if (!res.ok) throw new Error('Failed To Fetch User')

    return res.json()
}

export default getStudent