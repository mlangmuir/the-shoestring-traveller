import styled from "styled-components";
import Maps from "./Map";
import Continents from "./Continents";
import { useContext } from "react";
import { Context } from "../../Context";
import LoadingPage from "../LoadingPage";
import { useEffect } from "react";

const Destinations = () => {

    const { isLoading, setIsLoading } = useContext(Context);
    
    useEffect(() => {
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false);
        }, 500)
    }, [])

    return (
        <>
            {!isLoading
            ? <Wrapper>
                <Title>Discover your dream destination!</Title>
                <Maps />
                <Continents />
            </Wrapper>
            : <LoadingPage />
            }
        </>
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