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

                <Container style={{marginRight: "120px"}}>
                    <Title>FEATURED ARTICLES</Title>
                    {allArticles.map((article, index) => {
                        return (
                            <div key={index}>
                            {article.featured
                                && <Item
                                    onClick={ () => {
                                        window.scrollTo(0, 0);
                                        navigate(`articles/id/${article.id}`);
                                    }}
                                >
                                    {article.title}
                                </Item>
                            }
                            </div>
                        )
                    })}
                </Container>

                <Container>
                    <Title>CONTINENTS</Title>
                    {continents.map((continent, index) => {
                        return (
                            <div key={index}>
                                <Item
                                    onClick={ () => {
                                        window.scrollTo(0, 0);
                                        navigate(`articles?continent=${continent}`);
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
                                        window.scrollTo(0, 0);
                                        navigate(`/articles?region=${region}`);
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
                                    window.scrollTo(0, 0);
                                    navigate(`/articles/id/${article.id}`)
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
    justify-content: space-between;
    background-color: #050a30;
    width: 100vw;
    bottom: 0;

    @media (max-width: 757px) {
        height: 550px;
    }

    @media (max-width: 525px) {
        height: 650px;
    }

    @media (max-width: 393px) {
        height: 750px;
    }

    @media (max-width: 359px) {
        height: 950px;
    }
`;

const ListsWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 30px;

    @media (max-width: 775px) {
        flex-wrap: wrap;
    }
`;

const Container = styled.div`
    color: white;
    font-size: 16px;
    width: 20%;

    @media (max-width: 600px) {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;

const Title = styled.h3`
    font-weight: 700;
    font-size: 22px;
    margin-top: 40px;
`;

const Item = styled.p`
    font-size: 16px;
    margin-bottom: -5px;

    :hover {
        cursor: pointer;
    }
`;

const Copyright = styled.p`
    color: white;
    text-align: center;
    margin-bottom: 30px;
`;

export default Footer;