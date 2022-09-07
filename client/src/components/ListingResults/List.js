import { useNavigate } from "react-router-dom"
import { useContext } from "react";
import { Context } from "../../Context";
import styled from "styled-components";
// import noResults from "../../assets/no-result.gif";

const List = ({ results }) => {

    const navigate = useNavigate();

    const { setIsLoading } = useContext(Context);

    return (
        <div>
        {/* {results.length === 0 */}
            {/* ? <NoResultsWrapper> */}
                {/* <NoResults>
                    <Gif src={noResults} alt="Sorry! No result found..." />
                    <NoResultsText>Sorry, we couldn't find what you were looking for...</NoResultsText>
                </NoResults> */}
            {/* </NoResultsWrapper> */}
            <>
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
                </ListContainer>
            </>
            {/* } */}
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
    }
`;

// const NoResultsWrapper = styled.div`
//     width: 825px;
//     display: grid;
//     justify-content: center;
//     margin-left: 30px;

//     @media (max-width: 1200px) {
//         width: 600px;
//     }

//     @media (max-width: 1100px) {
//         width: 500px;
//     }

//     @media (max-width: 900px) {
//         width: 350px;
//     }

// `;

const NoResults = styled.div`
    width: 100%;

    @media (max-width: 500px) {
        width: 80%;
    }
`;

// const Gif = styled.img`
//     height: 420px;

//     @media (max-width: 900px) {
//         height: 300px;
//     }

//     @media (max-width: 500px) {
//         height: 220px;
//     }
// `;

// const NoResultsText = styled.p`
//     text-align: center;
//     font-size: 24px;

//     @media (max-width: 900px) {
//         font-size: 20px;
//     }
// `;

export default List;