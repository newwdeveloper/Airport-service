const CrudRepository = require("./crud-repository");
const { FlightDetail, Airplane, Airport, sequelize } = require("../models");
const { Sequelize } = require("sequelize");

class FlightRepository extends CrudRepository {
  constructor() {
    super(FlightDetail);
  }
  async getAllFlight(filter, sort) {
    const response = await FlightDetail.findAll({
      where: filter,
      order: sort,
      include: [
        { model: Airplane, require: true },
        {
          model: Airport,
          required: true,
          as: "departureAirport",
          on: {
            col1: Sequelize.where(
              Sequelize.col("FlightDetail.departureAirportId"),
              "=",
              Sequelize.col("departureAirport.code")
            ),
          },
        },
        {
          model: Airport,
          require: true,
          as: "arrivalAirport",
          on: {
            col: Sequelize.where(
              sequelize.col("FlightDetail.arrivalAirportId"),
              "=",
              Sequelize.col("arrivalAirport.code")
            ),
          },
        },
      ],
    });

    return response;
  }
}

module.exports = FlightRepository;
