import { useContext } from "react";

import UserInfo from "../components/UserInfo"
import AuthContext from "../context/AuthContext";

export default function UserProfile() {
    const { user, logoutUser } = useContext(AuthContext);

    return (
        <section style={{height:"100vh"}}>
                <UserInfo user={user}></UserInfo>
        </section>
    )
}