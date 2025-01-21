const CrudRepository = require("./crud-repository");
const {
  FlightDetail,
  Airplane,
  Airport,
  sequelize,
  City,
} = require("../models");
const { Sequelize } = require("sequelize");
const db = require("../models");
const flightdetail = require("../models/flightdetail");

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
          include: [
            {
              model: City,
              as: "city",
              require: true,
            },
          ],
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
          include: [
            {
              model: City,
              as: "city",
              require: true,
            },
          ],
        },
      ],
    });

    return response;
  }

  async updateRemaningSeats(flightId, seats, dec = true) {
    await db.sequelize.query(
      `SELECT * FROM FlightDetails WHERE FlightDetails.id=${flightId} FOR UPDATE`
    ); //The FOR UPDATE clause in the raw SQL query locks the selected row(s) for the current transaction. This prevents other transactions from modifying the same row(s) until the lock is released (typically when the transaction completes).
    const flight = await FlightDetail.findByPk(flightId);
    if (parseInt(dec)) {
      await flight.decrement("totalSeats", { by: seats });
    } else {
      await flight.increment("totalSeats", { by: seats });
    }
    const updatedFlight = await FlightDetail.findByPk(flightId);
    return updatedFlight;
  }
}

module.exports = FlightRepository;
