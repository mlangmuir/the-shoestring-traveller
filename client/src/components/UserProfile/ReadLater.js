import styled from "styled-components";

const ReadLater = () => {
    return (
        <Wrapper>
            <Title>Read Later</Title>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
`;

const Title = styled.h1`

`;

export default ReadLater;