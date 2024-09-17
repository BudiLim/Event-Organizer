const base_url = process.env.BASE_URL_API || "http://localhost:8000/api"

export const getEvent = async (search: string = "") => {
    const res = await fetch(`${base_url}/event?search=${search}`, {cache: 'no-cache'})
    const result = await res.json()

    return { result, event: result.event, ok: res.ok}
}

export const getEventSlug = async (events: string) => {
    const res = await fetch (`${base_url}/event/${events}`, {next: { revalidate: 3600}})
    const result = await res.json()

    return { result, events: result.event, ok: res.ok}
}