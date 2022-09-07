import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from "styled-components";
import { Context } from '../../Context';
import LoadingPage from '../LoadingPage';
import { useAuth0 } from '@auth0/auth0-react';
import moment from "moment";

const CommentBox = ({ articleData }) => {

    const maxChar = 500;

    const { isLoading, setIsLoading, articleComments } = useContext(Context);

    const { articleId } = useParams();

    const { user, isAuthenticated, loginWithRedirect } = useAuth0();

    const [inputText, setInputText] = useState("");

    const handlePost = (e) => {

        e.preventDefault();
        
        setIsLoading(true);

        const postCommentInfo = {
            userId: user.email,
            articleId: articleId,
            user: user,
            article: articleData,
            comment: inputText,
            date: moment().format('lll')
        }
        
        fetch(`/api/add-comment/${articleId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(postCommentInfo),
        })
        .then((res) => res.json())
        .then((data) => {
            setIsLoading(false);
            setInputText("");
        })
        .catch((err) => {
            setIsLoading(false);
            setInputText("");
            alert("Sorry, your comment has failed to post. Please refresh the page.")
        })
    }

    return (
        <>
            <NumComments>{articleComments.length} Comment{articleComments.length !== 1 &&<span>s</span>}</NumComments>
            {isAuthenticated
            ? <Wrapper
                style={{
                    borderLeft: isLoading ? '0.5px solid #CDCDCD' : 'none',
                    borderRight: isLoading ? '0.5px solid #CDCDCD' : 'none',

                }}
            >
                <PostDiv>
                    <Avatar src={user?.picture}/>
                    <TextArea
                        value={inputText}
                        placeholder="Leave a comment"
                        onChange={(e) => {
                            setInputText(e.target.value)
                        }}
                    />
                </PostDiv>
                <SubmitDiv>
                    {inputText.length < 450
                        ? <CountGrey>{maxChar - inputText.length}</CountGrey>
                        : inputText.length > 500 ?
                            <CountRed>{maxChar - inputText.length}</CountRed>
                        : <CountYellow>{maxChar - inputText.length}</CountYellow>
                    }
                    {inputText.length === 0 || inputText.length > 500
                        ? <DisabledButton
                            disabled
                            style={{
                                cursor: 'auto'
                            }}
                        >
                            Post
                        </DisabledButton>
                        : <Button
                            onClick={handlePost}
                        >
                            {isLoading
                                ? <LoadingPage />
                                : <span>Post</span>
                            }
                        </Button>
                    }
                </SubmitDiv>
            </Wrapper>
            : <SignIn><Span onClick={() => loginWithRedirect()}>Sign in</Span> to leave a comment!</SignIn>
            }
        </>
    )
}

const NumComments = styled.h1`
    font-size: 22px;
    margin-top: 100px;
    margin-bottom: 30px;
`;

const Wrapper = styled.div`
    height: 150px;
    padding: 25px 0px;
    margin-top: -16px;
    border-bottom: 1px solid #ECECEC;
    overflow: hidden;
`;

const PostDiv = styled.div`
    display: flex;
    height: 70%;
`;

const Avatar = styled.img`
    border-radius: 100px;
    margin-bottom: 90px;
    width: 50px;
    height: 50px;
`;

const TextArea = styled.textarea`
    width: 100%;
    border: none;
    outline: none;
    resize: none;
    margin-left: 15px;
    margin-top: 8px;
    font-size: 18px;
    font-family: 'Open Sans', sans-serif;
`;

const SubmitDiv = styled.div`
    display: flex;
    justify-content: right;
    margin-top: 10px;
`;

const CountGrey = styled.p`
    margin-right: 20px;
    color: grey;
`;

const CountRed = styled.p`
    margin-right: 20px;
    color: red;
`;

const CountYellow = styled.p`
    margin-right: 20px;
    color: #D9C21D;
`;

const Button = styled.button`
    color: white;
    font-size: 20px;
    padding: 0 25px;
    border: none;
    border-radius: 8px;
    opacity: 85%;
    background-color: #050a30;
    
    :hover {
        cursor: pointer;
        opacity: 100%;
    }
`;

const DisabledButton = styled.button`
    color: white;
    font-size: 20px;
    padding: 0 25px;
    border: none;
    border-radius: 8px;
    opacity: 30%;
    background-color: #050a30;

    :hover {
        cursor: pointer;
    }
`;

const SignIn = styled.p`
    font-size: 18px;
`;

const Span = styled.span`
    color: #0000EE;
    font-weight: 700;

    :hover {
        cursor: pointer;
    }
`;

export default CommentBox;