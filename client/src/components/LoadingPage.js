import loadingIcon from "../assets/loading-icon.png";
import styled from "styled-components";

const LoadingPage = () => {
    return (
        <Wrapper>
            <Icon src={loadingIcon}/>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Icon = styled.img`
    width: 150px;
`;

export default LoadingPage;