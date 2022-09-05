import worldMap from "../../assets/world-map.png";
import northernAmerica from "../../assets/northern-america.jpeg";
import centralAmerica from "../../assets/central-america.jpeg";
import westernEurope from "../../assets/western-europe.jpeg";
import northAfrica from "../../assets/north-africa.jpeg";
import southernAfrica from "../../assets/southern-africa.jpeg";
import westernAsia from "../../assets/western-asia.jpeg";
import eastAsia from "../../assets/east-asia.jpg";
import afContinent from "../../assets/af-continent.jpeg";
import asContinent from "../../assets/as-continent.jpeg";
import euContinent from "../../assets/eu-continent.jpeg";
import naContinent from "../../assets/na-continent.jpeg"; 
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Destinations = () => {

    const navigate = useNavigate();

    return (
        <Wrapper>
            <Title>Discover your dream destination!</Title>
            <MapDiv>
                <NorthernAmerica
                    onClick={()=> {
                        navigate("/articles?region=Northern%20America");
                        window.scrollTo(0,0);
                    }}
                >
                    <RegionImage src={northernAmerica} />
                    <RegionText>NORTHERN AMERICA</RegionText>
                </NorthernAmerica>
                <CentralAmerica
                    onClick={()=> {
                        navigate("/articles?region=Central%20America");
                        window.scrollTo(0,0);
                    }}
                >
                    <RegionImage src={centralAmerica} />
                    <RegionText>CENTRAL AMERICA</RegionText>
                </CentralAmerica>
                <WesternEurope
                    onClick={()=> {
                        navigate("/articles?region=Western%20Europe");
                        window.scrollTo(0,0);
                    }}
                >
                    <RegionImage src={westernEurope} />
                    <RegionText>WESTERN EUROPE</RegionText>
                </WesternEurope>
                <NorthAfrica
                    onClick={()=> {
                        navigate("/articles?region=North%20Africa");
                        window.scrollTo(0,0);
                    }}
                >
                    <RegionImage src={northAfrica} />
                    <RegionText>NORTH AFRICA</RegionText>
                </NorthAfrica>
                <SouthernAfrica
                    onClick={()=> {
                        navigate("/articles?region=Southern%20Africa");
                        window.scrollTo(0,0);
                    }}
                >
                    <RegionImage src={southernAfrica} />
                    <RegionText>SOUTHERN AFRICA</RegionText>
                </SouthernAfrica>
                <WestAsia
                    onClick={()=> {
                        navigate("/articles?region=Western%20Asia");
                        window.scrollTo(0,0);
                    }}
                >
                    <RegionImage src={westernAsia} />
                    <RegionText>WESTERN ASIA</RegionText>
                </WestAsia>
                <EastAsia
                    onClick={()=> {
                        navigate("/articles?region=East%20Asia");
                        window.scrollTo(0,0);
                    }}
                >
                    <RegionImage src={eastAsia} />
                    <RegionText>EAST ASIA</RegionText>
                </EastAsia>
                <Map src={worldMap} />
            </MapDiv>

            <ContinentDiv>
                <ContinentWrapper
                    onClick={()=> {
                        navigate("/articles?continent=Africa");
                        window.scrollTo(0,0);
                    }}
                >
                    <ContinentText>AFRICA</ContinentText>
                    <CoverShade />
                    <Continent src={afContinent} />
                </ContinentWrapper>
                <ContinentWrapper
                    onClick={()=> {
                        navigate("/articles?continent=Asia");
                        window.scrollTo(0,0);
                    }}
                >
                    <ContinentText>ASIA</ContinentText>
                    <CoverShade />
                    <Continent src={asContinent} />
                </ContinentWrapper>
                <ContinentWrapper
                    onClick={()=> {
                        navigate("/articles?continent=Europe");
                        window.scrollTo(0,0);
                    }}
                >
                    <ContinentText>EUROPE</ContinentText>
                    <CoverShade />
                    <Continent src={euContinent} />
                </ContinentWrapper>
                <ContinentWrapper
                    onClick={()=> {
                        navigate("/articles?continent=North%20America");
                        window.scrollTo(0,0);
                    }}
                >
                    <ContinentText>NORTH AMERICA</ContinentText>
                    <CoverShade />
                    <Continent src={naContinent} />
                </ContinentWrapper>
            </ContinentDiv>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Title = styled.h1`
    margin-top: 75px;
    margin-bottom: 50px;

    @media (max-width: 550px) {
        text-align: center;
        font-size: 28px;
    }
`;

const MapDiv = styled.div`
    width: 80%;
    display: flex;
    justify-content: center;
    margin-bottom: 80px;
    margin-top: 20px;

    @media (max-width: 1150px) {
        width: 95%;
    }
`;

const NorthernAmerica = styled.div`
    z-index: 1;
    position: absolute;
    margin-right: 48%;
    margin-top: 3%;
    width: 7%;
    height: 7%;
    display: flex;
    flex-direction: column;
    align-items: center;

    :hover{
        cursor: pointer;
        transform: scale(1.1);
    }

    @media (max-width: 1150px) {
        margin-right: 62%;
        margin-top: 7%;
        width: 9%;
        height: 9%;
    }

    @media (max-width: 550px) {
        margin-top: 10%;
    }
`;

const CentralAmerica = styled.div`
    z-index: 1;
    position: absolute;
    margin-right: 40%;
    margin-top: 15%;
    width: 7%;
    height: 7%;
    display: flex;
    flex-direction: column;
    align-items: center;

    :hover{
        cursor: pointer;
        transform: scale(1.1);
    }

    @media (max-width: 1150px) {
        margin-right: 45%;
        margin-top: 20%;
        width: 9%;
        height: 9%;
    }

    @media (max-width: 550px) {
        margin-top: 23%;
    }
`;

const WesternEurope = styled.div`
    z-index: 1;
    position: absolute;
    margin-right: 10%;
    width: 7%;
    height: 7%;
    display: flex;
    flex-direction: column;
    align-items: center;

    :hover{
        cursor: pointer;
        transform: scale(1.1);
    }

    @media (max-width: 550px) {
        margin-top: 10%;
    }
`;

const NorthAfrica = styled.div`
    z-index: 1;
    position: absolute;
    margin-right: 3%;
    margin-top: 12%;
    width: 7%;
    height: 7%;
    display: flex;
    flex-direction: column;
    align-items: center;

    :hover{
        cursor: pointer;
        transform: scale(1.1);
    }

    @media (max-width: 550px) {
        margin-top: 22%;
    }
`;

const SouthernAfrica = styled.div`
    z-index: 1;
    position: absolute;
    margin-left: 5%;
    margin-top: 25%;
    width: 7%;
    height: 7%;
    display: flex;
    flex-direction: column;
    align-items: center;

    :hover{
        cursor: pointer;
        transform: scale(1.1);
    }

    @media (max-width: 550px) {
        margin-top: 35%;
    }
`;

const WestAsia = styled.div`
    z-index: 1;
    position: absolute;
    margin-left: 19%;
    margin-top: 8%;
    width: 7%;
    height: 7%;
    display: flex;
    flex-direction: column;
    align-items: center;

    :hover {
        cursor: pointer;
        transform: scale(1.1);
    }

    @media (max-width: 550px) {
        margin-top: 15%;
    }
`;

const EastAsia = styled.div`
    z-index: 1;
    position: absolute;
    min-width: 3%;
    min-height: 3%;
    margin-left: 45%;
    margin-top: 12%;
    width: 7%;
    height: 7%;
    display: flex;
    flex-direction: column;
    align-items: center;

    :hover{
        cursor: pointer;
        transform: scale(1.1);
    }

    @media (max-width: 550px) {
        margin-left: 55%;
    }
`;

const RegionImage = styled.img`
    width: 100%;
    border: 1px solid lightgrey;
    padding: 10px;

    @media (max-width: 1150px) {
        border: none;
    }

    @media (max-width: 550px) {
        display: none;
    }
`;

const RegionText = styled.p`
    font-size: 12px;
    margin-top: 3px;
    color: #050a30;
    text-align: center;
    width: 100%;
    font-weight: 700;

    @media (max-width: 1150px) {
        font-size: 10px;
        margin-top: -5px;
    }
`;

const Map = styled.img`
    z-index: 0;
    width: 80%;
    opacity: 40%;

    @media (max-width: 1150px) {
        width: 95%;
    }
`;

const ContinentDiv = styled.div`
    width: 75%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 50px;
`;

const ContinentWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    :hover {
        cursor: pointer;
        transform: scale(1.03);
    }
`;

const ContinentText = styled.h2`
    z-index: 2;
    color: white;
    font-size: 36px;
    font-weight: 700;
    position: absolute;

    @media (max-width: 550px) {
        font-size: 28px;
    }
`;

const CoverShade = styled.div`
    z-index: 1;
    width: 50%;
    object-fit: cover;
    position: absolute;
    background-color: black;
    opacity: 40%;
    width: 450px;
    height: 225px;
    margin: 20px;

    @media (max-width: 550px) {
        width: 300px;
        height: 150px;
    }
`;

const Continent = styled.img`
    z-index: 0;
    width: 450px;
    height: 225px;
    margin: 20px;

    @media (max-width: 550px) {
        width: 300px;
        height: 150px;
    }
`;


export default Destinations;