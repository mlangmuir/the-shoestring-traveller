import styled from "styled-components";
import Maps from "./Map";
import Continents from "./Continents";
import { useContext } from "react";
import { Context } from "../../Context";
import LoadingPage from "../LoadingPage";
import { useEffect } from "react";
import desertBg from "../../assets/desert-bg.jpg";

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
            ? <Wrapper style={{
                    backgroundImage: `url(${desertBg})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
            }}>

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
    color: white;
    z-index: 1;
    margin-top: 75px;
    margin-bottom: 50px;
    text-align: center;
    font-family: 'Forum', cursive;
    font-size: 56px;

    @media (max-width: 550px) {
        text-align: center;
        font-size: 28px;
    }
`;

export default Destinations;