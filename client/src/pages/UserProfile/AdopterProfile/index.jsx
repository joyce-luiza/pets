import UserData from "../components/UserData.jsx/index.jsx";
import ChangePassword from "../components/ChangePassword/index.jsx";

export default function AdopterProfile({ content, user }) {
    return (
        <>
            {content === "userData" && <UserData user={user} />}
            {content === "password" && <ChangePassword />}
        </>
    );
}
