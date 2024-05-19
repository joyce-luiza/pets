import {
  CreateOrganizationMemberFactory,
  GetByIdOrganizationMemberFactory,
  GetByEmailOrganizationMemberFactory,
  UpdateProfileImageMemberFactory,
} from "../../routes/OrganizationMembers/factories";
import { File, OrganizationMember } from "../domains";

export default class OrganizationMemberController {
  constructor() {
    this.create = this.create.bind(this);
    this.getById = this.getById.bind(this);
    this.getByEmail = this.getByEmail.bind(this);
  }

  async create(req, res, next) {
    const member = new OrganizationMember(req.body);
    const factory = new CreateOrganizationMemberFactory();
    const result = await factory.execute(member);
    res.json(result);
  }

  async getById(req, res, next) {
    const member = new OrganizationMember({ id: req.params.id });
    const factory = new GetByIdOrganizationMemberFactory();
    const result = await factory.execute(member);
    res.json(result);
  }

  async getByEmail(req, res, next) {
    const member = new OrganizationMember({ email: req.params.email });
    const factory = new GetByEmailOrganizationMemberFactory();
    const result = await factory.execute(member);
    res.json(result);
  }

  async updateProfileImage(req, res, next) {
    const memberFile = new File(req.file);
    const factory = new UpdateProfileImageMemberFactory();
    const result = await factory.execute(memberFile, {}, req.loggedUserInfo);
    res.json(result);
  }
}
