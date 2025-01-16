const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");
const { compareTime } = require("../utils/helpers/datetime-helpers");

function validateCreateRequest(req, res, next) {
  const requiredFields = [
    "FlightNumber",
    "airplaneId",
    "departureAirportId",
    "arrivalAirportId",
    "arrivalTime",
    "departureTime",
    "price",
    //"boardingGate",
    "totalSeats",
  ];
  const missingFields = [];

  // Check if required fields are missing or invalid
  requiredFields.forEach((field) => {
    if (!req.body[field]) {
      missingFields.push(`${field} is required`);
    }
  });

  // If there are missing fields, send a detailed error response
  if (missingFields.length > 0) {
    ErrorResponse.message = "Invalid request for creating airport";
    ErrorResponse.error = new AppError(missingFields, StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }




  const { arrivalTime, departureTime } = req.body;
  if (!compareTime(arrivalTime, departureTime)) {
    ErrorResponse.message = "invalid time date";
    ErrorResponse.error = new AppError(
      ["arrival time should be later than departure time"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  next();
}

module.exports = { validateCreateRequest };
