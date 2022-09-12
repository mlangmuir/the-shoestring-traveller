import styled from "styled-components";
import aboutPic from "../assets/about-pic.jpg";
import vicFalls from "../assets/vic-falls.JPG";
import boKaap from "../assets/bo-kaap-background.JPG";
import countriesVisitedMap from "../assets/countries-visited.png";
import { useNavigate } from "react-router-dom";

const About = () => {

    const navigate = useNavigate();

    const handleClickContact = () => {
        navigate("/contact");
        window.scrollTo(0,0);
    }

    return (
        <Wrapper>
            <TitleDiv>
                <TitleBox />
                <Title>Meet the Shoestring Traveller</Title>
                <TitleImage src={aboutPic} alt="Photo of the Shoestring Traveller" />
            </TitleDiv>
            <AboutDiv>
                <AboutTitle>Hello, I'm Matt!</AboutTitle>
                <Paragraph>I am a web developer and avid traveller who has travelled to 27 countries across 5 continents. I have managed to do most of my travelling on a shoestring budget and I am here to help you do the same!</Paragraph>
                <Paragraph>I love travelling because I believe it is the best way to get out of your comfort zone and try to gain an understand our our complicated but wonderful world.</Paragraph>
                <Button onClick={handleClickContact}>Contact me</Button>
            </AboutDiv>
            <QuoteDiv>
                <Quote>"Rester, c'est exister. mais voyager, c'est vivre."</Quote>
                <Author>GUSTAVE NADAUD</Author>
            </QuoteDiv>
            <PhotoDiv>
                <VicFallsImageDiv>
                    <VicFallsImage src={vicFalls} alt="The Shoestring Traveller at Victoria Falls."/>
                </VicFallsImageDiv>
                <BoKaapImageDiv>
                    <BoKaapImage src={boKaap} alt="The Shoestring Traveller in Bo Kaap, Cape Town."/>
                </BoKaapImageDiv>
            </PhotoDiv>
            <MapDiv>
                <MapTitle>Where I have been:</MapTitle>
                <Map src={countriesVisitedMap} alt="Map of countries visited by the Shoestring Traveller." />
            </MapDiv>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const TitleDiv = styled.div`
    display: flex;
    justify-content: center;
`;

const TitleBox = styled.div`
    background-color: #353f55;
    width: 40vw;
`;

const Title = styled.h1`
    z-index: 2;
    color: white;
    position: absolute;
    font-family: 'Forum', cursive;
    font-size: 100px;
    margin-top: 10%;
    margin-right: 350px;
    width: 550px;

    @media (max-width: 1150px) {
        font-size: 70px;
        margin-right: 0;
    }

    @media (max-width: 850px) {
        font-size: 56px;
        width: 300px;
        margin-right: 150px;
    }

    @media (max-width: 500px) {
        font-size: 38px;
        margin-right: 0;
        margin-top: 10%;
    }

    @media (max-width: 400px) {
        font-size: 32px;
        width: 200px;
        margin-right: 0;
        margin-top: 10%;
    }
`;

const TitleImage = styled.img`
    z-index: 0;
    width: 60vw;
    object-fit: cover;
    opacity: 200%;
    filter: brightness(65%);
`;

const AboutDiv = styled.div`
    background-color: #093a3a;
    width: 40%;
    margin-top: -80px;
    z-index: 3;
    padding: 20px 60px;
    font-family: 'Forum', cursive;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: 650px) {
        margin-top: -20px;
        width: 90%;
        padding: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;

const AboutTitle = styled.h2`
    text-align: center;
    color: white;
    font-size: 32px;
`;

const Paragraph = styled.p`
    color: white;
    font-size: 24px;
    text-align: justify;
    margin-top: 0;

    @media (max-width: 650px) {
        width: 80%;
    }
`;

const Button = styled.button`
    border-radius: 15px;
    border: none;
    font-family: 'Forum', cursive;
    height: 45px;
    width: 175px;
    font-size: 24px;
    margin-bottom: 30px;
    background-color: #050a30;
    color: white;

    :hover {
        opacity: 70%;
        cursor: pointer;
    }
`;

const QuoteDiv = styled.div`
    z-index: 1;
    width: 80%;
    height: 500px;
    margin-top: -100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid lightgrey;
`;

const Quote = styled.p`
    font-weight: 700;
    font-size: 60px;
    margin-top: 100px;
    text-align: center;
    font-family: 'Forum', cursive;

    @media (max-width: 850px) {
        font-size: 48px;
    }
`;

const PhotoDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Author = styled.p`
    font-size: 48px;
    margin-top: -20px;
    font-family: 'Forum', cursive;
    text-align: center;

    @media (max-width: 850px) {
        font-size: 36px;
    }
`;

const VicFallsImageDiv = styled.div`
    width: 80%;
    z-index: 0;
    display: flex;
    justify-content: right;
    margin-left: 30px;

    @media (max-width: 900px) {
        margin: 0;
        justify-content: center;
    }
`;

const VicFallsImage = styled.img`
    width: 65%;
    margin-top: -50px;

    @media (max-width: 900px) {
        margin: 0;
        justify-content: center;
        width: 95%;
    }
`;

const BoKaapImageDiv = styled.div`
    width: 80%;
    z-index: 0;
    display: flex;
    justify-content: left;
    margin-right: 30px;

    @media (max-width: 900px) {
        margin: 0;
        justify-content: center;
    }
`;

const BoKaapImage = styled.img`
    width: 60%;
    margin-top: -200px;

    @media (max-width: 900px) {
        margin: 0;
        width: 95%;
    }
`;

const MapDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const MapTitle = styled.h2`
    font-size: 48px;
    font-family: 'Forum', cursive;
    font-weight: 700;
    margin-top: 100px;

    @media (max-width: 500px) {
        font-size: 36px;
    }
`;

const Map = styled.img`
    width: 80%;
    margin-bottom: 100px;
`;

export default About;