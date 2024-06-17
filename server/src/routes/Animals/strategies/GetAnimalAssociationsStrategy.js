import moment from 'moment';
import AbstractStrategy from '../../../app/abstract/AbstractStrategy';
import { Animal } from '../../../app/domains';
import { AnimalAdapter } from '../../../app/domains/adapters';

/**
 * Strategy to find and validate Animal associations fields
 *
 * @extends AbstractStrategy
 */
export default class GetAnimalAssociationsStrategy extends AbstractStrategy {
  constructor(
    animalAgeGroupRepository,
    animalColorRepository,
    animalSizeRepository,
    animalTypeRepository,
    statusesRepository
  ) {
    super();
    this.animalAgeGroupRepository = animalAgeGroupRepository;
    this.animalColorRepository = animalColorRepository;
    this.animalSizeRepository = animalSizeRepository;
    this.animalTypeRepository = animalTypeRepository;
    this.statusesRepository = statusesRepository;
  }

  /**
   * @param {AnimalAdapter} data - Animal adapter object
   */
  async execute(data, dto) {
    const animalColor = await this.animalColorRepository.findByProp(
      'title',
      data.color
    );

    if (!animalColor) {
      this.throwError('Não foi possível encontrar a cor informada.', 400);
      return;
    }

    const animalSize = await this.animalSizeRepository.findByProp(
      'title',
      data.size
    );

    if (!animalSize) {
      this.throwError('Não foi possível encontrar o porte informado.', 400);
      return;
    }

    const animalType = await this.animalTypeRepository.findByProp(
      'title',
      data.type
    );

    if (!animalType) {
      this.throwError('Não foi possível encontrar o tipo informado.', 400);
      return;
    }

    const status = await this.statusesRepository.findByProp(
      'description',
      data.status
    );

    console.log(status);
    console.log(data.status);

    if (!status) {
      this.throwError('Não foi possível encontrar o status informado.', 400);
      return;
    }

    const birthDate = moment(data.birthDate).format('YYYY-MM-DD');

    const animalYears = moment().diff(birthDate, 'years', true);

    let ageGroup = '';

    if (animalYears < 1) {
      ageGroup = 'YOUNG';
    } else if (animalYears >= 1 && animalYears < 7) {
      ageGroup = 'ADULT';
    } else if (animalYears >= 7) {
      ageGroup = 'SENIOR';
    } else {
      this.throwError(
        'Não foi possível recuperar a faixa etária do animal',
        400
      );
    }

    const animalAgeGroup = await this.animalAgeGroupRepository.findByProp(
      'title',
      ageGroup
    );

    if (!animalAgeGroup) {
      this.throwError(
        'Não foi possível encontrar a faixa etária informada.',
        400
      );
      return;
    }

    return new Animal({
      ...dto,
      typeId: animalType.id,
      sizeId: animalSize.id,
      colorId: animalColor.id,
      ageGroupId: animalAgeGroup.id,
      statusId: status.id,
    });
  }
}
