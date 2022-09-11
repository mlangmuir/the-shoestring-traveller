import styled from "styled-components";
import aboutPic from "../assets/about-pic.jpg";
import vicFalls from "../assets/vic-falls.JPG";
import boKaap from "../assets/bo-kaap-background.JPG";
import countriesVisitedMap from "../assets/countries-visited.png";

const About = () => {

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
            </AboutDiv>
            <QuoteDiv>
                <Quote>"Rester, c'est exister. mais voyager, c'est vivre."</Quote>
                <Author>GUSTAVE NADAUD</Author>
            </QuoteDiv>
            <VicFallsImageDiv>
                <VicFallsImage src={vicFalls} alt="The Shoestring Traveller at Victoria Falls."/>
            </VicFallsImageDiv>
            <BoKaapImageDiv>
                <BoKaapImage src={boKaap} alt="The Shoestring Traveller in Bo Kaap, Cape Town."/>
            </BoKaapImageDiv>
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
    width: 50vw;
`;

const Title = styled.h1`
    z-index: 2;
    color: white;
    position: absolute;
    font-family: 'Forum', cursive;
    font-size: 100px;
    margin-top: 10%;
    margin-right: 200px;
    width: 400px;
`;

const TitleImage = styled.img`
    z-index: 0;
    width: 50vw;
    object-fit: cover;
    opacity: 200%;
    filter: brightness(65%);
`;

const AboutDiv = styled.div`
    background-color: #093a3a;
    width: 35%;
    height: 500px;
    margin-top: -80px;
    z-index: 3;
    padding: 40px 60px;
    font-family: 'Forum', cursive;
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
    width: 700px;
    font-family: 'Forum', cursive;
`;

const Author = styled.p`
    font-size: 48px;
    margin-top: -20px;
    font-family: 'Forum', cursive;
`;

const VicFallsImageDiv = styled.div`
    z-index: 0;
    display: flex;
    justify-content: right;
`;

const VicFallsImage = styled.img`
    width: 65%;
    margin-top: -50px;
`;

const BoKaapImageDiv = styled.div`
    width: 90%;
    z-index: 0;
    display: flex;
    justify-content: left;
`;

const BoKaapImage = styled.img`
    width: 50%;
    margin-top: -200px;
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
`;

const Map = styled.img`
    width: 80%;
    margin-bottom: 100px;
`;

export default About;