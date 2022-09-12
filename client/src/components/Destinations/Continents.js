import styled from "styled-components";
import afContinent from "../../assets/af-continent.jpeg";
import asContinent from "../../assets/as-continent.jpeg";
import euContinent from "../../assets/eu-continent.jpeg";
import naContinent from "../../assets/na-continent.jpeg"; 
import { useNavigate } from "react-router-dom";

const Continents = () => {

    const navigate = useNavigate();

    return (
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
    )
}


const ContinentDiv = styled.div`
    z-index: 1;
    width: 95%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 80px;

    @media (max-width: 1432px) {
        width: 70%;
    }

    @media (max-width: 950px) {
        width: 95%;
    }
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
    font-size: 28px;
    font-weight: 700;
    position: absolute;
`;

const CoverShade = styled.div`
    z-index: 1;
    width: 50%;
    object-fit: cover;
    position: absolute;
    background-color: black;
    opacity: 40%;
    margin: 20px;
    width: 300px;
    height: 180px;
`;

const Continent = styled.img`
    z-index: 0;
    margin: 20px;
    width: 300px;
    height: 180px;
    object-fit: cover;
`;

export default Continents;