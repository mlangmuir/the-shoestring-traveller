import styled from "styled-components";
import { AiOutlineHeart } from "react-icons/ai";
import { BiBookmark } from "react-icons/bi";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect, useContext } from "react";
import { Context } from "../../Context";
import LoadingPage from "../LoadingPage";

const Icons = ({ articleData }) => {

    const { articleId } = useParams();

    const { isLoading, setIsLoading } = useContext(Context);

    const { isAuthenticated, loginWithRedirect, user } = useAuth0();

    const [clickFavourite, setClickFavourite] = useState(false);
    const [clickReadLater, setClickReadLater] = useState(false);
    const [foundFavourite, setFoundFavourite] = useState("");
    const [foundReadLater, setFoundReadLater] = useState("");
    const [concatArticleUser, setConcatArticleUser] = useState("");

    // fetches favourite and read later data + concats article id with user email
    useEffect(() => {
        if (user) {
            fetch(`/api/favourites/${user.email}`)
                .then((res) => res.json())
                .then((data) => {
                    setConcatArticleUser(articleId + "|" + user?.email);
                    return data;
                })
                .then((data) => {
                    setFoundFavourite(data.data.find(item => item.id === concatArticleUser));
                })
            fetch(`/api/read-later/${user.email}`)
                .then((res) => res.json())
                .then((data) => {
                    setConcatArticleUser(articleId + "|" + user?.email);
                    return data;
                })
                .then((data) => {
                    setFoundReadLater(data.data.find(item => item.id === concatArticleUser));
                })
            setIsLoading(false);
        }
    },[user, concatArticleUser]);

    useEffect(() => {
        if (foundFavourite) {
            setClickFavourite(true);
        }
    },[foundFavourite])

    useEffect(() => {
        if (foundReadLater) {
            setClickReadLater(true);
        }
    },[foundReadLater])

    let postArticleInfo;
    if (user) {
        postArticleInfo = {
            userId: user?.email,
            articleId: articleId,
            articleData: articleData
        }
    }

    const handleFavourite = () => {

        if (!clickFavourite) {

            setClickFavourite(true);

            fetch(`/api/add-favourite/${concatArticleUser}`, {
                method: "POST",
                headers: {"Accept": "application/json","Content-Type": "application/json"},
                body: JSON.stringify(postArticleInfo),
            }).then(res =>  res.json())
            .catch(e => {
                console.log("error", e);
            });

        } else if (clickFavourite) {

            setClickFavourite(false);

            fetch(`/api/delete-favourite/${concatArticleUser}`, {
                method: "DELETE",
            }).then(res =>  res.json())
            .catch(e => {
                console.log("error", e);
            });
        }
    }

    const handleReadLater = () => {
        
        if (!clickReadLater) {

            setClickReadLater(true);

            fetch(`/api/add-read-later/${concatArticleUser}`, {
                method: "POST",
                headers: {"Accept": "application/json","Content-Type": "application/json"},
                body: JSON.stringify(postArticleInfo),
            }).then(res =>  res.json())
            .catch(e => {
                console.log("error", e);
            });

        } else if (clickReadLater) {

            setClickReadLater(false);

            fetch(`/api/delete-read-later/${concatArticleUser}`, {
                method: "DELETE",
            }).then(res =>  res.json())
            .catch(e => {
                console.log("error", e);
            });
        }
    }

    const handleSignIn = () => {
        loginWithRedirect();
    }

    return (
        <>
        {!isLoading
        ? <IconsWrapper>
            {isAuthenticated
                ? <Tippy placement="bottom" content="Add to Favourites">
                    <HeartIconDiv onClick={handleFavourite}>
                        <AiOutlineHeart
                            size={20}
                            style={{color: clickFavourite ? "red" : "black"}}
                        />
                        <IconText>Favourite</IconText>
                    </HeartIconDiv>
                </Tippy>
                : <Tippy placement="bottom" content="Sign in to add to Favourites">
                    <HeartIconDiv onClick={handleSignIn}>
                        <AiOutlineHeart
                            size={20}
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
                            style={{color: clickReadLater ? "green" : "black"}}
                        />
                        <IconText>Read Later</IconText>
                    </BookmarkIconDiv>
                </Tippy>
                : <Tippy placement="bottom" content="Sign in to add to Read Later">
                    <BookmarkIconDiv onClick={handleSignIn}>
                        <BiBookmark
                            size={20}
                        />
                        <IconText>Read Later</IconText>
                    </BookmarkIconDiv>
                </Tippy>
            }
            <Snackbar open={foundFavourite}>
                <Alert
                    severity="success"
                    elevation={6}
                    variant="filled"
                >
                    Article added to Favourites!
                </Alert>
            </Snackbar>
            <Snackbar open={clickReadLater}>
                <Alert
                    severity="success"
                    elevation={6}
                    variant="filled"
                >
                    Article added to Read Later!
                </Alert>
            </Snackbar>
        </IconsWrapper>
        : <LoadingPage />
        }
        </>
    )
}


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

export default Icons;