import { useAuth } from '../../../../contexts/AuthContext.js';
import { USER_TYPE } from '../../../../constants.js';
import OrganizationAnimals from './components/OrganizationAnimals/index.jsx';
import OrganizationData from './components/OrganizationData/index.jsx';
import OrganizationMembers from './components/OrganizationMembers/index.jsx';
import UserData from './components/UserData/index.jsx';
import ChangeUserPassword from './components/ChangeUserPassword/index.jsx';

export default function ProfileMenuContent({ content, setContent }) {
	const { user } = useAuth();
	return (
		<>
			{user.type === USER_TYPE.ORGANIZATION ? (
				<>
					{content === 'Dashboard' && <h1>Dashboard</h1>}
					{content === 'Organization' && <OrganizationData user={user} />}
					{content === 'Adoptions' && <h1>Adoptions</h1>}
					{content === 'Animals' && (
						<OrganizationAnimals setContent={setContent} />
					)}
					{content === 'Visits' && <h1>Visits</h1>}
					{content === 'Team' && <OrganizationMembers user={user} />}
					{content === 'MyData' && <UserData user={user} />}
					{content === 'Logout' && <h1>Logout</h1>}
				</>
			) : (
				<>
					{content === 'MyData' && <UserData user={user} />}
					{content === 'Adoptions' && <h1>Adoptions</h1>}
					{content === 'Address' && <h1>Address</h1>}
					{content === 'Preferences' && <h1>Preferences</h1>}
					{content === 'Logout' && <h1>Logout</h1>}
				</>
			)}
			{content === 'ChangePassword' && <ChangeUserPassword user={user} />}
		</>
	);
}
