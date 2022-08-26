import { createContext, useState, useEffect } from 'react';

export const Context = createContext();

const Provider = ({ children }) => {

    const [allArticles, setAllArticles] = useState([]);

    useEffect(() => {
        fetch(`/api/articles`)
            .then((res) => res.json())
            .then((data) => {
                setAllArticles(data.data);
            })
    },[]);

    return (
        <Context.Provider
            value={{
                allArticles
            }}
        >
            {children}
        </Context.Provider>
    )
}

export default Provider;