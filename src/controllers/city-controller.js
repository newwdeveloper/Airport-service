const { CityServices } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

async function createCity(req, res) {
  try {
    const city = await CityServices.createCity({
      name: req.body.name,
    });
    SuccessResponse.data = city;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    console.error("Error:", error);
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function destroyCity(req, res) {
  try {
    const city = await CityServices.destroyCity(req.params.id);
    SuccessResponse.data = city;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function updateCity(req, res) {
  try {
    const city = await CityServices.updateCity(req.params.id, {
      name: req.body.name,
    });
    SuccessResponse.data = city;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = { createCity, destroyCity, updateCity };
