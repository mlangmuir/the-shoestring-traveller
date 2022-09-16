import loadingIcon from "../assets/loading-icon.png";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const LoadingPage = () => {

    const { isAuthenticated } = useAuth0();

    return (
        <>
            {isAuthenticated
            ? <Wrapper>
                <Icon src={loadingIcon}/>
            </Wrapper>
            :
            <Wrapper>
                <Icon src={loadingIcon}/>
            </Wrapper>
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

export default LoadingPage;