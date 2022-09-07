import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../Context";
import styled from "styled-components";

const CommentList = () => {

    const { isLoading, setIsLoading, setArticleComments, articleComments } = useContext(Context);

    const { articleId } = useParams();

    useEffect(() => {
        fetch(`/api/comments/${articleId}`)
            .then((res) => res.json())
            .then((data) => {
                setArticleComments(data.data);
            })
    },[setArticleComments]);

    console.log(articleComments)

    return (
        <Wrapper>
            {articleComments.map((item, index) => {
                return (
                    <p key={index}>
                        {item.comment}
                    </p>
                )
            })}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 80%;
`;

export default CommentList;