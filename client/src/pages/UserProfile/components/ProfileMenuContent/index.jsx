import { useAuth } from "../../../../contexts/AuthContext.js";
import { USER_TYPE } from "../../../../constants.js";
import OrganizationAnimals from "./components/OrganizationAnimals/index.jsx";

export default function ProfileMenuContent({ content, setContent }) {
  const { user } = useAuth();
  return (
    <>
      {user.type === USER_TYPE.ORGANIZATION ? (
        <>
          {content === "Dashboard" && <h1>Dashboard</h1>}
          {content === "Organization" && <h1>Organization</h1>}
          {content === "Adoptions" && <h1>Adoptions</h1>}
          {content === "Animals" && (
            <OrganizationAnimals setContent={setContent} />
          )}
          {content === "Visits" && <h1>Visits</h1>}
          {content === "Team" && <h1>Team</h1>}
          {content === "MyData" && <h1>MyData</h1>}
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
