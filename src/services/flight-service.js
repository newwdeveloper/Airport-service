const { FlightRepository } = require("../repositories");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");
const { SuccessResponse } = require("../utils/common");
const { Logger } = require("../config");

const flightRepository = new FlightRepository();

async function createFlight(data) {
  try {
    const flight = await flightRepository.create(data);
    return flight;
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

module.exports = {
  createFlight,
};
