import { useState, useEffect } from 'react'
import { useLoaderData, useLocation, useNavigation, useParams } from 'react-router-dom'
import useDocumentTitle from '../../../hooks/useDocumentTitle'
import ArticleCardList from '../../ArticleCardList/ArticleCardList'
import AdsSlot from '../../AdsSlot/AdsSlot'
import NoResult from '../../NoResult/NoResult'
import Spinner from '../../Spinner/Spinner'


import './Category.css'

export default function Category(){    
    const {category} = useParams()
    const categoryTitle = category.slice(0, 1).toUpperCase() + category.slice(1, category.length)
    useDocumentTitle(categoryTitle)

    const navigation = useNavigation()
    const location = useLocation()
    const [isLoading, setIsLoading] = useState(true)

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


    const articles = useLoaderData()
    
    return (
        <>
            { (navigation.state === 'loading' || isLoading) ?
                <Spinner/>
            :(
                <div id="category">
                    <h1>{categoryTitle}</h1>

                    <div id="category-headline-section">
                        { articles.headlines.length ? 
                            <>
                                <div className="column col1">
                                    <ArticleCardList articles={articles.headlines} variant="normal" number={1}/>
                                    <ArticleCardList articles={articles.headlines} variant="long-aside" number={5}/>
                                </div>
                                <div className="column col2">
                                    <ArticleCardList articles={articles.headlines} variant="normal" number={1}/>
                                    <ArticleCardList articles={articles.headlines} variant="inline" number={9}/>
                                </div>
                                <div className="column col3">
                                    <AdsSlot variant="square" mBottom={25}/>
                                    <ArticleCardList articles={articles.headlines} variant="normal" number={2}/>
                                </div>
                            </>
                            : <NoResult/>
                        }                
                    </div>

                    <h2>Plus d'actualités</h2>

                    <div id="category-more-news-section">
                        { articles.moreHeadlines.length ? 
                            <>
                                <ArticleCardList articles={articles.moreHeadlines} variant="normal" number={4}/>
                            </>
                            : <NoResult/>
                        }                                
                    </div>

                    <h2>Pour ceux qui l'ont manqué</h2>
                    <div id="category-missed-section">
                        { articles.moreHeadlines.length ? 
                            <>
                                <div className="column col1">
                                    <ArticleCardList articles={articles.missed} variant="normal" number={1}/>
                                    <ArticleCardList articles={articles.missed} variant="inline" number={4}/>
                                </div>
                                <div className="column col2">
                                    <ArticleCardList articles={articles.missed} variant="normal" number={1}/>
                                    <ArticleCardList articles={articles.missed} variant="inline" number={5}/>
                                </div>
                                <div className="column col3">
                                    <AdsSlot variant="square"/>
                                </div>
                            </>
                            : <NoResult/>
                        }                    
                    </div>

                    <AdsSlot variant="rectangle"/>

                </div>
            )}
        </>
    )
}