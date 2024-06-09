import { VerifyOrganizationMemberAdminRoleFactory } from "../routes/OrganizationMembers/factories";

export default async (req, res, next) => {
    try {
        const role = req.loggedUserInfo.role;
        const validateUserRole = new VerifyOrganizationMemberAdminRoleFactory();
        await validateUserRole.execute(role);
        next();
    } catch (error) {
        return res.status(403).json(error.message);
    }
};
