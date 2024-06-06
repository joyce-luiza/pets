import { useAuth } from "../../../../contexts/AuthContext.js";
import { USER_TYPE } from "../../../../constants.js";
import OrganizationAnimals from "./components/OrganizationAnimals/index.jsx";
import OrganizationData from "./components/OrganizationData/index.jsx";
import OrganizationMembers from "./components/OrganizationMembers/index.jsx";
import UserData from "./components/UserData/index.jsx";

export default function ProfileMenuContent({ content }) {
    const { user } = useAuth();
    return (
        <>
            {user.type === USER_TYPE.ORGANIZATION ? (
                <>
                    {content === "Dashboard" && <h1>Dashboard</h1>}
                    {content === "Organization" && (
                        <OrganizationData user={user} />
                    )}
                    {content === "Adoptions" && <h1>Adoptions</h1>}
                    {content === "Animals" && <OrganizationAnimals />}
                    {content === "Visits" && <h1>Visits</h1>}
                    {content === "Team" && <OrganizationMembers user={user} />}
                    {content === "MyData" && <UserData user={user} />}
                    {content === "ChangePassword" && <h1>ChangePassword</h1>}
                    {content === "Logout" && <h1>Logout</h1>}
                </>
            ) : (
                <>
                    {content === "MyData" && <h1>MyData</h1>}
                    {content === "Adoptions" && <h1>Adoptions</h1>}
                    {content === "Address" && <h1>Address</h1>}
                    {content === "Preferences" && <h1>Preferences</h1>}
                    {content === "ChangePassword" && <h1>ChangePassword</h1>}
                    {content === "Logout" && <h1>Logout</h1>}
                </>
            )}
        </>
    );
}