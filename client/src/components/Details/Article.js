import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import LoadingPage from "../LoadingPage";
import { Context } from "../../Context";
import aboutMePoster from "../../assets/about-me-poster.png";
import signUpPoster from "../../assets/sign-up-poster.png";
import discoverChobePoster from "../../assets/discover-chobe.png";
import tipsPoster from "../../assets/tips-poster.png";
import { useAuth0 } from '@auth0/auth0-react';

const Article = () => {

    const {  isLoading, setIsLoading } = useContext(Context);

    const { articleId } = useParams();

    const { isAuthenticated, loginWithRedirect } = useAuth0();

    const navigate = useNavigate();

    const [articleData, setArticleData] = useState([]);
    const [paragraphs, setParagraphs] = useState([])

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
                {articleData.title && <Title>{articleData.title}</Title>}
                {articleData.title && <Date>{articleData.date}</Date>}
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
                    </ArticleDiv>
                    <SidebarDiv>
                        <AboutMePoster
                            src={aboutMePoster}
                            alt="About me poster about the Shoestring Traveller"
                            onClick={() => {
                                navigate("/about");
                                window.scrollTo(0,0);
                            }}
                        />
                        {!isAuthenticated &&
                        <SignUpPoster
                            src={signUpPoster}
                            alt="Poster about signing up for Shoestring Traveller account"
                            onClick={() => loginWithRedirect()}
                        />
                        }
                        {articleData.id !== "0003" &&
                        <DiscoverChobePoster
                            src={discoverChobePoster}
                            alt="Poster about the Chobe safari"
                            onClick={() => {
                                navigate("/articles/id/0003");
                                window.scrollTo(0,0);
                            }}
                        />
                        }
                        {articleData.id !== "0002" &&
                        <TipsPoster
                            src={tipsPoster}
                            alt="Poster on budget travel tips"
                            onClick={() => {
                                navigate("/articles/id/0002");
                                window.scrollTo(0,0);
                            }}
                        />
                        }
                    </SidebarDiv>
                </Container>
            </Wrapper>
            : <LoadingPage />
            }
        </>
    )
}

const Wrapper = styled.div`
    margin-bottom: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Container = styled.div`
    width: 80%;
    display: flex;
    justify-content: space-between;
`;

const ArticleDiv = styled.div`
    width: 62%;
`;

const SidebarDiv = styled.div`
    width: 30%;
`;

const AboutMePoster = styled.img`
    width: 100%;

    :hover {
        cursor: pointer;
    }
`;

const SignUpPoster = styled.img`
    width: 100%;
    margin-top: 100px;

    :hover {
        cursor: pointer;
};
`

const DiscoverChobePoster = styled.img`
    width: 100%;
    margin-top: 100px;

    :hover {
        cursor: pointer;
    }
`; 

const TipsPoster = styled.img`
    width: 100%;
    margin-top: 100px;

    :hover {
        cursor: pointer;
    }
`; 

const Title = styled.h1`
    margin-top: 100px;
    text-align: center;
    font-size: 28px;
`;

const Date = styled.p`
    margin-bottom: 50px;
    margin-top: 0;
    text-align: center;
    font-size: 16px;
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
`;

export default Article;