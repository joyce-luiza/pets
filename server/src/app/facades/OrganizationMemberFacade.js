import AbstractFacade from "../abstract/AbstractFacade";
import {
    GetByEmailCommand,
    GetMembersByOrganizationIdCommand,
    UpdateMemberRoleCommand,
} from "../../routes/OrganizationMembers/commands";
import { UpdateProfileImageCommand } from "../commands";

export default class OrganizationMemberFacade extends AbstractFacade {
    constructor(controller) {
        super(controller);
        this.getByEmail = this.getByEmail.bind(this);
        this.updateProfileImage = this.updateProfileImage.bind(this);
        this.getMembersByOrganizationId =
            this.getMembersByOrganizationId.bind(this);
        this.updateMemberRole = this.updateMemberRole.bind(this);
    }

    async getByEmail(req, res, next) {
        try {
            const command = new GetByEmailCommand(this.controller);
            await command.execute(req, res, next);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async updateProfileImage(req, res, next) {
        try {
            const command = new UpdateProfileImageCommand(this.controller);
            await command.execute(req, res, next);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async getMembersByOrganizationId(req, res, next) {
        try {
            const command = new GetMembersByOrganizationIdCommand(
                this.controller
            );
            await command.execute(req, res, next);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async updateMemberRole(req, res, next) {
        try {
            const command = new UpdateMemberRoleCommand(this.controller);
            await command.execute(req, res, next);
        } catch (error) {
            this.handleError(res, error);
        }
    }
}
