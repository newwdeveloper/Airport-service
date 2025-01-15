const { Logger } = require("../config");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");

class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    const response = await this.model.create(data);
    return response;
  }

  async destroy(data) {
    const response = await this.model.destroy({
      where: {
        id: data,
      },
    });
    if (!response) {
      throw new AppError("unable to delete ", StatusCodes.NOT_FOUND);
    }
    return response;
  }

  async get(id) {
    try {
      const response = await this.model.findByPk(id);
      if (!response) {
        throw new AppError("unable to find resources", StatusCodes.NOT_FOUND);
      }
      return response;
    } catch (error) {
      Logger.error("Something went wrong in the Crud Repo : get");
      throw error;
    }
  }

  async getAll() {
    try {
      const response = await this.model.findAll();
      return response;
    } catch (error) {
      Logger.error("Something went wrong in the Crud Repo : get");
      throw error;
    }
  }

  async update(id, data) {
    // data -> {col: value, ....}
    try {
      Logger.info("Updating record with ID:", id);
      Logger.info("Data being updated:", data);
      const response = await this.model.update(data, {
        where: {
          id: id,
        },
      });
      Logger.info("Update result:", response);
      return response;
    } catch (error) {
      Logger.error("Something went wrong in the Crud Repo : update");
      throw error;
    }
  }
}

module.exports = CrudRepository;
