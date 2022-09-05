import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import LoadingPage from "./LoadingPage";
import { Context } from "../Context";
import aboutMePoster from "../assets/about-me-poster.png";
import signUpPoster from "../assets/sign-up-poster.png";
import discoverChobePoster from "../assets/discover-chobe.png";
import tipsPoster from "../assets/tips-poster.png";
import { useAuth0 } from '@auth0/auth0-react';
import { AiOutlineHeart } from "react-icons/ai";
import { BiBookmark } from "react-icons/bi";
import usePersistedState from "../usePersistedState";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const Article = () => {

    const {  isLoading, setIsLoading } = useContext(Context);

    const { articleId } = useParams();

    const { isAuthenticated, loginWithRedirect } = useAuth0();

    const navigate = useNavigate();

    const [articleData, setArticleData] = useState([]);
    const [paragraphs, setParagraphs] = useState([]);
    const [favourite, setFavourite] = usePersistedState("favourite", []);
    const [readLater, setReadLater] = usePersistedState("readLater", []);

    const handleFavourite = () => {
        if (!favourite.includes(articleId)) {
            setFavourite([...favourite, articleId]);
        } else {
            setFavourite(favourite.filter(val => val !== articleId));
        }
    }

    const handleReadLater = () => {
        if (!readLater.includes(articleId)) {
            setReadLater([...readLater, articleId]);
        } else {
            setReadLater(readLater.filter(val => val !== articleId));
        }
    }

    const handleSignIn = () => {
        loginWithRedirect();
    }

    console.log(favourite)

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
                    <IconsWrapper>
                        {isAuthenticated
                            ? <Tippy placement="bottom" content="Add to Favourites">
                                <HeartIconDiv onClick={handleFavourite}>
                                    <AiOutlineHeart
                                        size={20}
                                        style={{color: favourite.includes(articleId) && "red"}}
                                    />
                                    <IconText>Favourite</IconText>
                                </HeartIconDiv>
                            </Tippy>
                            : <Tippy placement="bottom" content="Sign in to add to Favourites">
                                <HeartIconDiv onClick={handleSignIn}>
                                    <AiOutlineHeart
                                        size={20}
                                        style={{color: favourite.includes(articleId) && "red"}}
                                    />
                                    <IconText>Favourite</IconText>
                                </HeartIconDiv>
                            </Tippy>
                        }
                        {isAuthenticated
                            ? <Tippy placement="bottom" content="Add to Read Later">
                                <BookmarkIconDiv onClick={handleReadLater}>
                                    <BiBookmark
                                        size={20}
                                        style={{color: readLater.includes(articleId) && "green"}}
                                    />
                                    <IconText>Read Later</IconText>
                                </BookmarkIconDiv>
                            </Tippy>
                            : <Tippy placement="bottom" content="Sign in to add to Read Later">
                                <BookmarkIconDiv onClick={handleReadLater}>
                                    <BiBookmark
                                        size={20}
                                        style={{color: readLater.includes(articleId) && "green"}}
                                    />
                                    <IconText>Read Later</IconText>
                                </BookmarkIconDiv>
                            </Tippy>
                        }
                        <Snackbar open={favourite.includes(articleId)} severity="success">
                            <Alert
                                severity="success"
                                // onClose={clearSnackbar}
                                elevation={6}
                                variant="filled"
                            >
                                Article added to Favourites!
                            </Alert>
                        </Snackbar>
                    </IconsWrapper>
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


const IconsWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin-bottom: 30px;
`;

const HeartIconDiv = styled.div`
    display: flex;
    align-items: center;
    margin-right: 20px;
    border: 1px solid lightgrey;
    border-radius: 20px;
    padding: 0 10px;
    height: 35px;

    :hover {
        cursor: pointer;
        background-color: #f5f5f5;
    }
`;

const BookmarkIconDiv = styled.div`
    display: flex;
    align-items: center;
    margin-right: 20px;
    border: 1px solid lightgrey;
    border-radius: 20px;
    padding: 0 10px;
    height: 35px;

    :hover {
        cursor: pointer;
        background-color: #f5f5f5;
    }
`;

const IconText = styled.p`
    margin-left: 7px;
    margin-right: 5px;
    font-size: 12px;
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