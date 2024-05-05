// Validations
import ValidateAdopterRequiredFieldsStrategy from "./ValidateAdopterRequiredFieldsStrategy";
import ValidateAdopterAgeStrategy from "./ValidateAdopterAgeStrategy";
import ValidateEmailExistenceStrategy from "./ValidateEmailExistenceStrategy";
import ValidateAddressRequiredFields from "./ValidateAddressRequiredFields";
import ValidateAdopterPreferencesRequiredFields from "./ValidateAdopterPreferencesRequiredFields";
import ValidateAdopterLifestyleRequiredFields from "./ValidateAdopterLifestyleRequiredFields";

// Adopter Complement
import CreateAdopterPreferencesStrategy from "./CreateAdopterPreferencesStrategy";
import CreateAdopterAnimalTypePreferencesStrategy from "./CreateAdopterAnimalTypePreferencesStrategy";
import CreateAdopterAnimalSizePreferencesStrategy from "./CreateAdopterAnimalSizePreferencesStrategy";
import CreateAdopterAnimalColorPreferencesStrategy from "./CreateAdopterAnimalColorPreferencesStrategy";
import CreateAdopterAnimalAgeGroupPreferencesStrategy from "./CreateAdopterAnimalAgeGroupPreferencesStrategy";
import CreateAdopterLifestyleStrategy from "./CreateAdopterLifestyleStrategy";

// Others
import CreateAdopterStrategy from "./CreateAdopterStrategy";
import FindAdopterByIdStrategy from "./FindAdopterByIdStrategy";
import FormatToAdopterDomainStrategy from "./FormatToAdopterDomainStrategy";
import CreateAdopterAddressStrategy from "./CreateAdopterAddressStrategy";

export {
  ValidateAdopterRequiredFieldsStrategy,
  ValidateAdopterAgeStrategy,
  ValidateEmailExistenceStrategy,
  ValidateAddressRequiredFields,
  ValidateAdopterPreferencesRequiredFields,
  ValidateAdopterLifestyleRequiredFields,
  CreateAdopterStrategy,
  FormatToAdopterDomainStrategy,
  FindAdopterByIdStrategy,
  CreateAdopterAddressStrategy,
  CreateAdopterPreferencesStrategy,
  CreateAdopterAnimalTypePreferencesStrategy,
  CreateAdopterAnimalSizePreferencesStrategy,
  CreateAdopterAnimalColorPreferencesStrategy,
  CreateAdopterAnimalAgeGroupPreferencesStrategy,
  CreateAdopterLifestyleStrategy,
};
