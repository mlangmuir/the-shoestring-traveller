import { createContext, useState, useEffect } from 'react';

export const Context = createContext();

const Provider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [allArticles, setAllArticles] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [displayValue, setDisplayValue] = useState ("");
    const [continents, setContinents] = useState([]);
    const [regions, setRegions] = useState([]);
    const [countries, setCountries] = useState([]);

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
                loggedIn,
                setLoggedIn,
                displayValue,
                setDisplayValue,
                continents,
                setContinents,
                regions,
                setRegions,
                countries,
                setCountries
            }}
        >
            {children}
        </Context.Provider>
    )
}

export default Provider;