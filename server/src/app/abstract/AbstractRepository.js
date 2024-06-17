import { Sequelize } from 'sequelize';
import dbConfig from '../../config/database';
import Status from '../../database/models/status';
import { STATUS } from '../constants';
import sanitize from '../utils/sanitize';

export default class AbstractRepository {
  constructor(model) {
    this.sequelize = new Sequelize(dbConfig);
    this.model = model;
    this.create = this.create.bind(this);
    this.bulkCreate = this.bulkCreate.bind(this);
    this.findAll = this.findAll.bind(this);
    this.deleteLogicallyById = this.deleteLogicallyById.bind(this);
    this.update = this.update.bind(this);
    this.findByProp = this.findByProp.bind(this);
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }

  async getActiveStatusId() {
    return (await Status.findOne({ where: { code: STATUS.ACTIVE } })).id;
  }

  async getInactiveStatusId() {
    return (await Status.findOne({ where: { code: STATUS.INACTIVE } })).id;
  }

  async getSuspendedStatusId() {
    return (await Status.findOne({ where: { code: STATUS.SUSPENDED } })).id;
  }

  async create(data) {
    delete data.id;
    return await this.model.create(data);
  }

  async countGeneric(options) {
    return await this.model.count(options);
  }

  async findById(id) {
    return await this.model.findOne({ where: { id } });
  }

  /**
   *
   * @param {string} prop
   * @param {*} value
   */
  async findByProp(prop, value) {
    return await this.model.findOne({ where: { [`${prop}`]: value } });
  }

  async findAll() {
    return await this.model.findAll();
  }

  async findOne(options) {
    return await this.model.findOne(options);
  }

  async bulkCreate(dataArray) {
    return await this.model.bulkCreate(dataArray);
  }

  async deleteLogicallyById(id) {
    return await this.model.update(
      {
        statusId: await this.getInactiveStatusId(),
      },
      {
        where: { id },
      }
    );
  }

  async update(value, whereCondition) {
    const { id, ...rest } = value;

    return await this.model.update(
      { ...sanitize({ ...rest }) },
      {
        where: whereCondition,
      }
    );
  }

  /**
   * @typedef {'SELECT' | 'INSERT' | 'UPDATE' | 'BULKUPDATE' | 'BULKDELETE' | 'DELETE' | 'UPSERT' | 'VERSION' | 'SHOWTABLES' | 'SHOWINDEXES' | 'DESCRIBE' | 'RAW' | 'FOREIGNKEYS' | 'SHOWCONSTRAINTS'} SqlQueryType
   *
   * @param {string} sqlQuery
   * @param {SqlQueryType} type
   * @param {object} props
   */
  async query(sqlQuery, type, props) {
    const data = await this.sequelize.query(sqlQuery, {
      type: Sequelize.QueryTypes[`${type}`],
      ...props,
    });

    return data;
  }

  /**
   *
   * @param {string} query
   * @param {object} replacements
   * @param {number} page
   * @param {number} limit
   * @param {boolean} isPaginated
   */
  async paginateSqlQuery(
    query,
    page = 1,
    limit = 10,
    isPaginated = true,
    replacements
  ) {
    if (isPaginated) {
      const offset = (page - 1) * limit;
      const paginatedQuery = `${query} LIMIT :limit OFFSET :offset`;

      const data = await this.sequelize.query(paginatedQuery, {
        replacements: { ...replacements, limit, offset },
        type: Sequelize.QueryTypes.SELECT,
      });

      const countQuery = `SELECT COUNT(*) AS count FROM (${query}) AS count_table`;
      const countResult = await this.sequelize.query(countQuery, {
        replacements,
        type: Sequelize.QueryTypes.SELECT,
      });

      const total = countResult[0].count;
      const pages = Math.ceil(total / limit);
      const previousPage = page > 1 ? page - 1 : null;
      const nextPage = page < pages ? page + 1 : null;

      return {
        records: Number(total),
        pages: pages,
        previousPage,
        currentPage: page,
        nextPage,
        data,
      };
    } else {
      const data = await this.sequelize.query(query, {
        replacements,
        type: Sequelize.QueryTypes.SELECT,
      });

      return data;
    }
  }
}
