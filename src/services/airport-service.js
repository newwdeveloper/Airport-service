const { AirportRepository } = require("../repositories");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");
const { SuccessResponse } = require("../utils/common");
const { Logger } = require("../config");

const airportRepository = new AirportRepository();

async function createAirport(data) {
  try {
    const airport = await airportRepository.create(data);
    return airport;
  } catch (error) {
    console.error("Database Error:", error);
    if (error.name === "SequelizeValidationError") {
      //This error is typically thrown by Sequelize when the data doesn't meet the validation criteria defined in the model (e.g., a required field is missing, or a string exceeds its length limit).
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "cannot creat airport object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function getAirports() {
  try {
    const airports = await airportRepository.getAll();
    return airports;
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    console.log(error);
    throw new AppError(
      "cannot get the available airports",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function getAirport(id) {
  try {
    const airport = await airportRepository.get(id);
    return airport;
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    console.log(error);
    throw new AppError(
      "cannot get the desired airport",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function updateAirport(data, id) {
  try {
    const airport = await airportRepository.update(data, id);
    console.log("result:", airport);
    SuccessResponse.data = airport;
  } catch (error) {
    Logger.error("Error updating airport:", error);
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError("requested update city not found", error.statusCode);
    }
    throw new AppError("cannot update city", StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function destroyAirport(id) {
  try {
    const response = await airportRepository.destroy(id);
    return response;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError("requested plane not found", error.statusCode);
    }
    throw new AppError(
      `cannot cannot destroy  airplane with ${id}`,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createAirport,
  getAirports,
  getAirport,
  updateAirport,
  destroyAirport,
};
