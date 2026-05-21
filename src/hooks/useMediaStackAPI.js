const fourHours = 4 * 60 * 60 * 1000

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

  const parameters = params ? '&' + new URLSearchParams(params).toString() : ''
  const url = `${baseUrl}?access_key=${apiKey}&limit=100${parameters}`

  const cached = JSON.parse(localStorage.getItem(url))

  //-- Validation of cached data --
  if (cached && cached.expiresAt > Date.now()) {
    return Promise.resolve(cached.data)
  }

  //-- Remove the expired cached data --
  localStorage.removeItem(url)

  //-- Fetch data from mediastack api --
  //-- The delay is use to don't have the 429 status code : Too many request --
  return new Promise((resolve) => setTimeout(resolve, 500))
    .then(() => fetch(url))
    .then((response) => response.json())
    .then((response) => {
      localStorage.setItem(url, JSON.stringify({ data: response.data, expiresAt: Date.now() + fourHours }))
      return response.data
    })
}
