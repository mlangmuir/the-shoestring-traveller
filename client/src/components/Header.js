import styled from "styled-components";
import Searchbar from "../components/Searchbar";
import { useNavigate, NavLink } from "react-router-dom";
import siteLogo from "../assets/logo.png"
import loginIcon from "../assets/login-icon.png";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {

    const navigate = useNavigate();

    const { loginWithRedirect, isAuthenticated, user } = useAuth0();

    if (user) {
        console.log(user.picture)
    }

    return (
        <NavBar>
            <Wrapper>
                <NavLink to="/">
                    <Logo src={siteLogo} alt="The Shoestring Traveller Logo"/>
                </NavLink>
                <Container>
                    <Searchbar />
                    <NavDiv>
                        <StyledNavLink to="/">Home</StyledNavLink>
                        <StyledNavLink to="/about">About</StyledNavLink>
                        <StyledNavLink to="/destinations">Destinations</StyledNavLink>
                        <StyledNavLink to="/travel-tips">Travel Tips</StyledNavLink>
                        <StyledNavLink to="/contact">Contact</StyledNavLink>
                    </NavDiv>
                </Container>
                {isAuthenticated && user
                    ? <LoginDiv>
                        {user.picture
                            ? <UserPicture src={user.picture} alt={user.name} onClick={() => navigate("/profile")}/>
                            : <LoginIcon src={loginIcon} alt="Login icon" onClick={() => navigate("/profile")}/>
                        }
                        <LoginText onClick={() => navigate("/profile")}>Hello, {user.given_name ? user.given_name : user.email}</LoginText>
                    </LoginDiv>
                    : <LoginDiv>
                        <LoginIcon src={loginIcon} alt="Login icon" onClick={() => loginWithRedirect()}/>
                        <LoginText onClick={() => loginWithRedirect()}>LOGIN/SIGN UP</LoginText>
                    </LoginDiv>
                }
            </Wrapper>
        </NavBar>
    )
}

const NavBar = styled.div`
    display: flex;
    justify-content: center;
    background-color: #050a30;
    height: 100px;
`;

const Wrapper = styled.div`
    width: 95%;
    display: flex;
    justify-content: space-between;

    @media (max-width: 1050px) {
        flex-direction: column;
        align-items: center;
        margin-right: 0;
    }
`;

const Container = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    margin-top: -5px;

    @media (max-width: 1050px) {
        width: 90%;
    }
`;

const Logo = styled.img`
    height: 85px;
    padding: 5px;
`;

const NavDiv = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: -8px;

    @media (max-width: 600px) {
        flex-direction: column;
        align-items: center;
    }
`;

const StyledNavLink = styled(NavLink)`
    color: white;
    text-decoration: none;
    font-size: 18px;

    @media (max-width: 600px) {
        margin-top: 20px;
    }
`;

const LoginDiv = styled.div`
    display: flex;
    height: 100px;
    justify-content: center;
    align-items: center;
`;

const UserPicture = styled.img`
    height: 35px;
    width: 35px;
    border-radius: 50px;

    :hover{
        cursor: pointer;
    }
`;

const LoginIcon = styled.img`
    height: 25px;
    width: 25px;

    :hover{
        cursor: pointer;
    }
`;

const LoginText = styled.p`
    color: white;
    font-size: 14px;
    margin-left: 7px;

    :hover{
        cursor: pointer;
    }
`;

export default Header;