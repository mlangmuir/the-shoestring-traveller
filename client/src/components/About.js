import styled from "styled-components";
import aboutPic from "../assets/about-pic.jpg";

const About = () => {

    return (
        <Wrapper>
            <Container>
                <Div>
                    <TextDiv>
                    <Title>About the Shoestring Traveller</Title>
                    <MobileImage src={aboutPic} alt="Photo of the Shoestring Traveller" />
                        <Paragraph>Matthew graduated with a Bachelor of Arts in Political Science from the University of British Columbia in 2018. In the years after graduating, Matthew worked in youth work as both a social worker and English language assistant.</Paragraph>
                        <Paragraph>In addition to his passion for teaching, Matthew is also an avid traveller, having ventured to 27 countries across five continents. He also enjoys playing and watching hockey and soccer in his spare time.</Paragraph>
                        <Paragraph>Matthew is currently pursuing a diploma in web development at Concordia University and hopes to become a software developer in the near future while continuing to offer tutorials to adolescent youth.</Paragraph>
                    </TextDiv>
                    <Image src={aboutPic} alt="Photo of the Shoestring Traveller" />
                </Div>
            </Container>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    margin-bottom: 100px;
`;

const Title = styled.h1`
    margin-top: 90px;
    margin-bottom: 50px;
    font-size: 48px;

    @media (max-width: 1000px) {
        text-align: center;
        margin-bottom: 30px;
    }

    @media (max-width: 700px) {
        font-size: 28px;
    }
`;

const MobileImage = styled.img`
    width: 100%;
    display: none;

    @media (max-width: 1000px) {
        display: block;
    }
`;

const Div = styled.div`
    display: flex;
`;

const Image = styled.img`
    width: 50%;
    object-fit: cover;
    margin-top: 100px;

    @media (max-width: 1000px) {
        display: none;
        margin: 0;
    }
`;

const TextDiv = styled.div`
    margin-right: 50px;

    @media (max-width: 1000px) {
        margin: 0;
    }
`;  

const Paragraph = styled.p`
    font-size: 22px;
    text-align: justify;
`;

export default About;