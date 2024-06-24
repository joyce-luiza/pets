import AbstractFactory from "../../../app/abstract/AbstractFactory";
import {
  AnimalFileRepository,
  AnimalRepository,
} from "../../../app/repositories";
import FindAllCardListViewStrategy from "../strategies/FindAllCardListViewStrategy";

class FindAllCardListViewFactory extends AbstractFactory {
  constructor() {
    super([
      new FindAllCardListViewStrategy(AnimalRepository, AnimalFileRepository),
    ]);
  }
}

export default FindAllCardListViewFactory;
