import { VerifyOrganizationMemberAdminRoleFactory } from "../routes/OrganizationMembers/factories";

export default async (req, res, next) => {
    try {
        const id = req.loggedUserInfo.userId;
        const validateUserRole = new VerifyOrganizationMemberAdminRoleFactory();
        await validateUserRole.execute(id);
        next();
    } catch (error) {
        return res.status(403).json(error.message);
    }
};
