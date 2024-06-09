import AbstractFactory from "../../../app/abstract/AbstractFactory";
import {
  AnimalAgeGroupRepository,
  AnimalColorRepository,
  AnimalFileRepository,
  AnimalRepository,
  AnimalSizeRepository,
  AnimalTypeRepository,
  StatusesRepository,
} from "../../../app/repositories";
import {
  ValidateAnimalRequiredFieldsStrategy,
  GetAnimalAssociationsStrategy,
  CreateAnimalStrategy,
  CreateAnimalFilesStrategy,
  FormatCreateAnimalResultStrategy,
} from "../strategies";

class CreateAnimalFactory extends AbstractFactory {
  constructor() {
    super([
      new ValidateAnimalRequiredFieldsStrategy(),
      new GetAnimalAssociationsStrategy(
        AnimalAgeGroupRepository,
        AnimalColorRepository,
        AnimalSizeRepository,
        AnimalTypeRepository,
        StatusesRepository
      ),
      /* Criar strategy para validar se o animal cadastrado está na quantidade
       * permitida de acordo com o tipo dele dentro da organização
       */
      new CreateAnimalStrategy(AnimalRepository),
      new CreateAnimalFilesStrategy(AnimalFileRepository),
      new FormatCreateAnimalResultStrategy(AnimalRepository),
    ]);
  }
}

export default CreateAnimalFactory;
