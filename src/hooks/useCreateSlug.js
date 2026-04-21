export default function useCreateSlug(text){
    const strNoAccent = (a) => a.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

    let slug = text.replaceAll(" ", "-").replaceAll("'", "").replaceAll('"', "").toLowerCase()
    slug = strNoAccent(slug)    

    return slug
}