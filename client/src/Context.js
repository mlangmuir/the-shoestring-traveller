import { createContext, useState, useEffect } from 'react';

export const Context = createContext();

const Provider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [allArticles, setAllArticles] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        fetch(`/api/articles`)
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
                setIsLoading
            }}
        >
            {children}
        </Context.Provider>
    )
}

export default Provider;