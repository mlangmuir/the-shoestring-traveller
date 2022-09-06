import styled from "styled-components";
import aboutMePoster from "../../assets/about-me-poster.png";
import signUpPoster from "../../assets/sign-up-poster.png";
import discoverChobePoster from "../../assets/discover-chobe.png";
import tipsPoster from "../../assets/tips-poster.png";
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate, useParams } from "react-router-dom";

const Sidebar = () => {

    const { isAuthenticated, loginWithRedirect } = useAuth0();

    const { articleId } = useParams();

    const navigate = useNavigate();

    return (
        <SidebarDiv>
            <AboutMePoster
                src={aboutMePoster}
                alt="About me poster about the Shoestring Traveller"
                onClick={() => {
                    navigate("/about");
                    window.scrollTo(0,0);
                }}
            />
            {!isAuthenticated &&
            <SignUpPoster
                src={signUpPoster}
                alt="Poster about signing up for Shoestring Traveller account"
                onClick={() => loginWithRedirect()}
            />
            }
            {articleId !== "0003" &&
            <DiscoverChobePoster
                src={discoverChobePoster}
                alt="Poster about the Chobe safari"
                onClick={() => {
                    navigate("/articles/id/0003");
                    window.scrollTo(0,0);
                }}
            />
            }
            {articleId!== "0002" &&
            <TipsPoster
                src={tipsPoster}
                alt="Poster on budget travel tips"
                onClick={() => {
                    navigate("/articles/id/0002");
                    window.scrollTo(0,0);
                }}
            />
            }
        </SidebarDiv>
    )
}


const SidebarDiv = styled.div`
    width: 30%;
`;

const AboutMePoster = styled.img`
    width: 100%;

    :hover {
        cursor: pointer;
    }
`;

const SignUpPoster = styled.img`
    width: 100%;
    margin-top: 100px;

    :hover {
        cursor: pointer;
};
`

const DiscoverChobePoster = styled.img`
    width: 100%;
    margin-top: 100px;

    :hover {
        cursor: pointer;
    }
`; 

const TipsPoster = styled.img`
    width: 100%;
    margin-top: 100px;

    :hover {
        cursor: pointer;
    }
`; 

export default Sidebar;