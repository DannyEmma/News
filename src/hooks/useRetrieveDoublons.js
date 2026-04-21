export default function useRetrieveDoublons(articles){
    const array = []
    
    const isDoublon = (currentArticle) => {
        const isDoublon = array.some( article => article.title === currentArticle.title)
        array.push(currentArticle)
    
        return isDoublon
    }

    return articles.filter( article => !isDoublon(article))
}