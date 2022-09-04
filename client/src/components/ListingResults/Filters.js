import styled from "styled-components";
import { useContext, useEffect } from "react";
import { Context } from "../../Context";

const Filters = ({
    doSearch,
    filtersLabel,
    page,
    continent,
    setContinent,
    region,
    setRegion,
    country,
    setCountry,
    articleType,
    setArticleType,
    continents,
    regions,
    countries,
    articleTypes
}) => {

    console.log(continent)

    const { allFilters, setAllFilters } = useContext(Context);

    // applied filters button displays all filters based on 4 categories
    const handleApplyFilters = (e) => {
        e.preventDefault();
        page = 1
        doSearch({ continent, region, country, articleType, page });
        window.scrollTo(0,0);
    }

    // resets the filter checkboxes everytime a search is in the search bar
    // useEffect(() => {
    //     if (displayValue) {
    //         setCategory([]);
    //         setBodyLocation([]);
    //         setPrice([]);
    //         setNumInStock("0");
    //     }
    // },[])

    useEffect(() => {
        setContinent([]);
        setAllFilters([]);
    },[])
    

    console.log(allFilters)

    return (
        <FilterBox>
            <FilterTitle>Filters</FilterTitle>
            <FilterDiv>
                <FilterBy>Continents</FilterBy>
                {continents.map((item, index) => {
                    return (
                        <div key={index}>
                            <Input
                            onChange={(e) => {
                                if (e.target.checked && !continent.includes(item)) {
                                    setContinent([...continent, item]);
                                    // setAllFilters([...allFilters, item]);
                                } else if(!e.target.checked && continent.includes(item)) {
                                    setContinent(continent.filter(val => val !== item));
                                    // setAllFilters(allFilters.filter(val => val !== item));
                                }
                            }}
                            checked={continent.includes(item)}
                            type="checkbox"
                            id={item}
                        />
                            <Label htmlFor={item}>{item}</Label>
                        </div>
                    )
                })}
            </FilterDiv>

            <FilterDiv>
                <FilterBy>Regions</FilterBy>
                {regions.map((item, index) => {
                    return (
                        <div key={index}>
                            <Input
                                onChange={(e) => {
                                    if (e.target.checked && !region.includes(item)) {
                                        setRegion([...region, item]);
                                        // setAllFilters([...allFilters, item]);
                                    } else if(!e.target.checked && region.includes(item)) {
                                        setRegion(region.filter(val => val !== item));
                                        // setAllFilters(allFilters.filter(val => val !== item));
                                    }
                                }}
                                checked={region.includes(item)}
                                type="checkbox"
                                id={item}
                            />
                            <Label htmlFor={item}>{item}</Label>
                        </div>
                    )
                })}
            </FilterDiv>
            
            <FilterDiv>
                <FilterBy>Countries</FilterBy>
                {countries.map((item, index) => {
                    return (
                        <div key={index}>
                            <Input
                                onChange={(e) => {
                                    if (e.target.checked && !country.includes(item)) {
                                        setCountry([...country, item]);
                                        // setAllFilters([...allFilters, item]);     
                                    } else if(!e.target.checked && country.includes(item)) {
                                        setCountry(country.filter(val => val !== item));
                                        // setAllFilters(allFilters.filter(val => val !== item));
                                    }
                                }}
                                checked={country.includes(item)}
                                type="checkbox"
                                id={item}
                            />
                            <Label htmlFor={item}>{item}</Label>
                        </div>
                    )
                })}
            </FilterDiv>

            <FilterDiv>
                <FilterBy>Article Type</FilterBy>
                {articleTypes.map((item, index) => {
                    return (
                        <div key={index}>
                            <Input
                                onChange={(e) => {
                                    if (e.target.checked && !articleType.includes(item)) {
                                        setArticleType([...articleType, item]);
                                        // setAllFilters([...allFilters, item]);    
                                    } else if(!e.target.checked && articleType.includes(item)) {
                                        setArticleType(articleType.filter(val => val !== item));
                                        // setAllFilters(allFilters.filter(val => val !== item));
                                    }
                                }}
                                checked={articleType.includes(item)}
                                type="checkbox"
                                id={item}
                            />
                            <Label htmlFor={item}>{item}</Label>
                        </div>
                    )
                })}
            </FilterDiv>

            <Button onClick={handleApplyFilters}>
                Apply filters
            </Button>
        </FilterBox>
    )
}

const FilterBox = styled.div`
    width: 180px;
    padding: 0 25px;
    border: 1px solid lightgrey;

    /* @media (max-width: 950px) {
        margin-bottom: 50px;
        width: 65%;
    } */
`;

const FilterDiv = styled.div`
    margin-bottom: 40px;
`;

const FilterTitle = styled.h2`
    border-bottom: 1px solid lightgrey;
    padding-bottom: 10px;
    font-weight: 700;
    margin-bottom: 40px;
`;

const FilterBy = styled.h3`
    border-bottom: 1px solid lightgrey;
    padding-bottom: 10px;
    font-weight: 700;
`;

const Label = styled.label`
    margin-left: 7px;
    
    :hover {
        cursor: pointer;
    }
`;

const Input = styled.input`
    margin-top: 10px;

    :hover {
        cursor: pointer;
    }
`;

const Button = styled.button`
    font-size: 18px;
    color: white;
    background-color: #050a30;
    width: 100%;
    margin-top: 25px;
    border: none;
    border-radius: 5px;
    height: 30px;

    :hover {
        cursor: pointer;
    }
`;

export default Filters;