import worldMap from "../../assets/world-map.png";
import northernAmerica from "../../assets/northern-america.jpeg";
import centralAmerica from "../../assets/central-america.jpeg";
import westernEurope from "../../assets/western-europe.jpeg";
import northAfrica from "../../assets/north-africa.jpeg";
import southernAfrica from "../../assets/southern-africa.jpeg";
import westernAsia from "../../assets/western-asia.jpeg";
import eastAsia from "../../assets/east-asia.jpg";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useContext } from "react";
import { Context } from "../../Context";

const Maps = () => {

    const navigate = useNavigate();

    const {setDisplayValue} = useContext(Context);

    return (
        <MapDiv>
            <NorthernAmerica
                onClick={()=> {
                    setDisplayValue("");
                    navigate("/articles?region=Northern%20America");
                    window.scrollTo(0,0);
                }}
            >
                <RegionImage src={northernAmerica} />
                <RegionText>NORTHERN AMERICA</RegionText>
            </NorthernAmerica>
            <CentralAmerica
                onClick={()=> {
                    setDisplayValue("");
                    navigate("/articles?region=Central%20America");
                    window.scrollTo(0,0);
                }}
            >
                <RegionImage src={centralAmerica} />
                <RegionText>CENTRAL AMERICA</RegionText>
            </CentralAmerica>
            <WesternEurope
                onClick={()=> {
                    setDisplayValue("");
                    navigate("/articles?region=Western%20Europe");
                    window.scrollTo(0,0);
                }}
            >
                <RegionImage src={westernEurope} />
                <RegionText>WESTERN EUROPE</RegionText>
            </WesternEurope>
            <NorthAfrica
                onClick={()=> {
                    setDisplayValue("");
                    navigate("/articles?region=North%20Africa");
                    window.scrollTo(0,0);
                }}
            >
                <RegionImage src={northAfrica} />
                <RegionText>NORTH AFRICA</RegionText>
            </NorthAfrica>
            <SouthernAfrica
                onClick={()=> {
                    setDisplayValue("");
                    navigate("/articles?region=Southern%20Africa");
                    window.scrollTo(0,0);
                }}
            >
                <RegionImage src={southernAfrica} />
                <RegionText>SOUTHERN AFRICA</RegionText>
            </SouthernAfrica>
            <WestAsia
                onClick={()=> {
                    setDisplayValue("");
                    navigate("/articles?region=Western%20Asia");
                    window.scrollTo(0,0);
                }}
            >
                <RegionImage src={westernAsia} />
                <RegionText>WESTERN ASIA</RegionText>
            </WestAsia>
            <EastAsia
                onClick={()=> {
                    setDisplayValue("");
                    navigate("/articles?region=East%20Asia");
                    window.scrollTo(0,0);
                }}
            >
                <RegionImage src={eastAsia} />
                <RegionText>EAST ASIA</RegionText>
            </EastAsia>
            <Map src={worldMap} />
        </MapDiv>
    )
}


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

export default Maps;