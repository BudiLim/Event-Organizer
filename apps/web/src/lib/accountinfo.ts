import base_url from "./user"

export const getUserInfo = async (userId: string) => {
    const res = await fetch(`${base_url}/user/${userId}`, { cache: 'no-cache' })
    const result = await res.json()

    return { result, blogs: result.blogs, ok: res.ok }
}
