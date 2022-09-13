import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./globalStyle";
import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/About";
import Destinations from "./components/Destinations/Destinations";
import TravelTips from "./components/TravelTips/TravelTips";
import Contact from "./components/Contact";
import Article from "./components/Article/Article";
import ErrorPage from "./components/ErrorPage";
import Footer from "./components/Footer";
import Profile from "./components/UserProfile/Profile";
import ListingPage from "./components/ListingResults/ListingPage";

const App = () => {

  return (
    <>
      <BrowserRouter>
        <GlobalStyle />
        <Header />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/destinations" element={<Destinations />} />
            <Route exact path="/travel-tips" element={<TravelTips />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route exact path="/articles/id/:articleId" element={<Article />} />
            <Route exact path="/articles" element={<ListingPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App;
