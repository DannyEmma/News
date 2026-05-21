import { useState, useEffect } from 'react'
import { useLoaderData, useNavigation } from 'react-router-dom'
import useDocumentTitle from '../../../hooks/useDocumentTitle'
import ArticleCardList from '../../ArticleCardList/ArticleCardList'
import SectionTitle from './../../SectionTitle/SectionTitle'
import AdsSlot from './../../AdsSlot/AdsSlot'
import NoResult from '../../NoResult/NoResult'
import Spinner from '../../Spinner/Spinner'

import './Home.css'

export default function Home() {
  useDocumentTitle('Accueil')

  const navigation = useNavigation()
  const [isLoading, setIsLoading] = useState(true)

  const articles = useLoaderData()
  console.log('articles home', articles)

  //-- Use to have a minimum delai to display spinner --
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => {
      clearTimeout(timer)
      setIsLoading(true)
    }
  }, [navigation.state])

  return (
    <>
      {navigation.state === 'loading' || isLoading ? (
        <Spinner />
      ) : (
        <div id="home">
          <div id="home-highlight-section">
            {articles.headlines.length ? (
              <>
                <div className="column col1">
                  <ArticleCardList articles={articles.headlines} variant="highlight" number={1} />
                </div>
                <div className="column col2">
                  <ArticleCardList articles={articles.headlines} variant="normal" number={3} />
                </div>
                <div className="column col3">
                  <ArticleCardList articles={articles.headlines} variant="normal" number={1} />
                  <ArticleCardList articles={articles.headlines} variant="inline" number={8} />
                </div>
              </>
            ) : (
              <NoResult />
            )}
          </div>

          <div id="home-more-news-section">
            <div className="column col1">
              <SectionTitle>plus d'actualités</SectionTitle>
              {articles.moreHeadlines.length ? (
                <>
                  <ArticleCardList articles={articles.moreHeadlines} variant="normal" number={1} />
                  <ArticleCardList articles={articles.moreHeadlines} variant="inline" number={5} />
                </>
              ) : (
                <NoResult />
              )}
            </div>
            <div className="column col2">
              <SectionTitle>En vedette</SectionTitle>
              {articles.featured.length ? (
                <>
                  <ArticleCardList articles={articles.featured} variant="normal" number={1} />
                  <ArticleCardList articles={articles.featured} variant="aside" number={2} />
                </>
              ) : (
                <NoResult />
              )}
            </div>
            <div className="column col3">
              <AdsSlot variant="square" mBottom={10} />
              {articles.featured.length ? (
                <>
                  <ArticleCardList articles={articles.featured} variant="aside" number={6} />
                </>
              ) : (
                <NoResult />
              )}
            </div>
          </div>

          <AdsSlot variant="rectangle" mTop={50} />
        </div>
      )}
    </>
  )
}
