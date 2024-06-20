import { VerifyOrganizationMemberAdminRoleFactory } from "../routes/OrganizationMembers/factories";

export default async (req, res, next) => {
    try {
        const { role, id } = req.loggedUserInfo;
        const { memberId } = req.params;

        if (id === memberId) {
            return next();
        }
        const validateUserRole = new VerifyOrganizationMemberAdminRoleFactory();
        await validateUserRole.execute(role);
        next();
    } catch (error) {
        return res.status(403).json(error.message);
    }
};
