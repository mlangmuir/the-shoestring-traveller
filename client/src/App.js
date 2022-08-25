import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./globalStyle";
import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/About";
import Destinations from "./components/Destinations/Destinations";
import TravelTips from "./components/TravelTips";
import Gallery from "./components/Details/Gallery";
import Contact from "./components/Contact";
import Article from "./components/Details/Article";
import ErrorPage from "./components/ErrorPage";
import Footer from "./components/Footer";

const App = () => {

  return (
    <>
      <BrowserRouter>
        <GlobalStyle />
        <Header />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/destinations" element={<Destinations />} />
            <Route exact path="/travel-tips" element={<TravelTips />} />
            <Route exact path="/gallery" element={<Gallery />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route exact path="articles/id/:articleId" element={<Article />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App;
