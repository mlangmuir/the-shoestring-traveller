import styled from "styled-components";
import  { useNavigate } from 'react-router-dom';
import LoadingPage from "./LoadingPage";
import { Context } from "../Context";
import { useContext } from "react";
import gif404 from "../assets/404.gif"
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

// declare errorPage function
const ErrorPage = () => {

    const { isLoading } = useContext(Context);

    const navigate = useNavigate();

    // declare handleClick function which redirects user to homepage
    const handleClick = () => {
        navigate("/");
    }

    return (
        <>
        {!isLoading 
            ? <Wrapper>
                <Img src={gif404} alt="broken chain" />
                <Title>Page Not Found...</Title>
                <Text>The page you requested does not exist.</Text>
                <Button onClick={handleClick}>Go to Home</Button>
            </Wrapper>
            : <LoadingPage />
        }
        </>
    )
    
}

export default ErrorPage;

const Wrapper = styled.div`
    width: 67%;
    margin: auto;
    text-align: center;
    padding: 150px;

    @media (max-width: 950px) {
        padding: 100px;
    }

    @media (max-width: 650px) {
        padding: 50px;
    }

    @media (max-width: 370px) {
        padding: 20px;
    }
`;

const Img = styled.img`
    width: 300px;
    object-fit: cover;
    object-position: 0 0;
    height: 150px;
`;

const Title = styled.p`
    text-align: center;
    padding: 40px;
    font-size: 25px;
`;

const Text = styled.h3`
    padding: 20px;
    text-align: center;
    font-size: 24px;
`;

const Button = styled.button`
    border: none;
    cursor: pointer;
    color: white;
    background-color: #050a30;
    font-size: 20px;
    padding: 2% 5%;
    margin: 20px 0px;
    border-radius: 35px;
    box-shadow: none;
    justify-content: center;

    &:hover{
        box-shadow: 2px 2px 5px 1px #969696;
    }
`;