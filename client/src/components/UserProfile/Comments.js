import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Context } from "../../Context";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const Comments = () => {

    const { setIsLoading } = useContext(Context);

    const { user } = useAuth0();

    const navigate = useNavigate();

    const [userComments, setUserComments] = useState([]);

    useEffect(() => {
        if (user) {
        fetch(`/api/user-comments/${user.email}`)
            .then((res) => res.json())
            .then((data) => {
                setUserComments(data.data);
                setIsLoading(false);
            })
        }
    },[user]);

    return (
        <Wrapper>
            <Title>Comments</Title>
            {userComments.length !== 0 ?
                <Container>
                    {userComments.reverse().map((item, index) => {
                        return (
                            <CommentWrapper key={index}>
                                <TextDiv>
                                    <Comment>{item?.comment}</Comment>
                                    <ArticleTitle>Commented on <Span onClick={()=> navigate(`/articles/id/${item?.article?.id}`)}>{item?.article?.title}</Span></ArticleTitle>
                                    <Date>{item?.date}</Date>
                                </TextDiv>
                                <Image src={item?.article?.coverImgSrc?.imgSrc} onClick={()=> navigate(`/articles/id/${item?.article?.id}`)}/>
                            </CommentWrapper>
                        )
                    })}
                </Container>
                : <NoComments>
                        <p>You haven't posted any comments yet.</p>
                </NoComments>
            }
        </Wrapper>
    )
}

const Wrapper = styled.div`
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-left: 50px;
    margin-bottom: 30px;

    @media (max-width: 675px) {
        margin-left: 0;
    }
`;

const Title = styled.h1`
    border-bottom: 1px solid lightgrey;
    width: 80%;
    text-align: center;
    padding-bottom: 30px;
`;

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const CommentWrapper = styled.div`
    width: 80%;
    display: flex;
    padding: 30px 0;
    min-height: 100px;
    justify-content: center;
    border-bottom: 1px dotted lightgrey;

    @media (max-width: 950px) {
        flex-direction: column;
        align-items: center;
        width: 100%;
    }
`;

const Image = styled.img`
    height: 100px;
    width: 150px;
    object-fit: cover;
    object-position: 0 -8px;

    :hover {
        cursor: pointer;
    }
`;

const TextDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-right: 20px;
    height: 100%;
    width: 50%;

    @media (max-width: 950px) {
        flex-direction: column;
        align-items: center;
        width: 75%;
        text-align: center;
        margin: 0;
    }
`;

const Comment = styled.p`
    font-size: 16px;
    font-weight: 600;
    margin-top: 0px;
`;

const ArticleTitle = styled.p`
    font-size: 16px;
    margin-top: -10px;
`;

const Span = styled.span`
    color: #4636be;
    font-weight: 600;

    :hover {
        cursor: pointer;
    }
`;

const Date = styled.p`
    font-size: 14px;
    color: grey;
    margin-top: -10px;
`;

const NoComments = styled.div`
    height: 42vh;
`;

export default Comments;