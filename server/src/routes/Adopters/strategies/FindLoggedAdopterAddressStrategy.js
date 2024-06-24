import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { Adopter } from "../../../app/domains";
import { AdopterAddressResult } from "../../../app/domains/result";
import { AddressRepository } from "../../../app/repositories";

/**
 * Find logged adopter address
 *
 * @extends AbstractStrategy
 */
export default class FindLoggedAdopterAddressStrategy extends AbstractStrategy {
  /**
   *
   * @param {AddressRepository} addressRepository
   */
  constructor(addressRepository) {
    super();
    this.addressRepository = addressRepository;
  }

  async execute(data = null, dto, loggedUserInfo) {
    if (!loggedUserInfo?.userId) {
      this.throwError("Não foi possível recuperar as informações do usuário.");
    }

    const adopterAddress = await this.addressRepository.findOne({
      where: {
        adopterId: loggedUserInfo.userId,
      },
    });

    if (adopterAddress) return new AdopterAddressResult(adopterAddress);
  }
}
