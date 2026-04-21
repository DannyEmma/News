import { createBrowserRouter, RouterProvider, useLocation } from "react-router-dom"
import useMediaStackAPI from "../hooks/useMediaStackAPI.js"
import useDataTest from "../hooks/useDataTest.js"
import useExistingCategory from "../hooks/useExistingCategory.js"
import useTranslateCategory from "../hooks/useTranslateCategory.js"
import useRetrieveDoublons from "../hooks/useRetrieveDoublons.js"
import App from "../App"
import Home from "../components/Pages/Home/Home"
import Article from "../components/Pages/Article/Article"
import Category from "../components/Pages/Category/Category"
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary"
import NotFound from "../components/Pages/Errors/NotFound/NotFound"
import Search from "../components/Pages/Search/Search"

const routerConfig = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: async () => {
          let headlinesArticles = await useMediaStackAPI({ languages: "fr", countries: "fr", categories: "-general" })
          let featuredArticles = await useMediaStackAPI({ sort: "popularity", languages: "fr", countries: "fr", categories: "-general" })

          // useDataTest is use to not exceed the free limit of the api
          // let headlinesArticles = await useDataTest()
          // let featuredArticles = await useDataTest()

          headlinesArticles = useRetrieveDoublons(headlinesArticles ?? [])
          featuredArticles = useRetrieveDoublons(featuredArticles ?? [])

          return {
            headlines: headlinesArticles.slice(0, 13), // 13 first articles
            moreHeadlines: headlinesArticles.slice(-6), // 6 last articles
            featured: featuredArticles,
          }
        },
      },
      {
        path: "search/:query",
        element: <Search />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "search/:query/article/:slug",
        element: <Article />,
        errorElement: <ErrorBoundary />,
      },

      //-- Catégory Route --
      {
        path: ":category",
        element: <Category />,
        loader: async ({ params }) => {
          if (!useExistingCategory(params.category)) throw new Response(null, { status: 404 })

          let articles = await useMediaStackAPI({ limit: 33, languages: "fr", countries: "fr", categories: useTranslateCategory("eng", params.category) })
          articles = useRetrieveDoublons(articles)

          return {
            headlines: articles.slice(0, 18),
            moreHeadlines: articles.slice(18, 22),
            missed: articles.slice(-11),
          }
        },
        errorElement: <NotFound />,
      },
      {
        path: ":category/article/:slug",
        element: <Article />,
        loader: async ({ params }) => {
          if (!useExistingCategory(params.category)) throw new Response(null, { status: 404 })

          let articlesSuggestions = await useMediaStackAPI({
            languages: "fr",
            countries: "fr",
            categories: useTranslateCategory("eng", params.category),
          }).then((response) => response)

          return useRetrieveDoublons(articlesSuggestions)
        },
        errorElement: <ErrorBoundary />,
      },

      //-- All others paths --
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
])

export default function Router() {
  return <RouterProvider router={routerConfig} />
}
