import AbstractFactory from "../../../app/abstract/AbstractFactory";
import {
  AdopterAnimalAgeGroupPreferenceRepository,
  AdopterAnimalColorPreferenceRepository,
  AdopterAnimalSizePreferenceRepository,
  AdopterAnimalTypePreferenceRepository,
  AdopterPreferenceRepository,
  AnimalAgeGroupRepository,
  AnimalColorRepository,
  AnimalSizeRepository,
  AnimalTypeRepository,
  LifestyleRepository,
  AdopterAnimalSexPreferenceRepository,
  AdopterRepository,
} from "../../../app/repositories";
import {
  ValidateAdopterPreferencesRequiredFields,
  CreateAdopterLifestyleStrategy,
  CreateAdopterAnimalTypePreferencesStrategy,
  CreateAdopterAnimalSizePreferencesStrategy,
  CreateAdopterAnimalColorPreferencesStrategy,
  CreateAdopterAnimalAgeGroupPreferencesStrategy,
  CreateAdopterAnimalSexPreferencesStrategy,
  GetAdopterPreferenceForComplementStrategy,
  RemoveAllPreviousAdopterPreferencesStrategy,
  GetAdopterPreferencesStrategy,
} from "../strategies";

class UpdateAdopterPreferencesFactory extends AbstractFactory {
  constructor() {
    super([
      new ValidateAdopterPreferencesRequiredFields(),
      new GetAdopterPreferenceForComplementStrategy(
        AdopterPreferenceRepository
      ),
      new RemoveAllPreviousAdopterPreferencesStrategy(
        AdopterAnimalTypePreferenceRepository,
        AdopterAnimalSizePreferenceRepository,
        AdopterAnimalColorPreferenceRepository,
        AdopterAnimalSexPreferenceRepository,
        AdopterAnimalAgeGroupPreferenceRepository
      ),
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
      new GetAdopterPreferencesStrategy(AdopterRepository),
    ]);
  }
}

export default UpdateAdopterPreferencesFactory;
