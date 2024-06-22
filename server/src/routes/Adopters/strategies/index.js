// Validations
import ValidateAdopterRequiredFieldsStrategy from "./ValidateAdopterRequiredFieldsStrategy";
import ValidateAdopterAgeStrategy from "./ValidateAdopterAgeStrategy";
import ValidateEmailExistenceStrategy from "./ValidateEmailExistenceStrategy";
import ValidateAddressRequiredFields from "./ValidateAddressRequiredFields";
import ValidateAdopterPreferencesRequiredFields from "./ValidateAdopterPreferencesRequiredFields";
import ValidateAdopterLifestyleRequiredFields from "./ValidateAdopterLifestyleRequiredFields";
import ValidateRequiredFieldsToUpdateAddress from "./ValidateRequiredFieldsToUpdateAddress";

// Adopter Complement
import CreateAdopterPreferencesStrategy from "./CreateAdopterPreferencesStrategy";
import CreateAdopterAnimalTypePreferencesStrategy from "./CreateAdopterAnimalTypePreferencesStrategy";
import CreateAdopterAnimalSizePreferencesStrategy from "./CreateAdopterAnimalSizePreferencesStrategy";
import CreateAdopterAnimalColorPreferencesStrategy from "./CreateAdopterAnimalColorPreferencesStrategy";
import CreateAdopterAnimalAgeGroupPreferencesStrategy from "./CreateAdopterAnimalAgeGroupPreferencesStrategy";
import CreateAdopterLifestyleStrategy from "./CreateAdopterLifestyleStrategy";
import CreateOrUpdateAdopterAddressStrategy from "./CreateOrUpdateAdopterAddressStrategy";

// Others
import CreateAdopterStrategy from "./CreateAdopterStrategy";
import FindAdopterByIdStrategy from "./FindAdopterByIdStrategy";
import FormatToAdopterDomainStrategy from "./FormatToAdopterDomainStrategy";
import CreateAdopterAddressStrategy from "./CreateAdopterAddressStrategy";
import VerifyAdopterByLoggedInfoStrategy from "./VerifyAdopterByLoggedInfoStrategy";
import DeleteLogicallyByAdopterIdStrategy from "./DeleteLogicallyByAdopterIdStrategy";
import UpdateAdopterStrategy from "./UpdateAdopterStrategy";
import FindAdopterAndUpdateProfileImageStrategy from "./FindAdopterAndUpdateProfileImageStrategy";
import FindLoggedAdopterAddressStrategy from "./FindLoggedAdopterAddressStrategy";

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
  VerifyAdopterByLoggedInfoStrategy,
  DeleteLogicallyByAdopterIdStrategy,
  UpdateAdopterStrategy,
  FindAdopterAndUpdateProfileImageStrategy,
  FindLoggedAdopterAddressStrategy,
  ValidateRequiredFieldsToUpdateAddress,
  CreateOrUpdateAdopterAddressStrategy,
};
