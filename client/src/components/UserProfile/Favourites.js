import styled from "styled-components";

const Favourites = () => {
    return (
        <Wrapper>
            <Title>Favourites</Title>
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

export default Favourites;