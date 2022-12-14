import styled from "styled-components";
import { Context } from "../../Context";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Favourites = () => {

    const [favouriteData, setFavouriteData] = useState([]);

    const { user } = useAuth0();

    const { setIsLoading } = useContext(Context);

    const navigate = useNavigate();

    // fetches favourite data
    useEffect(() => {
        if (user) {
        fetch(`/api/favourites/${user.email}`)
            .then((res) => res.json())
            .then((data) => {
                setFavouriteData(data.data);
            })
        }
    },[user]);

    return (
        <Wrapper>
            <Title>Favourites</Title>
            {favouriteData.length > 0
                ? <ListContainer>
                        {favouriteData?.map((item, index) => {
                            return (
                                <ItemWrapper key={index}>
                                    <Image
                                        src={item?.article?.coverImgSrc?.imgSrc}
                                        onClick={() => {
                                            setIsLoading(true);
                                            navigate(`/articles/id/${item?.article?.id}`);
                                            window.scrollTo(0,0);
                                        }}
                                    />
                                        <ItemTextDiv>
                                            <ItemTitle
                                                onClick={() => {
                                                    setIsLoading(true);
                                                    navigate(`/articles/id/${item?.article?.id}`);
                                                    window.scrollTo(0,0);
                                                }}
                                            >
                                                {item?.article?.title}
                                            </ItemTitle>
                                            <ItemDate>{item?.article?.date}</ItemDate>
                                            {item?.article?.paragraphs?.[0]?.text
                                                ? <ItemParagraph>{item?.article?.paragraphs?.[0]?.text}</ItemParagraph>
                                                : <ItemParagraph>{item?.article?.coverImgSrc?.imgCaption}</ItemParagraph>
                                            }
                                        </ItemTextDiv>
                                </ItemWrapper>
                            )
                        })}
                    </ListContainer>
                    : <NoFavourites>
                        <p>You haven't added any articles to Favourites yet.</p>
                    </NoFavourites>
                }
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-left: 50px;

    @media (max-width: 800px) {
        margin-left: 0;
    }
`;

const Title = styled.h1`
    border-bottom: 1px solid lightgrey;
    width: 80%;
    text-align: center;
    padding-bottom: 30px;
`;

const ListContainer = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;

    @media (max-width: 1200px) {
        width: 700px;
    }

    @media (max-width: 1100px) {
        width: 600px;
    }

    @media (max-width: 1000px) {
        width: 500px;
    }

    @media (max-width: 900px) {
        width: 90%;
    }
`;

const ItemWrapper = styled.div`
    width: 100%;
    padding: 10px;
    padding-bottom: 50px;
    margin-bottom: 30px;
    border: 1px solid white;
    display: flex;
    align-items: flex-start;
    border-bottom: 1px dotted lightgrey;

    @media (max-width: 800px) {
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

    @media (max-width: 800px) {
        margin-left: 0;
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

    @media (max-width: 800px) {
        text-align: center;
    }
`;

const ItemDate = styled.p`
    color: grey;
    font-size: 14px;
    margin-bottom: -5px;

    @media (max-width: 800px) {
        text-align: center;
    }
`;

const ItemParagraph = styled.p`
    font-size: 14px;
    text-align: justify;

    @media (max-width: 800px) {
        text-align: center;
    }
`;

const NoFavourites = styled.div`
    height: 42vh;

    @media (max-width: 800px) {
        text-align: center;
    }
`;

export default Favourites;