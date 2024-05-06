import OrganizationData from "../components/OrganizationData/index.jsx";
import ChangePassword from "../components/ChangePassword/index.jsx";
import UserData from "../components/UserData.jsx/index.jsx";

export default function OrganizationProfile({ content, user }) {
    return (
        <>
            {content === "organizationData" && <OrganizationData user={user} />}
            {content === "userData" && <UserData user={user} />}
            {content === "password" && <ChangePassword user={user} />}
        </>
    );
}
