import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Article = () => {

    const { articleId } = useParams();

    const [articleData, setArticleData] = useState([]);
    const [paragraphs, setParagraphs] = useState([])

    console.log(articleId)

    // fetches article based on articleId param
    useEffect(() => {
        fetch(`/api/articles/id/${articleId}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setArticleData(data.data);
                setParagraphs(data.data.paragraphs)
            })
    },[articleId]);

    return (
        <Wrapper>
            <Container>
                {articleData.title && <Title>{articleData.title}</Title>}
                {articleData.coverImgSrc?.imgSrc && <CoverImage src={articleData.coverImgSrc.imgSrc} />}
                {articleData.coverImgSrc?.imgCaption && <CoverCaption>{articleData.coverImgSrc.imgCaption}</CoverCaption>}
                <>
                {paragraphs.map((paragraph, index) => {
                    return (
                        <div key={index}>
                            {paragraph.subHeading && <SubHeading>{paragraph.subHeading}</SubHeading>}
                            {paragraph.imgSrc && <SubImage src={paragraph.imgSrc} />}
                            {paragraph.imgCaption && <SubCaption>{paragraph.imgCaption}</SubCaption>}
                            {paragraph.text && <Paragraph>{paragraph.text}</Paragraph>}
                        </div>
                    )
                })}
                </>
            </Container>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    margin-top: 50px;
    margin-bottom: 100px;
    display: flex;
    justify-content: center;
`;

const Container = styled.div`
    width: 50%;
`;

const Title = styled.h1`
    text-align: center;
    font-size: 40px;
`;

const CoverImage = styled.img`
    width: 100%;
`;

const CoverCaption = styled.p`
    font-size: 18px;
    margin-bottom: 50px;
`;

const SubHeading = styled.h2`
    font-size: 28px;
    margin-top: 75px;
`;

const SubImage = styled.img`
    width: 100%;
`;

const SubCaption = styled.p`
    font-size: 18px;
    margin-bottom: 50px;
`;

const Paragraph = styled.p`
    font-size: 24px;
    text-align: justify;
    line-height: 40px;
`;

export default Article;