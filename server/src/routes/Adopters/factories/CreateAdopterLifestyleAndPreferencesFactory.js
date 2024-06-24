import AbstractFactory from "../../../app/abstract/AbstractFactory";
import {
  AddressRepository,
  AdopterAnimalAgeGroupPreferenceRepository,
  AdopterAnimalColorPreferenceRepository,
  AdopterAnimalSizePreferenceRepository,
  AdopterAnimalTypePreferenceRepository,
  AdopterPreferenceRepository,
  AdopterRepository,
  AnimalAgeGroupRepository,
  AnimalColorRepository,
  AnimalSizeRepository,
  AnimalTypeRepository,
  LifestyleRepository,
  AdopterAnimalSexPreferenceRepository,
} from "../../../app/repositories";
import {
  ValidateAddressRequiredFields,
  ValidateAdopterPreferencesRequiredFields,
  ValidateAdopterLifestyleRequiredFields,
  FindAdopterByIdStrategy,
  CreateAdopterAddressStrategy,
  CreateAdopterPreferencesStrategy,
  CreateAdopterLifestyleStrategy,
  CreateAdopterAnimalTypePreferencesStrategy,
  CreateAdopterAnimalSizePreferencesStrategy,
  CreateAdopterAnimalColorPreferencesStrategy,
  CreateAdopterAnimalAgeGroupPreferencesStrategy,
  CreateAdopterAnimalSexPreferencesStrategy,
} from "../strategies";

class CreateAdopterLifestyleAndPreferencesFactory extends AbstractFactory {
  constructor() {
    super([
      new ValidateAddressRequiredFields(),
      new ValidateAdopterPreferencesRequiredFields(),
      new ValidateAdopterLifestyleRequiredFields(),
      new FindAdopterByIdStrategy(AdopterRepository),
      new CreateAdopterAddressStrategy(AddressRepository),
      new CreateAdopterPreferencesStrategy(AdopterPreferenceRepository),
      new CreateAdopterAnimalTypePreferencesStrategy(
        AdopterAnimalTypePreferenceRepository,
        AnimalTypeRepository
      ),
      new CreateAdopterAnimalSizePreferencesStrategy(
        AdopterAnimalSizePreferenceRepository,
        AnimalSizeRepository
      ),
      new CreateAdopterAnimalColorPreferencesStrategy(
        AdopterAnimalColorPreferenceRepository,
        AnimalColorRepository
      ),
      new CreateAdopterAnimalSexPreferencesStrategy(
        AdopterAnimalSexPreferenceRepository
      ),
      new CreateAdopterAnimalAgeGroupPreferencesStrategy(
        AdopterAnimalAgeGroupPreferenceRepository,
        AnimalAgeGroupRepository
      ),
      new CreateAdopterLifestyleStrategy(LifestyleRepository),
    ]);
  }
}

export default CreateAdopterLifestyleAndPreferencesFactory;
