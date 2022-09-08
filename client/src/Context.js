import { createContext, useState, useEffect } from 'react';
import usePersistedState from './usePersistedState';

export const Context = createContext();

const Provider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [allArticles, setAllArticles] = useState([]);
    const [allFilters, setAllFilters] = usePersistedState("allFilters", []);
    const [continents, setContinents] = useState([]);
    const [regions, setRegions] = useState([]);
    const [countries, setCountries] = useState([]);
    const [articleTypes, setArticleTypes] = useState([]);
    const [profileTab, setProfileTab] = useState("profile");
    const [articleComments, setArticleComments] = useState([]);

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
                allFilters,
                setAllFilters,
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
                setArticleComments
            }}
        >
            {children}
        </Context.Provider>
    )
}

export default Provider;