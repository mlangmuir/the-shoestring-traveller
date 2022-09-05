import styled from "styled-components";

const Comments = () => {
    return (
        <Wrapper>
            <Title>Comments</Title>
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

export default Comments;