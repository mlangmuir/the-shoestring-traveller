import { createContext, useState, useEffect } from 'react';
import usePersistedState from './usePersistedState';

export const Context = createContext();

const Provider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [allArticles, setAllArticles] = useState([]);
    const [filtersLabel, setFiltersLabel] = usePersistedState("allFilters", []);
    const [continents, setContinents] = useState([]);
    const [regions, setRegions] = useState([]);
    const [countries, setCountries] = useState([]);
    const [articleTypes, setArticleTypes] = useState([]);
    const [profileTab, setProfileTab] = useState("profile");
    const [articleComments, setArticleComments] = useState([]);
    const [displayValue, setDisplayValue] = useState("");
    const [travelTipArticles, setTravelTipArticles] = useState([]);

    // fetches only travel tip articles
    useEffect(() => {
        setIsLoading(true);
        console.log(travelTipArticles)
        fetch("/api/articles?articleType=Travel%20Tips")
            .then((res) => res.json())
            .then((data) => {
                setIsLoading(false);
                setTravelTipArticles(data.data);
            })
    },[]);

    useEffect(() => {
        setIsLoading(true);
        fetch(`/api/allArticles`)
            .then((res) => res.json())
            .then((data) => {
                setAllArticles(data.data);
                setIsLoading(false);
            })
    },[]);

    return (
        <Context.Provider
            value={{
                allArticles,
                isLoading,
                setIsLoading,
                filtersLabel,
                setFiltersLabel,
                continents,
                setContinents,
                regions,
                setRegions,
                countries,
                setCountries,
                articleTypes,
                setArticleTypes,
                profileTab,
                setProfileTab,
                articleComments,
                setArticleComments,
                displayValue,
                setDisplayValue,
                travelTipArticles,
                setTravelTipArticles
            }}
        >
            {children}
        </Context.Provider>
    )
}

export default Provider;