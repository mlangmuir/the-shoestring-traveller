import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Context } from "../../Context";

const ImageSlider = () => {

    const { travelTipArticles } = useContext(Context);

    const navigate = useNavigate();

    const [tipIndex, setTipIndex] = useState(0);

    const handleClickLeft = () => {
        setTipIndex(tipIndex - 1);
    }

    const handleClickRight = () => {
        setTipIndex(tipIndex + 1);
    }

    return (
        <Wrapper>
            <Container >
                <ArrowDiv style={{justifyContent: tipIndex === 0 && "right"}}>
                    <ArrowLeft
                        style={{display: tipIndex === 0 && "none"}}
                        onClick={handleClickLeft}
                    >
                        {"<"}
                    </ArrowLeft>
                    <ArrowRight
                        style={{display: tipIndex === travelTipArticles.length - 1 && "none"}}
                        onClick={handleClickRight}
                    >
                        {">"}
                    </ArrowRight>
                </ArrowDiv>
                <TextDiv>
                    <Title>{travelTipArticles?.[tipIndex]?.title}</Title>
                    <Paragraph>{travelTipArticles?.[tipIndex]?.paragraphs?.[0]?.text}</Paragraph>
                    <Button onClick={() => navigate(`/articles/id/${travelTipArticles?.[tipIndex]?.id}`)}>
                        Read full article
                    </Button>
                </TextDiv>
                <CircleDiv>
                    {travelTipArticles.map((item, index) => {
                        return (
                            <Circle
                                key={index}
                                style={{opacity: index === tipIndex ? "100%" : "30%"}}
                                onClick={() => setTipIndex(index)}
                            />
                        )
                    })}
                </CircleDiv>
                {tipIndex === 2
                    ? <Image src={travelTipArticles?.[2]?.paragraphs?.[1]?.imgSrc} />
                    : <Image src={travelTipArticles?.[tipIndex]?.coverImgSrc?.imgSrc} />
                }
            </Container>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100vw;
`;

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ArrowDiv = styled.div`
    position: absolute;
    z-index: 1;
    color: white;
    font-size: 48px;
    display: flex;
    justify-content: space-between;
    width: 100vw;
`;

const ArrowLeft = styled.div`
    margin-left: 20px;

    :hover {
        cursor: pointer;
    }
`;

const ArrowRight = styled.div`
    margin-right: 20px;

    :hover {
        cursor: pointer;
    }
`;

const TextDiv = styled.div`
    margin-top: -50px;
    position: absolute;
    z-index: 2;
    font-family: 'Forum', cursive;
    color: white;
    width: 40%;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
`;

const Title = styled.h1`   
    font-size: 48px;
`;

const Paragraph = styled.p`
    font-size: 28px;
`;

const Button = styled.button`
    font-size: 24px;
    width: 200px;
    color: white;
    background-color: #050a30;
    border: none;
    border-radius: 8px;
    padding: 5px 0;
    font-family: 'Forum', cursive;
    margin-top: 30px;

    :hover {
        cursor: pointer;
        opacity: 70%;
    }
`;

const CircleDiv = styled.div`
    display: flex;
    justify-content: space-around;
    position: absolute;
    z-index: 1;
    align-items: flex-end;
    height: 80vh;
    width: 150px;
`;

const Circle = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 20px;
    background-color: white;

    :hover {
        cursor: pointer;
    }
`;

const Image = styled.img`
    width: 100%;
    height: 90vh;
    object-fit: cover;
    object-position: top;
    filter: brightness(50%);
    z-index: 0;
`;

export default ImageSlider;