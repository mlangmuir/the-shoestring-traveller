import styled from "styled-components";
import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Context } from "../Context";

const Searchbar = () => {

    const navigate = useNavigate();

    const search = useLocation().search;

    const { allArticles, setDisplayValue } = useContext(Context);

    // allows search bar value to be saved in useState and URLSearchParams
    const [value, setValue] = useState(new URLSearchParams(search).get("title") || '');

    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
    const [isFocus, setIsFocus] = useState(false);

    // when user selects article from suggestions dropdown, they are redirected to article detail page
    const handleSelect=(suggestion) => {
        navigate(`/articles/id/${suggestion}`);
    }

    return (
        <Wrapper>
            <Input
                onFocus={()=> setIsFocus(true)}
                onBlur={()=> {
                    setTimeout(() => {
                        setIsFocus(false);
                    }, 200)
                }}
                type="search"
                placeholder="Search articles by title"
                value={value}
                onChange={(ev) => {
                    setValue(ev.target.value);
                    const filteredArray = allArticles.filter((article) => {
                        if (ev.target.value.length >= 1 && article?.title.toLowerCase().includes(ev.target.value.toLowerCase())) {
                            return article;
                        }
                    });
                    setFilteredSuggestions(filteredArray);
                }}
                onKeyDown={(ev) => {
                    switch (ev.key) {
                        case "Enter": {
                            ev.preventDefault();
                            setIsFocus(false);
                            setDisplayValue(value);
                            window.scrollTo(0, 0)
                            if (value.length >= 1 && filteredSuggestions.length > 0) {
                                handleSelect(filteredSuggestions[selectedSuggestionIndex]?.id)
                            }
                            navigate('/articles?title='+value);
                            return;
                        }
                        case "ArrowUp": {
                            setSelectedSuggestionIndex(selectedSuggestionIndex - 1);
                            return;
                        }
                        case "ArrowDown": {
                            setSelectedSuggestionIndex(selectedSuggestionIndex + 1);
                            return;
                        }
                        default:
                            return;
                    }
                }}
            />
            {value.length >= 1 && filteredSuggestions.length > 0 && isFocus &&
                <List>
                    {filteredSuggestions.map((article, index) => {
                        if (index <= 6 && selectedSuggestionIndex <= 7 && selectedSuggestionIndex >= -2) {
                            const isSelected = selectedSuggestionIndex  - index;
                            if (selectedSuggestionIndex === (filteredSuggestions.length + 1)) {
                                setSelectedSuggestionIndex(selectedSuggestionIndex - (filteredSuggestions.length + 1));
                            } else if ((selectedSuggestionIndex === -2)) {
                                setSelectedSuggestionIndex(selectedSuggestionIndex + (filteredSuggestions.length + 1));
                            }
                            return (
                                <div key={index}>
                                    <Suggestion
                                        style={{
                                            background: isSelected? "transparent":"hsla(50deg, 100%, 80%, 0.50",
                                        }}
                                        onMouseEnter={()=>{
                                            setSelectedSuggestionIndex(index);
                                        }}
                                        onKeyDown={(ev) => {
                                            if (ev.key === "Enter") {
                                                handleSelect(article?.id)
                                            }
                                        }}
                                        onClick={(ev) => {
                                            ev.preventDefault();
                                            setIsFocus(true);
                                            if (value.length >= 1 && filteredSuggestions.length > 0) {
                                                handleSelect(filteredSuggestions[selectedSuggestionIndex]?.id)
                                            }
                                        }}
                                    >
                                        <span style={{fontStyle: "bold"}}>
                                            {article?.title.slice(0, value.length)}
                                            <Prediction>
                                                {article?.title.slice(value.length, article?.title.length)}
                                            </Prediction>
                                        </span>
                                    </Suggestion>
                                </div>
                            )
                        }
                    })}
                </List>
            }
            {value.length >= 1 && filteredSuggestions.length === 0 && isFocus &&
                <List>
                    <Suggestion>No results</Suggestion>
                </List>
            }
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px 0;
    width: 100%;
`;

const Input = styled.input`
    width: 100%;
    height: 35px;
    font-size: 18px;
    padding: 0 5px;
`;

const List = styled.ul`
    z-index: 999;
    width: 460px;
    border: 1px solid white;
    border-radius: 5px;
    box-shadow: 0 3px 6px 0 lightgrey;
    background-color: white;
    position: absolute;
    margin-top: 50px;
    list-style: none;

    @media (max-width: 600px) {
        width: 80%;
    }
`;

const Suggestion = styled.li`
    padding: 10px;
    margin-left: -40px;
    line-height: 23px;
    font-size: 18px;


    :hover {
        cursor: pointer;
    }
`;

const Prediction = styled.span`
    font-weight: bold;
`;

export default Searchbar;