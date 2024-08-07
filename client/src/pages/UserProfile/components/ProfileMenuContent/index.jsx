import { useAuth } from "../../../../contexts/AuthContext.js";
import { USER_TYPE } from "../../../../constants.js";
import OrganizationAnimals from "./components/OrganizationAnimals/index.jsx";
import OrganizationData from "./components/OrganizationData/index.jsx";
import OrganizationMembers from "./components/OrganizationMembers/index.jsx";
import UserData from "./components/UserData/index.jsx";
import ChangeUserPassword from "./components/ChangeUserPassword/index.jsx";
import ChangeAdopterAddress from "./components/ChangeAdopterAddress/index.jsx";
import ChangeUserPreferences from "./components/ChangeUserPreferences/index.jsx";
import ChangeAdopterLifestyle from "./components/ChangeAdopterLifestyle/index.jsx";
import OrganizationAdoptions from "./components/OrganizationAdoptions/index.jsx";
import AdopterAdoptions from "./components/AdopterAdoptions/index.jsx";
import OrganizationVisits from "./components/OrganizationVisits/index.jsx";
import AdopterVisits from "./components/AdopterVisits/index.jsx";

export default function ProfileMenuContent({ content, setContent }) {
    const { user } = useAuth();
    return (
        <>
            {user.type === USER_TYPE.ORGANIZATION ? (
                <>
                    {content === "Dashboard" && <h1>Dashboard</h1>}
                    {content === "Organization" && (
                        <OrganizationData user={user} />
                    )}
                    {content === "Adoptions" && (
                        <OrganizationAdoptions setContent={setContent} />
                    )}
                    {content === "Animals" && (
                        <OrganizationAnimals setContent={setContent} />
                    )}
                    {content === "Visits" && <OrganizationVisits user={user} />}
                    {content === "Team" && <OrganizationMembers user={user} />}
                    {content === "MyData" && <UserData user={user} />}
                </>
            ) : (
                <>
                    {content === "MyData" && <UserData user={user} />}
                    {content === "Adoptions" && (
                        <AdopterAdoptions user={user} />
                    )}
                    {content === "Visits" && <AdopterVisits user={user} />}

                    {content === "Address" && <ChangeAdopterAddress />}
                    {content === "Preferences" && <ChangeUserPreferences />}
                    {content === "Lifestyle" && <ChangeAdopterLifestyle />}
                </>
            )}
            {content === "ChangePassword" && <ChangeUserPassword user={user} />}
        </>
    );
}
