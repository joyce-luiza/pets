import AbstractFactory from "../../../app/abstract/AbstractFactory";
import { AdopterRepository } from "../../../app/repositories";
import {
  GetDomainByIdStrategy,
  VerifyDomainIdParamStrategy,
} from "../../../app/strategies";
import {
  DeleteLogicallyByAdopterIdStrategy,
  VerifyAdopterByLoggedInfoStrategy,
} from "../strategies";

class DeleteLogicallyByAdopterIdFactory extends AbstractFactory {
  constructor() {
    super([
      new VerifyDomainIdParamStrategy(),
      new GetDomainByIdStrategy(AdopterRepository),
      new VerifyAdopterByLoggedInfoStrategy(),
      new DeleteLogicallyByAdopterIdStrategy(AdopterRepository),
    ]);
  }
}

export default DeleteLogicallyByAdopterIdFactory;
