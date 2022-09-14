import styled from "styled-components";
import { useState } from "react";
import PageChanger from "./PageChanger";

const Filters = ({
    doSearch,
    page,
    pageCount,
    itemCount,
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

    const [localContinent, setLocalContinent] = useState(continent);
    const [localRegion, setLocalRegion] = useState(region);
    const [localCountry, setLocalCountry] = useState(country);
    const [localArticleType, setLocalArticleType] = useState(articleType);

    // applied filters button displays all filters based on 4 categories
    const handleApplyFilters = (e) => {
        
        e.preventDefault();

        setContinent(localContinent);
        setRegion(localRegion);
        setCountry(localCountry);
        setArticleType(localArticleType);

        page = 1

        doSearch({ continent: localContinent, region: localRegion, country: localCountry, articleType: localArticleType, page });

        window.scrollTo(0,0);
    }
    
    return (
        <>
            <FilterBox>
                <FilterTitle>Filters</FilterTitle>
                <FilterDiv>
                    <FilterBy>Continents</FilterBy>
                    {continents.map((item, index) => {
                        return (
                            <div key={index}>
                                <Input
                                onChange={(e) => {
                                    if (e.target.checked && !localContinent.includes(item)) {
                                        setLocalContinent([...localContinent, item]);
                                    } else if(!e.target.checked && localContinent.includes(item)) {
                                        setLocalContinent(localContinent.filter(val => val !== item));
                                    }
                                }}
                                checked={localContinent.includes(item)}
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
                                        if (e.target.checked && !localRegion.includes(item)) {
                                            setLocalRegion([...localRegion, item]);
                                        } else if(!e.target.checked && localRegion.includes(item)) {
                                            setLocalRegion(localRegion.filter(val => val !== item));
                                        }
                                    }}
                                    checked={localRegion.includes(item)}
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
                                        if (e.target.checked && !localCountry.includes(item)) {
                                            setLocalCountry([...localCountry, item]);
                                        } else if(!e.target.checked && localCountry.includes(item)) {
                                            setLocalCountry(localCountry.filter(val => val !== item));
                                        }
                                    }}
                                    checked={localCountry.includes(item)}
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
                                        if (e.target.checked && !localArticleType.includes(item)) {
                                            setLocalArticleType([...localArticleType, item]);
                                        } else if(!e.target.checked && localArticleType.includes(item)) {
                                            setLocalArticleType(localArticleType.filter(val => val !== item));
                                        }
                                    }}
                                    checked={localArticleType.includes(item)}
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
            <PageChangerDiv>
                <PageChanger page={page} pageCount={pageCount} itemCount={itemCount} doSearch={doSearch}/>
            </PageChangerDiv>
        </>
    )
}

const FilterBox = styled.div`
    width: 180px;
    padding: 0 25px;
    border: 1px solid lightgrey;
    max-height: 1250px;

    @media (max-width: 1100px) {
        margin-bottom: 50px;
        width: 65%;
    }
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
    margin-bottom: 25px;

    :hover {
        cursor: pointer;
    }
`;

const PageChangerDiv = styled.div`
    display: none;
    width: 100%;

    @media (max-width: 1100px) {
        display: flex;
        justify-content: center;
    }
`;

export default Filters;