import capeTownBanner from "../assets/cape-town-banner.JPG";
import styled from "styled-components";
import Searchbar from "./Searchbar";
import { useContext } from "react";
import { Context } from "../Context";
import { useNavigate } from "react-router-dom";
import LoadingPage from "./LoadingPage";
import aboutMePoster from "../assets/about-me-poster.png";
import signUpPoster from "../assets/sign-up-poster.png";
import discoverChobePoster from "../assets/discover-chobe.png";
import tipsPoster from "../assets/tips-poster.png";

const Home = () => {

    const { allArticles, isLoading } = useContext(Context);

    const navigate = useNavigate();

    return (
        <>
            {!isLoading ?
            <>
                <BannerWrapper>
                    <BannerTextDiv>
                        <BannerTitle>Your guide to planning your dream adventure on a budget!</BannerTitle>
                        <BannerText>Discover your dream destination:</BannerText>
                        <Searchbar/>
                    </BannerTextDiv>
                    <CoverShade />
                    <Banner src={capeTownBanner} alt="View of Cape Town from the top of Lion's Head"/>
                </BannerWrapper>
                <Container>
                    <FeaturedWrapper>
                        <FeaturedTitle>Featured from the Blog</FeaturedTitle>
                            <FeaturedGrid>
                                {allArticles.map((article, index) => {
                                    return (
                                        <div key={index}>
                                            {article.featured &&
                                                <FeaturedItem
                                                    onClick={ () => {
                                                        navigate(`/articles/id/${article.id}`);
                                                        window.scrollTo(0,0);
                                                    }}
                                                >
                                                    <FeaturedPhoto src={article.coverImgSrc.imgSrc} />
                                                    <FeaturedCaption>{article.title}</FeaturedCaption>
                                                </FeaturedItem>
                                            }
                                        </div>
                                    )
                                })}
                            </FeaturedGrid>
                    </FeaturedWrapper>
                    <PostersWrapper>
                        <Poster src={aboutMePoster} />
                        <Poster src={signUpPoster} />
                        <Poster src = {tipsPoster} />
                    </PostersWrapper>
                </Container>
            </>
            : <LoadingPage />
            }
        </>
    )
}

const BannerWrapper = styled.div`
    display: flex;
    align-items: center;
    height: 625px;

    @media (max-width: 850px) {
        justify-content: center;
        width: 100%;
    }
`;

const BannerTextDiv = styled.div`
    z-index: 3;
    display: flex;
    flex-direction: column;
    position: absolute;
    margin-left: 15%;
    margin-bottom: 75px;
    width: 500px;

    @media (max-width: 850px) {
        width: 80%;
        margin-left: 0;
    }
`;

const BannerTitle = styled.p`
    color: white;
    z-index: 3;
    width: 600px;
    font-size: 48px;
    font-weight: 700;

    @media (max-width: 850px) {
        width: 80%;
        font-size: 42px;
    }

    @media (max-width: 450px) {
        width: 95%;
        font-size: 36px;
    }
`;

const BannerText = styled.p`
    color: white;
    z-index: 3;
    width: 600px;
    font-size: 24px;
    font-weight: 400;
    margin-top: -20px;
    margin-bottom: -10px;

    @media (max-width: 850px) {
        width: 80%;
        margin: 0;
    }
`;

const CoverShade = styled.div`
    z-index: 2;
    position: absolute;
    width: 100%;
    object-fit: cover;
    background-color: black;
    opacity: 30%;
    height: 625px;
`;

const Banner = styled.img`
    width: 100%;
    height: 625px;
    object-fit: cover;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const FeaturedWrapper = styled.div`
    margin-top: 50px;
    width: 75%;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: 1550px) {
        width: 80%;
    }

    @media (max-width: 850px) {
        width: 90%;
    }
`;

const FeaturedTitle = styled.h2`
    font-size: 32px;
    text-align: center;

    @media (max-width: 850px) {
        font-size: 28px;
    }
`;

const FeaturedGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const FeaturedItem = styled.div`
    padding: 27px;
    width: 330px;

    :hover {
        cursor: pointer;
    }

    @media (max-width: 850px) {
        padding: 20px 12px;
    }
`;

const FeaturedPhoto = styled.img`
    height: 210px;
    width: 330px;
`;

const FeaturedCaption = styled.p`
    text-align: center;
    font-weight: bold;
`;

const PostersWrapper = styled.div`
    margin: 100px 0;
    width: 80%;
    display: flex;
    justify-content: space-evenly;

    @media (max-width: 1400px) {
        width: 100%;
    }

    @media (max-width: 1100px) {
        flex-direction: column;
        align-items: center;
    }
`;

const Poster = styled.img`
    height: 400px;

    @media (max-width: 1100px) {
        margin-bottom: 50px;
    }
`;

export default Home;