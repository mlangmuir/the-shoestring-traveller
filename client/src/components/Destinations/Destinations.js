import styled from "styled-components";
import Maps from "./Map";
import Continents from "./Continents";

const Destinations = () => {

    return (
        <Wrapper>
            <Title>Discover your dream destination!</Title>
            <Maps />
            <Continents />
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

export default Destinations;