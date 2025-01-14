const { StatusCodes } = require("http-status-codes");

const { AirplaneRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data) {
  try {
    const airplane = await airplaneRepository.create(data);
    return airplane;
  } catch (error) {
    if (error.name == "SequelizeValidationError") {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Cannot create a new Airplance object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAirplanes() {
  try {
    const airplanes = await airplaneRepository.getAll();
    return airplanes;
  } catch (error) {
    throw new AppError(
      "cannot get all airplanes",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function getAirplane(id) {
  try {
    const airplane = await airplaneRepository.get(id);
    return airplane;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError("requested plane not found", error.statusCode);
    }
    throw new AppError(
      "cannot get the airplane",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function destroyPlane(id) {
  try {
    const response = await airplaneRepository.destroy(id);
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
async function updatePlane(id, data) {
  try {
    const airplane = await airplaneRepository.update(id, data);
    return airplane;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "Airplane you requested to update is not present",
        error.statusCode
      );
    }
    throw new AppError(
      "Cannot fetch data of airplane",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createAirplane,
  getAirplanes,
  getAirplane,
  destroyPlane,
  updatePlane,
};
