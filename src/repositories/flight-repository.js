const CrudRepository = require("./crud-repository");
const { FlightDetail } = require("../models");

class FlightRepository extends CrudRepository {
  constructor() {
    super(FlightDetail);
  }
  async getAllFlight(filter, sort) {
    const response = await FlightDetail.findAll({
      where: filter,
      order: sort,
    });
    return response;
  }
}

module.exports = FlightRepository;
