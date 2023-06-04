import { NextRouter, useRouter } from "next/router";

const del = async (name: string, surname: string) => {
    const res = await fetch(`/api/user/remove/${name}?surname=${surname}`, {
        method: "DELETE",
    })

    if (res.status !== 200) return await res.json()

    console.log("success")

}

export default del; 