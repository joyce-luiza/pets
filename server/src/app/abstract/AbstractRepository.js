import { Sequelize } from "sequelize";
import dbConfig from "../../config/database";
import Status from "../../database/models/status";
import { STATUS } from "../constants";
import sanitize from "../utils/sanitize";

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

  /**
   *
   * @param {string} prop
   * @param {*} value
   */
  async findAllByProp(prop, value) {
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
        statusId: this.getInactiveStatusId(),
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

  /**
   * Formats a SQL WHERE condition based on the provided conditions and columns.
   *
   * @param {Object} conditions - An object containing the conditions for the WHERE clause. Each key represents a column,
   *                              and its value is an object with `value` and `operation`.
   * @param {Object} columns - An object mapping the condition keys to their corresponding column names in the database.
   * @param {string} [combineWith='AND'] - The logical operator to combine multiple conditions ('AND' or 'OR').
   *
   * @returns {Object} An object containing the formatted WHERE condition and the replacements.
   * @returns {string} return.whereCondition - The formatted WHERE condition string.
   * @returns {Object} return.replacements - An object containing the replacements for the prepared statement.
   *
   * @throws {Error} If an unsupported operation is provided.
   *
   * @example
   * const conditions = {
   *   name: {
   *     value: 'Bolt',
   *     operation: 'LIKE',
   *   },
   *   xyzColumn: {
   *     value: 13,
   *     operation: '>',
   *   }
   * };
   *
   * const columnsToFilter = {
   *   name: 'a.name',
   *   type: 'at.title',
   *   sex: 'a.sex',
   *   state: 'at.state',
   * };
   *
   * const result = formatWhereCondition(conditions, columnsToFilter, 'AND');
   * console.log(result);
   * // Output: { whereCondition: "WHERE a.name LIKE :name AND xyzColumn > :xyzColumn", replacements: { name: '%Bolt%', xyzColumn: 13 } }
   */
  formatWhereCondition(conditions, columns, combineWith = "AND") {
    let whereCondition = "";
    const replacements = {};
    const columnsKeys = Object.keys(columns);
    const conditionKeys = Object.keys(conditions);

    if (conditionKeys.length) {
      const conditionArray = [];

      for (const key of conditionKeys) {
        if (columnsKeys.includes(key)) {
          const columnName = columns[key];
          const condition = conditions[key];
          const value = condition.value;
          const operation = condition.operation.toUpperCase();
          const paramName = `${key}`; // Using key as parameter name

          if (value) {
            switch (operation) {
              case "LIKE":
                conditionArray.push(`${columnName} LIKE :${paramName}`);
                replacements[paramName] = `%${value}%`;
                break;
              case "=":
              case ">":
              case "<":
              case ">=":
              case "<=":
              case "<>":
                conditionArray.push(`${columnName} ${operation} :${paramName}`);
                replacements[paramName] = value;
                break;
              case "IN":
                conditionArray.push(`${columnName} IN (:${paramName})`);
                replacements[paramName] = value.split(",");
                break;
              default:
                throw new Error(`Unsupported operation: ${operation}`);
            }
          }
        }
      }

      if (conditionArray.length) {
        whereCondition = conditionArray.join(` ${combineWith} `);
      }
    }

    return {
      whereCondition: whereCondition ? `WHERE ${whereCondition}` : "",
      replacements,
    };
  }
}
