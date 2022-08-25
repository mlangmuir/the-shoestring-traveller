import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Footer = () => {

    const navigate = useNavigate();

    return (
        <Wrapper>
            <ListsWrapper>
                <Container>
                    <Title>ABOUT</Title>
                                <Item
                                    onClick={ () => {
                                        window.location.reload(false);
                                        window.scrollTo(0, 0)
                                    }}
                                >
                                </Item>
                </Container>
                <Container>
                    <Title>DESTINATIONS</Title>
                            <Item
                                onClick={ () => {
                                    window.location.reload(false);
                                    window.scrollTo(0, 0)
                                }}
                            >
                            </Item>
                </Container>
                <Container>
                    <Title>TRAVEL TIPS</Title>
                </Container>
            </ListsWrapper>
            <Copyright>© 2022 The Shoestring Traveller. All rights reserved.</Copyright>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #050a30;
    width: 100vw;
    height: 400px;
    bottom: 0;

    @media (max-width: 757px) {
        height: 550px;
    }

    @media (max-width: 525px) {
        height: 650px;
    }

    @media (max-width: 393px) {
        height: 750px;
    }

    @media (max-width: 359px) {
        height: 950px;
    }
`;

const ListsWrapper = styled.div`
    display: flex;
    justify-content: space-evenly;

    @media (max-width: 775px) {
        flex-wrap: wrap;
    }
`;

const Container = styled.div`
    color: white;
    line-height: 25px;
    font-size: 18px;
    margin: 20px;

    @media (max-width: 600px) {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;

const Title = styled.h3`
    font-weight: 700;
`;

const Item = styled.p`
    line-height: 25px;
    font-size: 18px;

    :hover {
        cursor: pointer;
    }
`;

const Copyright = styled.p`
    color: white;
    text-align: center;
    margin-top: 40px;
`;

export default Footer;