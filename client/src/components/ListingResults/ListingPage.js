import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useContext, useCallback } from "react";
import styled from "styled-components";
import { Context } from "../../Context";
import LoadingPage from "../LoadingPage";
import Filters from "./Filters";
import Grid from "./Grid";

const ListingPage = () => {

    const { isLoading, setIsLoading, displayFilters, continents, setContinents, regions, setRegions, countries, setCountries, articleTypes, setArticleTypes } = useContext(Context);

    const [results, setResults] = useState([]);
    const [page, setPage] = useState(0);
    const [itemCount, setItemCount] = useState(0);
    const [pageCount, setPageCount] = useState(0);

    const navigate = useNavigate();

    // defining URLSearchParams based on sorting type and direction and 4 different filtering methods
    const search = useLocation().search;
    const title = new URLSearchParams(search).get("title") || "";
    const sortKey = new URLSearchParams(search).get("sortKey") || "title";
    const sortDirection = new URLSearchParams(search).get("sortDirection") || '1';
    const sortSelected = `${sortKey}|${sortDirection}`;

    const [continent, setContinent] = useState(new URLSearchParams(search).get("continent") || []);
    const [region, setRegion] = useState(new URLSearchParams(search).getAll("region") || []);
    const [country, setCountry] = useState(new URLSearchParams(search).getAll("country") || []);
    const [articleType, setArticleType] = useState(new URLSearchParams(search).getAll("articleType") || []);

    // callback that overwrites query params
    const getQueryParams = useCallback((overwrites={})=>{
        const {
            sortKey = null,
            sortDirection = null,
            continent = null,
            region = null,
            country = null,
            articleType = null,
            title = null,
            page = null
        } = overwrites;
        
        const searchParams = new URLSearchParams(search);

        // default values for query params
        const params = [
            { key: 'title', value: title || searchParams.get("title") || ""},
            { key: 'sortKey', value: sortKey || searchParams.get("sortKey") || "title"},
            { key: 'sortDirection', value: sortDirection || searchParams.get("sortDirection") || '1'},
            { key: 'continent', value: continent || searchParams.get("continent") || []},
            { key: 'region', value: region || searchParams.getAll("region") || []},
            { key: 'country', value: country || searchParams.getAll("country") || []},
            { key: 'articleType', value: articleType || searchParams.getAll("articleType") || []},
            { key: 'page', value: page || searchParams.get("page") || '1'}
        ]

        // takes params array and modifies it into a param-friendly string
        const paramsStr = params.map(entry=>{
            if (Array.isArray(entry.value)) {
                return entry.value.map(item=>`${entry.key}=${item}`).join('&');
            }
            return `${entry.key}=${entry.value}`;
        })
        .filter(str => !!str)
        .join('&');
        return paramsStr;
    },[search])

    console.log(displayFilters)

    // fetches data necessary for filtering based on the search URL params defined above
    useEffect(() => {
        setIsLoading(true);
        fetch(`/api/articles?${search.substring(1)}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setResults(data.data)
                setItemCount(data.itemCount);
                setPageCount(data.pageCount);
                setPage(data.page);
                setContinents(data.continents);
                setRegions(data.regions);
                setCountries(data.countries);
                setArticleTypes(data.articleTypes);
                setIsLoading(false);
            })
    },[sortKey, setIsLoading, search]);

    console.log(results)

    // on select of dropdown sort menu, the value is split into sortName and sortDirection to be used as params
    const handleOnChange = (e) => {
        const [sortKey, sortDirection] = e.target.value.split('|');
        doSearch({sortKey,sortDirection});
        window.scrollTo(0, 0);
    }

    // function overwrites existing query params on callback
    const doSearch = (overwrites={})=>{
        const search = getQueryParams(overwrites);
        navigate(`/articles?${search}`);
    }

    // concatenating all filter arrays/variables to display all applied filters at top of page
    const filtersLabel = continent.concat(region, country, articleType)

    // dividing total item count by items per page to get total # of pages
    const totalPages = Math.ceil(itemCount / 15);

    return (
        <>
            {!isLoading
                ? <Wrapper>
                    <Container>
                        <TitleTextDiv>
                            <div>
                                <ShowResultsFor>Showing results for: </ShowResultsFor>
                                {/* {displayValue
                                    ? <FiltersAppliedDiv>
                                        <div>
                                            <FiltersApplied>{displayValue}</FiltersApplied>
                                        </div> */}
                                    {/* </FiltersAppliedDiv> */}
                                    <FiltersAppliedDiv>
                                        {displayFilters.map((item, index) => {
                                            return (
                                                <div key={index}>
                                                    {index === 4
                                                        ? <FiltersApplied>{item}...</FiltersApplied>
                                                        : <FiltersApplied>{item}</FiltersApplied>
                                                    }
                                                    {index !== displayFilters.length - 1 && index !== 4
                                                        && <FiltersApplied>,&nbsp;</FiltersApplied>
                                                    }
                                                </div>
                                            )
                                        })}
                                    </FiltersAppliedDiv>
                                
                                {itemCount === 348
                                    && <FiltersAppliedDiv>
                                        <div>
                                            <FiltersApplied>All products</FiltersApplied>
                                        </div>
                                    </FiltersAppliedDiv>
                                }

                                {itemCount !== 0 && <ResultInfo>Showing {results?.length} of {itemCount} results</ResultInfo>}
                                {totalPages !== 0 && <ResultInfo>Page {page} of {totalPages}</ResultInfo>}
                            </div>
                            <SelectDiv>
                                <SelectLabel>List by:</SelectLabel>
                                <Select onChange={handleOnChange} defaultValue={sortSelected}>
                                    <option value="title|1" >Name - ascending</option>
                                    <option value="title|-1">Name - descending</option>
                                    <option value="id|1">Date Posted - oldest first</option>
                                    <option value="id|-1">Date Posted - newest first</option>
                                </Select>
                            </SelectDiv>
                        </TitleTextDiv>
                        <BodyWrapper>
                            <Filters
                                results={results}
                                doSearch={doSearch}
                                filtersLabel={filtersLabel}
                                continent={continent}
                                setContinent={setContinent}
                                region={region}
                                setRegion={setRegion}
                                country={country}
                                setCountry={setCountry}
                                articleType={articleType}
                                setArticleType={setArticleType}
                                page={page}
                                title={title}
                                continents={continents}
                                setContinents={setContinents}
                                regions={regions}
                                setRegions={setRegions}
                                setCountries={setCountries}
                                countries={countries}
                                articleTypes={articleTypes}
                                setArticleTypes={setArticleTypes}
                            />
                            <Grid
                                results={results}
                                page={page}
                                pageCount={pageCount}
                                itemCount={itemCount}
                                doSearch={doSearch}
                                continent={continent}
                                region={region}
                                country={country}
                                articleType={articleType}
                            />
                        </BodyWrapper>
                    </Container>
                </Wrapper>
                : <LoadingPage />
            }
        </>
    )
}

const Wrapper = styled.div`
    width: 100%;
    padding: 75px 0;
    display: flex;
    justify-content: center;

    @media (max-width: 1010px) {
        flex-direction: column;
        align-items: center;
    }
`;

const Container = styled.div`
    width: 1200px;

    @media (max-width: 1200px) {
        width: 90%;
    }

    @media (max-width: 800px) {
        width: 100%;
    }
`;

const TitleTextDiv = styled.div`
    margin-bottom: 50px;
    display: flex;
    justify-content: space-between;

    @media (max-width: 950px) {
        flex-direction: column;
        align-items: center;
    }
`;

const ShowResultsFor = styled.h1`
    font-size: 16px;

    @media (max-width: 950px) {
        text-align: center;
    }

    @media (max-width: 500px) {
        font-size: 14px;
    }
`;

const FiltersAppliedDiv = styled.div`
    display: flex;
    margin-top: 10px;

    @media (max-width: 950px) {
        width: 100%;
        justify-content: center;
        font-size: 20px;
    }

    @media (max-width: 500px) {
        font-size: 12px;
    }
`;

const FiltersApplied = styled.span`
    font-weight: 700;
    font-weight: 700;
    font-size: 28px;
    width: 1000px;

    @media (max-width: 1250px) {
        font-size: 20px;
    }

    @media (max-width: 1100px) {
        font-size: 18px;
    }

    @media (max-width: 600px) {
        font-size: 16px;
    }
`;

const ResultInfo = styled.p`
    font-size: 16px;
    margin-top: 15px;

    @media (max-width: 950px) {
        text-align: center;
    }
`;

const SelectDiv = styled.div`
    display: flex;
    align-items: center;

    @media (max-width: 950px) {
        margin-top: 30px;
    }
`;

const SelectLabel = styled.label`
    font-size: 20px;
    margin-right: 15px;
    font-weight: 700;
`;

const Select = styled.select`
    height: 50%;
    font-size: 18px;

    :hover {
        cursor: pointer;
    }
`;

const BodyWrapper = styled.div`
    display: flex;

    @media (max-width: 950px) {
        flex-direction: column;
        align-items: center;
    }
`;

export default ListingPage;