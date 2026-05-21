export default async function useDataTest() {
  let data = null

  try {
    const response = await fetch('http://localhost:5174/data-test.json')

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Erreur de réponse :', errorText)
      throw new Error(`Erreur HTTP : ${response.status}`)
    }

    data = await response.json()
  } catch (error) {
    console.error('Une erreur est survenue !!!', error)
  }

  return data
}
