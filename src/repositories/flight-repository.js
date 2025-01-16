const CrudRepository = require("./crud-repository");
const { FlightDetail } = require("../models");

class FlightRepository extends CrudRepository {
  constructor() {
    super(FlightDetail);
  }
}

module.exports = FlightRepository;
