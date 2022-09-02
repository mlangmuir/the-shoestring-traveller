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

    const { displayFilters, setDisplayFilters } = useContext(Context);

    // const [allFilters, setAllFilters] = useState([]);

    // applied filters button displays all filters based on 4 categories
    const handleApplyFilters = () => {
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

    console.log(displayFilters)

    return (
        <FilterBox>
            <FilterTitle>Filters</FilterTitle>

            <FilterBy>Continents</FilterBy>
            {continents.map((item, index) => {
                return (
                    <div key={index}>
                        <Input
                        onChange={(e) => {
                            if (e.target.checked && !continent.includes(item)) {
                                setContinent([...continent, item]);
                                setDisplayFilters([...displayFilters, item]);
                            } else if(!e.target.checked && continent.includes(item)) {
                                setContinent(continent.filter(val => val !== item));
                                setDisplayFilters(displayFilters.filter(val => val !== item));
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

            <FilterBy>Regions</FilterBy>
            {regions.map((item, index) => {
                return (
                    <div key={index}>
                        <Input
                            onChange={(e) => {
                                if (e.target.checked && !region.includes(item)) {
                                    setRegion([...region, item]);
                                    setDisplayFilters([...displayFilters, item]);
                                } else if(!e.target.checked && region.includes(item)) {
                                    setRegion(region.filter(val => val !== item));
                                    setDisplayFilters(displayFilters.filter(val => val !== item));
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

            <FilterBy>Countries</FilterBy>
            {countries.map((item, index) => {
                return (
                    <div key={index}>
                        <Input
                            onChange={(e) => {
                                if (e.target.checked && !country.includes(item)) {
                                    setCountry([...country, item]);
                                    setDisplayFilters([...displayFilters, item]);     
                                } else if(!e.target.checked && country.includes(item)) {
                                    setCountry(country.filter(val => val !== item));
                                    setDisplayFilters(displayFilters.filter(val => val !== item));
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

            <FilterBy>Article Type</FilterBy>
            {articleTypes.map((item, index) => {
                return (
                    <div key={index}>
                        <Input
                            onChange={(e) => {
                                if (e.target.checked && !articleType.includes(item)) {
                                    setArticleType([...articleType, item]);
                                    setDisplayFilters([...displayFilters, item]);    
                                } else if(!e.target.checked && articleType.includes(item)) {
                                    setArticleType(articleType.filter(val => val !== item));
                                    setDisplayFilters(displayFilters.filter(val => val !== item));
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

            <Button onClick={handleApplyFilters}>
                Apply filters
            </Button>
        </FilterBox>
    )
}

const FilterBox = styled.div`
    border: 1px solid lightgrey;
    width: 280px;
    padding: 25px;

    @media (max-width: 950px) {
        margin-bottom: 50px;
        width: 65%;
    }
`;

const FilterTitle = styled.h2`
    border-bottom: 1px solid lightgrey;
    padding-bottom: 10px;
    font-weight: 700;
`;

const FilterBy = styled.h3`
    border-bottom: 1px solid lightgrey;
    padding-bottom: 10px;
    margin-top: 40px;
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