import { useNavigate } from "react-router-dom"
import { useContext } from "react";
import { Context } from "../../Context";
import styled from "styled-components";
import PageChanger from "./PageChanger";
import noResults from "../../assets/no-result.gif";

const List = ({ results, page, pageCount, itemCount, doSearch }) => {

    const navigate = useNavigate();

    const { setIsLoading } = useContext(Context);

    return (
        <div>
        {results.length === 0
            ? <NoResultsWrapper>
                <NoResults>
                    <Gif src={noResults} alt="Sorry! No result found..." />
                    <NoResultsText>Sorry, we couldn't find what you were looking for...</NoResultsText>
                </NoResults>
            </NoResultsWrapper>
            : <>
                <ListContainer>
                    {results?.map((item, index) => {
                        return (
                            <ItemWrapper key={index}>
                                <Image
                                    src={item?.coverImgSrc?.imgSrc}
                                    onClick={() => {
                                        setIsLoading(true);
                                        navigate(`/articles/id/${item.id}`);
                                        window.scrollTo(0,0);
                                    }}
                                />
                                    <ItemTextDiv>
                                        <ItemTitle
                                            onClick={() => {
                                                setIsLoading(true);
                                                navigate(`/articles/id/${item.id}`);
                                                window.scrollTo(0,0);
                                            }}
                                        >
                                            {item?.title}
                                        </ItemTitle>
                                        <ItemDate>{item?.date}</ItemDate>
                                        {item?.paragraphs?.[0]?.text
                                            ? <ItemParagraph>{item?.paragraphs?.[0]?.text}</ItemParagraph>
                                            : <ItemParagraph>{item?.coverImgSrc?.imgCaption}</ItemParagraph>
                                        }
                                    </ItemTextDiv>
                            </ItemWrapper>
                        )
                    })}
                    <PageChangerDiv>
                        <PageChanger page={page} pageCount={pageCount} itemCount={itemCount} doSearch={doSearch}/>
                    </PageChangerDiv>
                </ListContainer>
            </>
        }
        </div>
    )
}

const ListContainer = styled.div`
    width: 850px;
    display: flex;
    flex-direction: column;
    margin-right: 100px;
    margin-left: -40px;

    @media (max-width: 1200px) {
        width: 700px;
    }

    @media (max-width: 900px) {
        width: 100%;
    }
`;

const ItemWrapper = styled.div`
    width: 100%;
    padding: 10px;
    padding-bottom: 50px;
    margin-bottom: 30px;
    margin-left: 30px;
    border: 1px solid white;
    display: flex;
    align-items: flex-start;
    border-bottom: 1px dotted lightgrey;

    @media (max-width: 600px) {
        flex-direction: column;
        align-items: center;
        padding: 0;
    }
`;

const Image = styled.img`
    height: 150px;
    min-width: 225px;
    object-fit: cover;
    object-position: 0 -8px;

    :hover {
        cursor: pointer;
    }
`;

const ItemTextDiv = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 25px;

    @media (max-width: 600px) {
        margin: 0;
        align-items: center;
    }
`;

const ItemTitle = styled.h1`
    font-size: 22px;
    margin-bottom: -10px;
    margin-top: -5px;

    :hover {
        cursor: pointer;
        color: #0000EE;
    }

    @media (max-width: 600px) {
        text-align: center;
        margin-top: 15px;
        font-size: 18px;
        width: 80%;
    }
`;

const ItemDate = styled.p`
    color: grey;
    font-size: 14px;
    margin-bottom: -5px;

    @media (max-width: 600px) {
        text-align: center;
        margin-bottom: 0;
        margin-top: 15px;
    }
`;

const ItemParagraph = styled.p`
    font-size: 14px;
    text-align: justify;

    @media (max-width: 600px) {
        text-align: center;
        margin-top: 15px;
        width: 80%;
    }
`;

const NoResultsWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const NoResults = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Gif = styled.img`

    @media (max-width: 1100px) {
        width: 500px;
    }

    @media (max-width: 900px) {
        width: 300px;
    }
`;

const NoResultsText = styled.p`
    text-align: center;
    font-size: 24px;
    margin-bottom: 60px;

    @media (max-width: 900px) {
        font-size: 20px;
    }
`;

const PageChangerDiv = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;

    @media (max-width: 1100px) {
        display: none;
    }
`;

export default List;