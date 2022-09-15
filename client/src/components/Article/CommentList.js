import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../Context";
import styled from "styled-components";
import LoadingPage from "../LoadingPage";
import CommentMenu from "./CommentMenu";

const CommentList = () => {

    const { isLoading, setIsLoading, setArticleComments, articleComments } = useContext(Context);

    const { articleId } = useParams();

    useEffect(() => {
        fetch(`/api/article-comments/${articleId}`)
            .then((res) => res.json())
            .then((data) => {
                setArticleComments(data.data);
                setIsLoading(false);
            })
    },[setArticleComments]);

    return (
        <>
            {!isLoading
            ? <Wrapper>
                {articleComments.reverse().map((item, index) => {
                    return (
                        <Container>
                            <CommentWrapper key={index} className="comment-wrapper">
                                <Image src={item?.user?.picture} />
                                <TextDiv>
                                    <Name>{item?.user?.name}</Name>
                                    <Date>{item?.date}</Date>
                                    <Comment>{item?.comment}</Comment>
                                </TextDiv>
                            </CommentWrapper>
                            <CommentMenu commentId={item?.id} />  
                        </Container>
                    )
                })}
            </Wrapper>
            : <LoadingPage />
            }
        </>
    )
}

const Wrapper = styled.div`
    margin-top: 30px;
    overflow: hidden;
`;

const Container = styled.div`
    display: flex;
    justify-content: space-between;
`;

const CommentWrapper = styled.div`
    display: flex;
    padding: 10px 0;
`;

const Image = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50px;
`;

const TextDiv = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    margin-top: -15px;
`;

const Name = styled.p`
    font-size: 16px;
    font-weight: 600;

    @media (max-width: 500px) {
        font-size: 14px;
    }
`;

const Date = styled.p`
    font-size: 12px;
    color: grey;
    margin-top: -15px;
`;

const Comment = styled.p`
    margin-top: -5px;
    text-align: justify;
    font-size: 16px;

    @media (max-width: 500px) {
        font-size: 14px;
    }
`;

export default CommentList;