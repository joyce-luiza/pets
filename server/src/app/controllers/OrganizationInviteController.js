import {
    CreateOrganizationInviteFactory,
    SendInvitationEmailFactory,
    ValidateInvitationTokenFactory,
    GetByIdOrganizationInviteFactory,
} from "../../routes/OrganizationInvites/factories";
import { OrganizationInvite } from "../domains";

export default class OrganizationInviteController {
    constructor() {
        this.create = this.create.bind(this);
        this.getById = this.getById.bind(this);
        this.validateToken = this.validateToken.bind(this);
    }

    async create(req, res, next) {
        let results = [];
        const factory = new CreateOrganizationInviteFactory();
        const emailSender = new SendInvitationEmailFactory();
        const invites = req.body.invites.map((email) => ({
            invitedEmail: email,
            organizationId: req.loggedUserInfo.organizationId,
            organizationAdminId: req.loggedUserInfo.userId,
        }));
        await Promise.all(
            invites.map(async (invite) => {
                const createdInvite = await factory.execute(invite);
                results.push(createdInvite);
                await emailSender.execute(createdInvite);
            })
        );
        res.json(results);
    }

    async validateToken(req, res, next) {
        const token = new OrganizationInvite({ token: req.params.token });
        const factory = new ValidateInvitationTokenFactory();
        const result = await factory.execute(token);
        res.json(result);
    }

    async getById(req, res, next) {
        const invite = new OrganizationInvite({ id: req.params.id });
        const factory = new GetByIdOrganizationInviteFactory();
        const result = await factory.execute(invite);
        res.json(result);
    }
}
