import { useParams } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import LoadingPage from "../LoadingPage";
import { Context } from "../../Context";
import Icons from "./Icons";
import Sidebar from "./Sidebar";
import CommentBox from "./CommentBox";
import CommentList from "./CommentList";

const Article = () => {

    const { isLoading, setIsLoading } = useContext(Context);

    const { articleId } = useParams();

    const [articleData, setArticleData] = useState([]);
    const [paragraphs, setParagraphs] = useState([]);

    // fetches article based on articleId param
    useEffect(() => {
        setIsLoading(true);
        fetch(`/api/articles/id/${articleId}`)
            .then((res) => res.json())
            .then((data) => {
                setArticleData(data.data);
                setParagraphs(data.data.paragraphs);
                setIsLoading(false);
            })
    },[articleId]);

    return (
        <>
            {!isLoading ?
            <Wrapper>
                <TitleDiv>
                    {articleData.title && <Title>{articleData.title}</Title>}
                    {articleData.title && <Date>{articleData.date}</Date>}
                    <Icons articleData={articleData} />
                </TitleDiv>
                <Container>
                    <ArticleDiv>
                        {articleData.coverImgSrc?.imgSrc && <CoverImage src={articleData.coverImgSrc.imgSrc} />}
                        {articleData.coverImgSrc?.imgCaption && <CoverCaption>{articleData.coverImgSrc.imgCaption}</CoverCaption>}
                        <>
                        {paragraphs.map((paragraph, index) => {
                            return (
                                <div key={index}>
                                    {paragraph.subHeading && <SubHeading>{paragraph.subHeading}</SubHeading>}
                                    {paragraph.imgSrc && <SubImage src={paragraph.imgSrc} />}
                                    {paragraph.imgCaption && <SubImgCaption>{paragraph.imgCaption}</SubImgCaption>}
                                    {paragraph.videoSrc && <SubVideo src={paragraph.videoSrc}></SubVideo>}
                                    {paragraph.videoCaption && <SubVideoCaption>{paragraph.videoCaption}</SubVideoCaption>}
                                    {paragraph.text && <Paragraph>{paragraph.text}</Paragraph>}
                                </div>
                            )
                        })}
                        </>
                        <CommentBox articleData={articleData} />
                        <CommentList />
                    </ArticleDiv>
                    <Sidebar />
                </Container>
            </Wrapper>
            : <LoadingPage />
            }
        </>
    )
}

const Wrapper = styled.div`
    margin-top: 75px;
    margin-bottom: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const TitleDiv = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: 850px) {
        width: 90%;
    }
`;

const Title = styled.h1`
    font-size: 32px;
    text-align: center;
`;

const Date = styled.p`
    width: 100%;
    padding-bottom: 30px;
    text-align: center;
    margin-top: 0;
    font-size: 16px;
    border-bottom: 1px solid lightgrey;
`;

const Container = styled.div`
    width: 80%;
    display: flex;
    justify-content: space-between;

    @media (max-width: 850px) {
        width: 100%;
        flex-direction: column;
        align-items: center;
    }
`;

const ArticleDiv = styled.div`
    width: 62%;

    @media (max-width: 850px) {
        width: 90%;
    }
`;

const CoverImage = styled.img`
    width: 100%;
`;

const CoverCaption = styled.p`
    font-size: 16px;
    margin-bottom: 50px;
    font-weight: 700;
    text-align: center;
`;

const SubHeading = styled.h2`
    font-size: 24px;
    margin-top: 75px;
`;

const SubImage = styled.img`
    width: 100%;
`;

const SubImgCaption = styled.p`
    font-size: 16px;
    margin-bottom: 50px;
    font-weight: 700;
    text-align: center;
`;

const SubVideo = styled.iframe`
    width: 100%;
    height: 400px;
`;

const SubVideoCaption = styled.p`
    font-size: 16px;
    margin-bottom: 50px;
    font-weight: 700;
    text-align: center;
`;

const Paragraph = styled.p`
    font-size: 20px;
    text-align: justify;
    line-height: 40px;

    @media (max-width: 850px) {
        font-size: 18px;
        line-height: 30px;
    }
`;

export default Article;