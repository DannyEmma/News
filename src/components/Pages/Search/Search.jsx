import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Pagination from "react-js-pagination"
import useRetrieveDoublons from "../../../hooks/useRetrieveDoublons"
import useMediaStackAPI from "../../../hooks/useMediaStackAPI"
import SearchBar from "../../SearchBar/SearchBar"
import ArticleCard from "../../ArticleCard/ArticleCard"

import "./Search.css"

/**
 * This component is the search page, it display the results of the user query
 *
 * @export
 * @return {React.ReactElement}
 */
export default function Search() {
  const [articles, setArticles] = useState([])
  const [filter, setFilter] = useState("newest")
  const [activePage, setActivePage] = useState(1)
  const [articlesPerPage, setArticlesPerPage] = useState(10)
  const [totalArticles, setTotalArticles] = useState(0)
  const { query } = useParams()

  const displayArticles = () => {
    const beginIndex = activePage * articlesPerPage - articlesPerPage
    const endIndex = beginIndex + articlesPerPage

    const articlesToDisplay = articles.length ? articles.slice(beginIndex, endIndex) : []

    return articlesToDisplay.map((article) => <ArticleCard article={article} variant="search" />)
  }

  const searchResultsInfos = () => {
    const fromNumber = activePage * articlesPerPage - (articlesPerPage - 1)
    let toNumber = activePage * articlesPerPage
    toNumber = totalArticles < toNumber ? totalArticles : toNumber

    let infos = (
      <p>
        Affichage de {fromNumber} à {toNumber} sur {totalArticles} pour <strong>&laquo; {query} &raquo;</strong>
      </p>
    )
    infos = totalArticles ? (
      infos
    ) : (
      <p>
        Aucun résultat pour <strong>&laquo; {query} &raquo;</strong>
      </p>
    )

    return infos
  }

  useEffect(() => {
    useMediaStackAPI({ languages: "fr", countries: "fr", keywords: query, sort: filter === "newest" ? "published_desc" : "popularity" }).then((response) => {
      const articles = useRetrieveDoublons(response)
      setArticles(articles)
      setTotalArticles(articles.length)
      setActivePage(1)
    })
  }, [query, filter])

  return (
    <div id="search">
      <SearchBar variant="search-page" />

      <div id="search-filter-bar-container">
        <div id="search-result-infos">{searchResultsInfos()}</div>
        <div id="search-filter-bar">
          <p>Trié par</p>
          <button onClick={() => setFilter("newest")} id="search-filter-bar-newest" className={filter === "newest" ? "active" : ""}>
            Récent
          </button>
          <button onClick={() => setFilter("relevancy")} id="search-filter-bar-relevancy" className={filter === "relevancy" ? "active" : ""}>
            Pertinence
          </button>
        </div>
      </div>

      <div id="search-results-content">{...displayArticles()}</div>

      <Pagination
        activePage={activePage}
        itemsCountPerPage={articlesPerPage}
        totalItemsCount={totalArticles}
        pageRangeDisplayed={5}
        onChange={(page) => setActivePage(page)}
      />
    </div>
  )
}
