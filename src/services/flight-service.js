const { FlightRepository } = require("../repositories");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");
const { SuccessResponse } = require("../utils/common");
const { Logger } = require("../config");
const { Op } = require("sequelize");
const moment = require("moment");

const flightRepository = new FlightRepository();

async function createFlight(data) {
  try {
    const flight = await flightRepository.create(data);
    console.log(flight);
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

async function getAllFlight(query) {
  let customFilter = {};
  //trip xyz-yzx
  if (query.trips) {
    [departureAirportId, arrivalAirportId] = query.trips.split("-");
    customFilter.departureAirportId = departureAirportId;
    customFilter.arrivalAirportId = arrivalAirportId;
  }
  if (query.price) {
    [minPrice, maxPrice] = query.price.split("-");
    customFilter.price = {
      [Op.between]: [minPrice, maxPrice === undefined ? 20000 : maxPrice],
    };
  }
  if (query.travellers) {
    customFilter.totalSeats = {
      [Op.gte]: query.travellers,
    };
  }
  if (query.tripDate) {
    const startDate = moment.utc(query.tripDate).startOf("day").toISOString();
    const endDate = moment.utc(query.tripDate).endOf("day").toISOString();

    console.log("Query tripDate:", query.tripDate);
    customFilter.departureTime = {
      [Op.between]: [startDate, endDate],
    };
  }
  // Handle multiple sorting fields
  let sortFilter = [];
  if (query.sort) {
    const params = query.sort.split(","); // e.g., "price_asc,departureTime_desc"
    const sortFilters = params.map((param) => param.split("_"));
    sortFilter = sortFilters;
  }

  try {
    const flight = await flightRepository.getAllFlight(
      customFilter,
      sortFilter
    );
    console.log(flight);
    return flight;
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
      "cannot get the queried flights",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createFlight,
  getAllFlight,
};
