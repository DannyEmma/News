import { useEffect, useState, useRef } from 'react'
import ArticleCard from '../ArticleCard/ArticleCard'

/**
 *  This component display a list of article card depending of parameters
 *
 * @export
 * @param {Array} {articles}
 * @param {String} {variant}
 * @param {Number} {number}
 * @return {React.ReactElement}
 */
export default function ArticleCardList({ articles, variant, number }) {
  const [cardsList, setCardsList] = useState([])

  useEffect(() => {
    for (let i = 0; i < number; i++) {
      const article = articles[i]

      if (article) {
        setCardsList((prev) => [...prev, <ArticleCard key={crypto.randomUUID()} article={article} variant={variant} />])
        articles.shift()
      }
      // console.log(article)
    }
  }, [])

  //  useEffect(() => {
  //   articles.forEach((article, index) => {
  //     if (article && !article.onDisplay && cardsListRef.current.length < number) {
  //       cardsListRef.current.push(<ArticleCard key={index} article={article} variant={variant} />)
  //       article.onDisplay = true
  //     }
  //   })

  //   setCardsList(cardsListRef.current)
  // }, [])

  return <>{...cardsList}</>
}
