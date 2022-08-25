import capeTownBanner from "../assets/cape-town-banner.JPG";
import styled from "styled-components";
import Searchbar from "./Searchbar";

const Home = () => {

    return (
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
                    
                </FeaturedWrapper>
                <AboutWrapper>
                    <AboutTitle>About the Shoestring Traveller</AboutTitle>
                    <AboutText></AboutText>
                </AboutWrapper>
            </Container>
        </>
    )
}

const BannerWrapper = styled.div`
    display: flex;
    align-items: center;
    height: 625px;
`;

const BannerTextDiv = styled.div`
    z-index: 3;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    margin-left: 20%;
    margin-bottom: 75px;
`;

const BannerTitle = styled.p`
    color: white;
    z-index: 3;
    width: 600px;
    font-size: 48px;
    font-weight: 700;
`;

const BannerText = styled.p`
    color: white;
    z-index: 3;
    width: 600px;
    font-size: 24px;
    font-weight: 400;
    margin-top: -20px;
    margin-bottom: -10px;
`;

const CoverShade = styled.div`
    z-index: 2;
    position: absolute;
    width: 100vw;
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
    width: 800px;
`;

const FeaturedTitle = styled.h2`
    font-size: 32px;
    text-align: center;
`;

const AboutWrapper = styled.div`
    margin-top: 50px;
    width: 800px;
`;

const AboutTitle = styled.h2`
    font-size: 32px;
    text-align: center;
`;

const AboutText = styled.p`
`;

export default Home;