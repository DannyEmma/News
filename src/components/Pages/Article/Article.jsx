import { useState, useEffect } from "react"
import { useLoaderData, useLocation } from "react-router-dom"
import useConvertUTC from "../../../hooks/useConvertUTC"
import useLorem from "../../../hooks/useLorem"
import ArticleCardList from "../../ArticleCardList/ArticleCardList"
import SectionTitle from "../../SectionTitle/SectionTitle"
import AdsSlot from "../../AdsSlot/AdsSlot"

import "./Article.css"

/**
 * This component is the Article page
 *
 * @export
 * @return {React.Element}
 */
export default function Article() {
  const article = useLocation().state
  const suggestionsArticle = useLoaderData()

  const { date, month, year, hour, minutes } = useConvertUTC(article.published_at)

  const author = article.author ? article.author : "auteur inconnu"
  const source = article.source ? article.source : "source inconnue"
  const content = useLorem()

  return (
    <div className="article">
      {/* ---Article container --- */}
      <div className="article-container">
        <div className="article-title">
          <h1>{article.title}</h1>
        </div>

        <div className="article-infos">
          <p>
            <span className="article-infos-author">{"Par " + author + ","}</span> {source} <br />
            {`Le ${date} ${month} ${year} à ${hour}h${minutes}`}
          </p>
        </div>

        <hr />

        <div className="article-image">
          <img src={article.image} alt="Article Image" />
        </div>

        <div className="article-content">{content}</div>
      </div>

      {/* ---Article Suggestions --- */}

      <div id="article-suggestions-container">
        <div className="article-suggestions">
          <SectionTitle>Dans la même catégorie</SectionTitle>
          {suggestionsArticle && <ArticleCardList articles={suggestionsArticle} variant="aside" number={3} />}

          <AdsSlot variant="square" mTop={30} />
        </div>

        <div className="article-suggestions">
          <SectionTitle>Plus</SectionTitle>
          {suggestionsArticle && <ArticleCardList articles={suggestionsArticle} variant="aside" number={3} />}

          <AdsSlot variant="square" mTop={30} />
        </div>
      </div>
    </div>
  )
}
