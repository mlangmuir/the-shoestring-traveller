import styled from "styled-components";
import Searchbar from "../components/Searchbar";
import { NavLink } from "react-router-dom";
import siteLogo from "../assets/logo.png"

const Header = () => {

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
            </Wrapper>
        </NavBar>
    )
}

const NavBar = styled.div`
    display: flex;
    background-color: #050a30;
    width: 100%;
    align-items: center;
    justify-content: space-evenly;
    height: 100%;
`;

const Wrapper = styled.div`
    width: 90%;
    display: flex;
    justify-content: center;
    margin-right: 100px;

    @media (max-width: 1050px) {
        flex-direction: column;
        align-items: center;
        margin-right: 0;
    }
`;

const Logo = styled.img`
    height: 100px;
    padding: 5px;
    margin-left: 100px;
    margin-right: 100px;
`;

const NavDiv = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    @media (max-width: 600px) {
        flex-direction: column;
        align-items: center;
    }
`;

const StyledNavLink = styled(NavLink)`
    color: white;
    text-decoration: none;
    font-size: 20px;

    @media (max-width: 600px) {
        margin-top: 20px;
    }
`;

const Container = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;

    @media (max-width: 1050px) {
        width: 90%;
    }
`;

export default Header;