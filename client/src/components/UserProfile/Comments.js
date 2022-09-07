import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../Context";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const Comments = () => {

    const { isLoading, setIsLoading } = useContext(Context);

    const { userId } = useParams();

    const { user } = useAuth0();

    const [userComments, setUserComments] = useState([]);

    console.log(userId)

    useEffect(() => {
        if (user) {
        fetch(`/api/comments/${userId}`)
            .then((res) => res.json())
            .then((data) => {
                setUserComments(data.data);
            })
        }
    },[setUserComments]);

    console.log(userComments)

    return (
        <Wrapper>
            <Title>Comments</Title>
            {userComments.length !== 0 ?
                <div>
                    {userComments.reverse().map((item, index) => {
                        return (
                            <CommentWrapper key={index}>
                                <Image src={item?.user?.picture} />
                                <TextDiv>
                                    <Name>{item?.user?.name}</Name>
                                    <Date>{item?.date}</Date>
                                    <Comment>{item?.comment}</Comment>
                                </TextDiv>
                            </CommentWrapper>
                        )
                    })}
                </div>
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
    font-size: 14px;
    font-weight: 600;
`;

const Date = styled.p`
    font-size: 11px;
    color: grey;
    margin-top: -15px;
`;

const Comment = styled.p`
    margin-top: -5px;
    text-align: justify;
    font-size: 14px;
`;

const NoComments = styled.div`
    height: 42vh;
`;

export default Comments;