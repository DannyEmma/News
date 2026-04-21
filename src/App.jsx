import { Outlet, ScrollRestoration } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'


function App() {  
  return (
    <>
      <Header/>
      <main>
        <div className="container">
          <Outlet/>
          <ScrollRestoration/>
        </div>
      </main>
      <Footer/>
    </>
  )
}

export default App
