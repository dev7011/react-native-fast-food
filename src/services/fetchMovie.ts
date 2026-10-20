const URL_API = "https://example/movies"

interface Movie{
  id: number,
  title: string,
  urlImage: string,
}

async function fetchMovie(
  search?: string,
  signal?: AbortSignal): Promise<Movie[]> {

  const url = search
    ? `${URL_API}/?query=${encodeURIComponent(search)}`
    : URL_API

  const response = await fetch(url, {
    method: 'GET',
    signal,
    headers: {}
  })

  if (!response.ok) throw new Error("Error by fetch movie")

  return response.json()
 }

export { fetchMovie }