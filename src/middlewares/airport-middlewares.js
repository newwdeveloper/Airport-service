const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");

function validateCreateRequest(req, res, next) {
  const requiredFields = ["name", "code", "address", "cityId"];
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

  next();
}

module.exports = { validateCreateRequest };
