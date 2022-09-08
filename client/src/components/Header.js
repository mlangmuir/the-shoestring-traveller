import styled from "styled-components";
import Searchbar from "../components/Searchbar";
import { useNavigate, NavLink } from "react-router-dom";
import siteLogo from "../assets/logo.png"
import loginIcon from "../assets/login-icon.png";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useState } from "react";
import { Context } from "../Context";
import hamburger from "../assets/hamburger-icon.png";

const Header = () => {

    const navigate = useNavigate();

    const { setProfileTab } = useContext(Context);

    const [clickBurger, setClickBurger] = useState(false);

    const { loginWithRedirect, isAuthenticated, user } = useAuth0();

    const handleLogin = () => {
        loginWithRedirect();
        setProfileTab("profile");
    }

    const handleClickProfile = () => {
        navigate("/profile");
        setProfileTab("profile");
    }

    const handleClickBurger = () => {
        setClickBurger(!clickBurger);
    }

    return (
        <>
        <NavBar>
            <Wrapper>
                <NavLink to="/">
                    <Logo
                        src={siteLogo}
                        onClick={() => clickBurger && handleClickBurger()}
                        alt="The Shoestring Traveller Logo"
                    />
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
                                ? <UserPicture src={user.picture} alt={user.name} onClick={handleClickProfile}/>
                                : <LoginIcon src={loginIcon} alt="Login icon" onClick={handleClickProfile}/>
                            }
                            <LoginText onClick={handleClickProfile}>My Profile</LoginText>
                        </LoginDiv>
                        : <LoginDiv>
                            <LoginIcon src={loginIcon} alt="Login icon" onClick={handleLogin}/>
                            <LoginText onClick={handleLogin}>Sign In / Sign Up</LoginText>
                        </LoginDiv>
                    }
            </Wrapper>
            <Hamburger src={hamburger} onClick={handleClickBurger}/>
        </NavBar>

        <MobileWrapper  style={{display: !clickBurger && "none"}}>
        <MobileContainer>
            <MobileNavDiv>
                <MobileStyledNavLink to="/" onClick={handleClickBurger}>Home</MobileStyledNavLink>
                <MobileStyledNavLink to="/about" onClick={handleClickBurger}>About</MobileStyledNavLink>
                <MobileStyledNavLink to="/destinations" onClick={handleClickBurger}>Destinations</MobileStyledNavLink>
                <MobileStyledNavLink to="/travel-tips" onClick={handleClickBurger}>Travel Tips</MobileStyledNavLink>
                <MobileStyledNavLink to="/contact" onClick={handleClickBurger}>Contact</MobileStyledNavLink>
            </MobileNavDiv>
            <Searchbar />
        </MobileContainer>
        {isAuthenticated && user
            ? <MobileLoginDiv style={{display: !clickBurger && "none"}} onClick={handleClickBurger}>
                {user.picture
                    ? <MobileUserPicture src={user.picture} alt={user.name} onClick={handleClickProfile}/>
                    : <MobileLoginIcon src={loginIcon} alt="Login icon" onClick={handleClickProfile}/>
                }
                <MobileLoginText onClick={handleClickProfile}>My Profile</MobileLoginText>
            </MobileLoginDiv>
            : <MobileLoginDiv style={{display: !clickBurger && "none"}}>
                <MobileLoginIcon src={loginIcon} alt="Login icon" onClick={handleLogin}/>
                <MobileLoginText onClick={handleLogin}>Sign In / Sign Up</MobileLoginText>
            </MobileLoginDiv>
        }
    </MobileWrapper>
    </>
    )
}

const NavBar = styled.div`
    display: flex;
    justify-content: center;
    background-color: #050a30;
    height: 100px;
`;

const Wrapper = styled.div`
    width: 75%;
    display: flex;
    justify-content: space-between;

    @media (max-width: 1450px) {
        width: 95%;
    }
`;

const Logo = styled.img`
    height: 85px;
    padding: 5px;

    @media (max-width: 725px) {
        margin-left: 20px;
    }
`;

const Container = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    margin-top: -5px;

    @media (max-width: 1050px) {
        width: 60%;
    }

    @media (max-width: 725px) {
        display: none;
    }
`;

const NavDiv = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: -8px;
`;

const StyledNavLink = styled(NavLink)`
    color: white;
    text-decoration: none;
    font-size: 18px;

    @media (max-width: 775px) {
        font-size: 16px;
    }
`;

const LoginDiv = styled.div`
    display: flex;
    height: 100px;
    justify-content: center;
    align-items: center;

    @media (max-width: 725px) {
        display: none;
    }
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
    margin-left: 10px;

    :hover{
        cursor: pointer;
    }
`;

const MobileWrapper = styled.div`
    display: none;

    @media (max-width: 725px) {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding-top: 20px;
        background-color: #303133;
    }
`;

const MobileContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const MobileNavDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const MobileStyledNavLink = styled(NavLink)`
    text-decoration: none;
    color: white;
    font-size: 20px;
    line-height: 35px;
`;

const MobileLoginDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const MobileUserPicture = styled.img`
    height: 35px;
    width: 35px;
    border-radius: 50px;

    :hover{
        cursor: pointer;
    }
`;

const MobileLoginIcon = styled.img`
    height: 25px;
    width: 25px;

    :hover{
        cursor: pointer;
    }
`;

const MobileLoginText = styled.p`
    color: white;
    font-size: 14px;
    margin-top: 5px;

    :hover{
        cursor: pointer;
    }
`;

const Hamburger = styled.img`
    display: none;
    width: 35px;
    height: 35px;
    margin-top: 30px;
    padding-right: 20px;

    :hover {
        cursor: pointer;
    }

    @media (max-width: 725px) {
        display: block;
    }
`;

export default Header;