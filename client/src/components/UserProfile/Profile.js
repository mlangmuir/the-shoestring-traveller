import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import { Context } from "../../Context";
import ErrorPage from "../ErrorPage";
import Tab from "./Tab";
import Favourites from "./Favourites";
import ReadLater from "./ReadLater";
import Comments from "./Comments";
import styled from "styled-components";

const Profile = () => {

    const { logout, isAuthenticated, user } = useAuth0();

    const { profileTab } = useContext(Context);

    const handleLogout = () => {
        logout({returnTo: window.location.origin});
    }
    
    return (
        <>
        {isAuthenticated
            ? <Wrapper>
                <Tab />
                <AllTabsDiv>
                    {profileTab === "profile" &&
                        <ProfileDiv>
                            <Image src={user.picture} alt={user.name} width={40} height={40} />
                            {!user.name.includes("@")
                                ? <Name>Welcome, {user.name}</Name>
                                : <Name>Welcome, {user.nickname}</Name>
                            }
                            <Text>Thank you for joining the Shoestring Traveller community!</Text>
                            <Text>You can now comment on our articles. We would love to hear from you!</Text>
                            <Text>You can also add articles to your "Favourites" and "Read Later" lists.</Text>
                            <Button onClick={handleLogout}>
                                Sign out
                            </Button>
                        </ProfileDiv>
                    }
                    {profileTab === "favourites" &&
                        <Favourites />
                    }
                    {profileTab === "readLater" &&
                        <ReadLater />
                    }
                    {profileTab === "comments" &&
                        <Comments />
                    }
                </AllTabsDiv>
            </Wrapper>
            : <ErrorPage />
        }
        </>
    )
}

const Wrapper = styled.div`

    @media (max-width: 675px) {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 50px;
    }
`;

const AllTabsDiv = styled.div`
    margin: 75px 0 75px 20%;
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: 1050px) {
        margin-left: 25%;
    }

    @media (max-width: 800px) {
        width: 50%;
        margin-left: 40%;
    }

    @media (max-width: 675px) {
        margin-top: 0;
        margin-bottom: 50px;
        margin-left: 0;
        width: 95%;
    }
`;

const ProfileDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
`;

const Image = styled.img`
    width: 125px;
    height: 125px;
    border-radius: 100px;
`;

const Name = styled.h1`
    font-size: 28px;
    text-align: center;

    @media (max-width: 850px) {
        font-size: 24px;
    }

    @media (max-width: 675px) {
        font-size: 20px;
    }
`;

const Text = styled.p`
    font-size: 18px;
    text-align: center;
    line-height: 20px;
`;

const Button = styled.button`
    background-color: darkblue;
    color: white;
    height: 40px;
    width: 120px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    margin-top: 30px;

    :hover {
        cursor: pointer;
        opacity: 70%;
    }
`;

export default Profile;