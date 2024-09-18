const base_url = process.env.BASE_URL_API || "http://localhost:8000/api";

export const getEvent = async (search: string = "", location: string = "", category: string = "") => {
    // Construct the query string with search, location, and category parameters
    const queryParams = new URLSearchParams();
    if (search) queryParams.set("search", search);
    if (location) queryParams.set("location", location);
    if (category) queryParams.set("category", category);

    try {
        const res = await fetch(`${base_url}/event?${queryParams.toString()}`, { cache: 'no-cache' });
        const result = await res.json();
        return { result, event: result.event, ok: res.ok };
    } catch (error) {
        console.error("Error fetching events:", error);
        return { result: [], event: [], ok: false };
    }
}

export const getEventSlug = async (events: string) => {
    const res = await fetch(`${base_url}/event/${events}`, { next: { revalidate: 3600 } })
    const result = await res.json()

    return { result, events: result.event, ok: res.ok }
}