import loadingIcon from "../assets/loading-icon.png";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoadingPage = () => {

    const { isAuthenticated, loginWithRedirect } = useAuth0();

    const [showSignIn, setShowSignIn] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) {
            setTimeout(() => {
                setShowSignIn(true);
            }, 1000)
        }
    },[])

    return (
        <>
            {isAuthenticated
            ? <Wrapper>
                <Icon src={loadingIcon}/>
            </Wrapper>
            : <>
                {!showSignIn ?
                    <Wrapper>
                    <Icon src={loadingIcon}/>
                </Wrapper>
                : <SignInDiv>
                    <SignIn><Span onClick={loginWithRedirect}>Sign in</Span> to access your profile.</SignIn>
                </SignInDiv>}
            </>
            }
        </>
    )
}

const Wrapper = styled.div`
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Icon = styled.img`
    width: 125px;
`;

const SignInDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
`;

const SignIn = styled.p`
    font-size: 24px;
`;

const Span = styled.span`
    color: #4636be;
    font-weight: 600;

    :hover {
        cursor: pointer;
    }
`;


export default LoadingPage;