import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { Adopter } from "../../../app/domains";
import { AdopterRepository } from "../../../app/repositories";
import { uploadFile } from "../../../app/utils/uploadFile";

/**
 *
 *
 * @extends AbstractStrategy
 */
export default class FindAdopterAndUpdateProfileImageStrategy extends AbstractStrategy {
  /**
   *
   * @param {AdopterRepository} adopterRepository
   */
  constructor(adopterRepository) {
    super();
    this.adopterRepository = adopterRepository;
  }

  /**
   *
   * @param {Adopter} data - The data object containing id property.
   */
  async execute({ file }, dto, loggedUserInfo) {
    const adopter = await this.adopterRepository.findById(
      loggedUserInfo.userId
    );

    if (!adopter) {
      this.throwError("Não foi possível recuperar os dados do adotante.");
      return;
    }

    let imageUrl = "";

    if (adopter.imageUrl) {
      imageUrl = await uploadFile({
        file,
        folder: "profile",
        previousFilePath: adopter.imageUrl,
      });
    } else {
      imageUrl = await uploadFile({ file, folder: "profile" });
    }

    if (!imageUrl) {
      this.throwError("Não foi possível realizar o upload da imagem.");
      return;
    }

    await this.adopterRepository.update(
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
