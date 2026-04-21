const hours = 4
const cache = new Map()
const CACHE_TTL = hours * (60 * 60) * 1000

/**
 *  This hook is use to call MediaStackAPI and get data to fill several page
 *
 * @export
 * @param {object} params is the params api
 * @return {Promise}
 */
export default function useMediaStackAPI(params = null) {
  const apiKey = import.meta.env.VITE_MEDIASTACK_API_KEY
  const baseUrl = import.meta.env.VITE_MEDIASTACK_BASE_URL

  const parameters = params ? "&" + new URLSearchParams(params).toString() : ""
  const url = `${baseUrl}?access_key=${apiKey}&limit=100${parameters}`

  const cached = cache.get(url)

  //-- If the time of cache is not excedeed then use the cache data instead --
  if (cached && Date.now() - cached.timestamp > CACHE_TTL) {
    return Promise.resolve(cached.data)
  }

  return new Promise((resolve) => setTimeout(resolve, 500))
    .then(() => fetch(url))
    .then((response) => response.json())
    .then((response) => {
      cache.set(url, { data: response.data, timestamp: Date.now() })
      return response.data
    })
}
