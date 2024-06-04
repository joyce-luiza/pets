import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { File } from "../../../app/domains";
import { OrganizationMemberRepository } from "../../../app/repositories";
import { uploadFile } from "../../../app/utils/uploadFile";

/**
 *
 *
 * @extends AbstractStrategy
 */
export default class FindOrganizationMemberAndUpdateProfileImageStrategy extends AbstractStrategy {
  /**
   *
   * @param {OrganizationMemberRepository} organizationMemberRepository
   */
  constructor(organizationMemberRepository) {
    super();
    this.organizationMemberRepository = organizationMemberRepository;
  }

  /**
   *
   * @param {File} file - The data object containing file properties.
   */
  async execute(file, dto, loggedUserInfo) {
    const member = await this.organizationMemberRepository.findById(
      loggedUserInfo.userId
    );

    if (!member) {
      this.throwError("Não foi possível recuperar os dados do adotante.");
      return;
    }

    let imageUrl = "";

    if (member.imageUrl) {
      imageUrl = await uploadFile({
        file,
        folder: "profile",
        previousFilePath: member.imageUrl,
      });
    } else {
      imageUrl = await uploadFile({ file, folder: "profile" });
    }

    if (!imageUrl) {
      this.throwError("Não foi possível realizar o upload da imagem.");
      return;
    }

    await this.organizationMemberRepository.update(
      {
        id: loggedUserInfo.userId,
        imageUrl,
      },
      {
        id: loggedUserInfo.userId,
      }
    );
    return imageUrl;
  }
}
