import AbstractFactory from "../../../app/abstract/AbstractFactory";
import {
  AnimalFileRepository,
  AnimalRepository,
} from "../../../app/repositories";
import { FindAllToCardListViewStrategy } from "../strategies/";

class FindAllToCardListViewFactory extends AbstractFactory {
  constructor() {
    super([
      new FindAllToCardListViewStrategy(AnimalRepository, AnimalFileRepository),
    ]);
  }
}

export default FindAllToCardListViewFactory;
