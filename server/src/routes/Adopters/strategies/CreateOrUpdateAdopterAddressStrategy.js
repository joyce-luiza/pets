import AbstractStrategy from "../../../app/abstract/AbstractStrategy";
import { Adopter } from "../../../app/domains";
import { AdopterAddressResult } from "../../../app/domains/result";
import { AddressRepository } from "../../../app/repositories";

/**
 * Create or update adopter address
 *
 * @extends AbstractStrategy
 */
export default class CreateOrUpdateAdopterAddressStrategy extends AbstractStrategy {
  /**
   * @param {AddressRepository} addressRepository
   */
  constructor(addressRepository) {
    super();
    this.addressRepository = addressRepository;
  }

  async execute(data, dto, loggedUserInfo) {
    let address = {};

    const adopterAddress = data?.id
      ? await this.addressRepository.findOne({
          where: {
            id: data.id,
            adopterId: loggedUserInfo.userId,
          },
        })
      : null;

    if (!adopterAddress) {
      const newAddress = await this.addressRepository.create({
        ...data,
        adopterId: loggedUserInfo.userId,
      });

      if (!address) this.throwError("Erro ao criar endereço.", 500);

      address = new AdopterAddressResult(newAddress);
    } else {
      const updatedAddress = await this.addressRepository.update(data, {
        id: data.id,
        adopterId: loggedUserInfo.userId,
      });

      if (!address) this.throwError("Erro ao atualizar endereço.", 500);

      address = new AdopterAddressResult(updatedAddress);
    }

    const result = new AdopterAddressResult(address);

    return result;
  }
}
