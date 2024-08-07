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
import CreateAdopterAnimalSexPreferencesStrategy from "./CreateAdopterAnimalSexPreferencesStrategy";
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
import GetAdopterPreferencesStrategy from "./GetAdopterPreferencesStrategy";
import GetAdopterPreferenceForComplementStrategy from "./GetAdopterPreferenceForComplementStrategy";
import RemoveAllPreviousAdopterPreferencesStrategy from "./RemoveAllPreviousAdopterPreferencesStrategy";
import GetAdopterLifestyleStrategy from "./GetAdopterLifestyleStrategy";
import CreateOrUpdateAdopterLifestyleStrategy from "./CreateOrUpdateAdopterLifestyleStrategy";
import GetAdopterAllInformationStrategy from "./GetAdopterAllInformationStrategy";

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
    GetAdopterPreferencesStrategy,
    CreateAdopterAnimalSexPreferencesStrategy,
    GetAdopterPreferenceForComplementStrategy,
    RemoveAllPreviousAdopterPreferencesStrategy,
    GetAdopterLifestyleStrategy,
    CreateOrUpdateAdopterLifestyleStrategy,
    GetAdopterAllInformationStrategy,
};
