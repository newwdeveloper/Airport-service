const { StatusCodes } = require("http-status-codes");

const { AirplaneService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
const { success } = require("../utils/common/error-response");

/**
 * POST : /airplanes
 * req-body {modelNumber: 'airbus320', capacity: 200}
 */
async function createAirplane(req, res) {
  try {
    const airplane = await AirplaneService.createAirplane({
      modelNumber: req.body.modelNumber,
      capacity: req.body.capacity,
    });
    SuccessResponse.data = airplane;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getAirplanes(req, res) {
  try {
    const airplnaes = await AirplaneService.getAirplanes();
    SuccessResponse.data = airplnaes;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}
async function getAirplane(req, res) {
  try {
    const airplnaes = await AirplaneService.getAirplane(req.params.id);
    SuccessResponse.data = airplnaes;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}
async function destroyPlane(req, res) {
  try {
    const response = await AirplaneService.destroyPlane(req.params.id);
    SuccessResponse.data = response;
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}
async function updatePlane(req, res) {
  try {
    const airplane = await AirplaneService.updatePlane(req.params.id, {
      modelNumber: req.body.modelNumber,
      capacity: req.body.capacity,
    });
    SuccessResponse.data = airplane;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  createAirplane,
  getAirplanes,
  getAirplane,
  destroyPlane,
  updatePlane,
};
