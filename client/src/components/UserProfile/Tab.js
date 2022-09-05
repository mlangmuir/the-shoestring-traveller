import { useContext } from "react";
import styled from "styled-components";
import { Context } from "../../Context";
import { CgProfile } from "react-icons/cg";
import { AiOutlineHeart } from "react-icons/ai";
import { BiBookmark } from "react-icons/bi";
import { BiCommentDetail } from "react-icons/bi";

const Tab = () => {

    const { profileTab, setProfileTab } = useContext(Context);

    return (
        <>
            <Wrapper>
                <Button
                    onClick={() => setProfileTab("profile")}
                    style={{
                        backgroundColor: profileTab === "profile" && "#e7f0fe",
                        color: profileTab === "profile" && "darkblue",
                    }}
                >
                    <CgProfile size={40} />
                    <Text>Profile</Text>
                </Button>
                <Button
                    onClick={() => setProfileTab("favourites")}
                    style={{
                        backgroundColor: profileTab === "favourites" && "#e7f0fe",
                        color: profileTab === "favourites" && "darkblue",
                    }}
                >
                    <AiOutlineHeart size={40} />
                    <Text>Favourites</Text>
                </Button>
                <Button
                    onClick={() => setProfileTab("readLater")}
                    style={{
                        backgroundColor: profileTab === "readLater" && "#e7f0fe",
                        color: profileTab === "readLater" && "darkblue",
                    }}
                >
                    <BiBookmark size={40} />
                    <Text>Read Later</Text>
                </Button>
                <Button
                    onClick={() => setProfileTab("comments")}
                    style={{
                        backgroundColor: profileTab === "comments" && "#e7f0fe",
                        color: profileTab === "comments" && "darkblue",
                    }}
                >
                    <BiCommentDetail size={40} />
                    <Text>Comments</Text>
                </Button>
            </Wrapper>

            <MobileWrapper>
                <CgProfile
                    size={40}
                    onClick={() => {
                        setProfileTab("profile");
                        window.scrollTo(0,0);
                    }}
                    style={{
                        color: profileTab === "profile" && "darkblue",
                    }}
                />
                <AiOutlineHeart
                    size={40}
                    onClick={() => {
                        setProfileTab("favourites");
                        window.scrollTo(0,0);
                    }}
                    style={{
                        color: profileTab === "favourites" && "darkblue",
                    }}
                />
                <BiBookmark
                    size={40}
                    onClick={() => {
                        setProfileTab("readLater");
                        window.scrollTo(0,0);
                    }}
                    style={{
                        color: profileTab === "readLater" && "darkblue",
                    }}
                />
                <BiCommentDetail
                    size={40}
                    onClick={() => {
                        setProfileTab("comments");
                        window.scrollTo(0,0);
                    }}
                    style={{
                        color: profileTab === "comments" && "darkblue",
                    }}
                />
            </MobileWrapper>
        </>
    )
}

const Wrapper = styled.div`
    position: absolute;

    @media (max-width: 675px) {
        display: none;
    }
`;

const Button = styled.div`
    display: flex;
    align-items: center;
    font-size: 18px;
    padding: 0 80px 0 30px;
    font-weight: 700;
    border-top-right-radius: 40px;
    border-bottom-right-radius: 40px;

    :hover {
        cursor: pointer;
    }

    @media (max-width: 675px) {
        border-radius: 40px;
        padding: 0 30px;
    }
`;

const Text = styled.p`
    margin-left: 18px;
`;

const MobileWrapper = styled.div`
    display: none;

    @media (max-width: 675px) {
        display: flex;
        justify-content: space-evenly;
        width: 100%;
        padding: 10px 0;
        background-color: white;
        border-bottom: 1px solid lightgrey;
        margin-top: -50px;
        margin-bottom: 50px;
    }
`;

export default Tab;