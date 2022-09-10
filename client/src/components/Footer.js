import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useContext } from "react";
import { Context } from "../Context";

const Footer = () => {

    const navigate = useNavigate();

    const { allArticles } = useContext(Context);

    // Create array for continent list in footer
    const continents = []
    allArticles.map((article) => {
        if (!continents.includes(article.continent)) {
            continents.push(article.continent)
        }
    })

    const regions = []
    allArticles.map((article) => {
        if (!regions.includes(article.region)) {
            regions.push(article.region)
        }
    }) 

    return (
        <Wrapper>
            <ListsWrapper>

                <FeaturedContainer>
                    <Title>FEATURED ARTICLES</Title>
                    {allArticles.map((article, index) => {
                        return (
                            <div key={index}>
                            {article.featured
                                && <Item
                                    onClick={ () => {
                                        navigate(`articles/id/${article.id}`);
                                        window.scrollTo(0, 0);
                                    }}
                                >
                                    {article.title}
                                </Item>
                            }
                            </div>
                        )
                    })}
                </FeaturedContainer>

                <Container>
                    <Title>CONTINENTS</Title>
                    {continents.map((continent, index) => {
                        return (
                            <div key={index}>
                                <Item
                                    onClick={ () => {
                                        navigate(`/articles?continent=${continent}`);
                                        window.scrollTo(0, 0);
                                    }}
                                >
                                    {continent}
                                </Item>
                            </div>
                        )
                    })}
                </Container>

                <Container>
                    <Title>REGIONS</Title>
                    {regions.map((region, index) => {
                        return (
                            <div key={index}>
                                <Item
                                    onClick={ () => {
                                        navigate(`/articles?region=${region}`);
                                        window.scrollTo(0, 0);
                                    }}
                                >
                                    {region}
                                </Item>
                            </div>
                        )
                    })}
                </Container>
                
                <Container>
                    <Title>TRAVEL TIPS</Title>
                    {allArticles.map((article, index) => {
                        return (
                            <div key={index}>
                                {article.articleType === "Travel Tips"
                            && <Item
                                onClick={ () => {
                                    navigate(`/articles/id/${article.id}`);
                                    window.scrollTo(0, 0);
                                }}
                            >
                                {article.title}
                            </Item>
                    }
                            </div>
                        )
                    })}
                </Container>

            </ListsWrapper>
            <Copyright>© 2022 The Shoestring Traveller. All rights reserved.</Copyright>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #050a30;
    width: 100vw;
    bottom: 0;
`;

const ListsWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    margin-bottom: 30px;
    width: 75%;

    @media (max-width: 1450px) {
        width: 95%;
    }

    @media (max-width: 950px) {
        flex-wrap: wrap;
    }

    @media (max-width: 450px) {
        flex-wrap: nowrap;
        flex-direction: column;
        align-items: center;
    }
`;

const FeaturedContainer = styled.div`
    margin-right: 120px;
    margin-left: 30px;
    color: white;
    width: 520px;

    @media (max-width: 1100px) {
        width: 25%;
    }

    @media (max-width: 950px) {
        width: 40%;
        margin-bottom: 30px;
    }

    @media (max-width: 750px) {
        width: 35%;
        margin-left: 0;
        margin-right: 0;
    }

    @media (max-width: 450px) {
        width: 80%;
        text-align: center;
        margin-bottom: 5px;
    }
`;

const Container = styled.div`
    color: white;
    font-size: 16px;
    width: 35%;

    @media (max-width: 950px) {
        width: 40%;
    }

    @media (max-width: 750px) {
        width: 35%;
    }

    @media (max-width: 450px) {
        width: 80%;
        text-align: center;
        margin-bottom: 5px;
    }
`;

const Title = styled.h3`
    font-weight: 700;
    font-size: 22px;
    margin-top: 40px;

    @media (max-width: 450px) {
        font-size: 20px;
        margin-bottom: -5px;
    }
`;

const Item = styled.p`
    font-size: 16px;
    margin-bottom: -5px;

    :hover {
        cursor: pointer;
    }

    @media (max-width: 450px) {
        line-height: 17px;
    }
`;

const Copyright = styled.p`
    color: white;
    text-align: center;
    margin-bottom: 30px;

    @media (max-width: 450px) {
        font-size: 12px;
    }
`;

export default Footer;