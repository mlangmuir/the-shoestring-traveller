import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import { Context } from "../Context";

const UserProfile = () => {

    const { setLoggedIn } = useContext(Context);

    const { logout, isAuthenticated, user } = useAuth0();

    const handleLogout = () => {
        logout({returnTo: window.location.origin});
        setLoggedIn(false);
    }
    
    return (
        isAuthenticated && (
            <div>
                <img src={user.picture} alt={user.name} width={40} height={40} />
                <h2>{user.name}</h2>
                <p>{user.email}</p>
                <button onClick={handleLogout}>
                    Logout
                </button>
            </div>
        )
    )
}

export default UserProfile;