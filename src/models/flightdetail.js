"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class FlightDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Airplane, {
        foreignKey: "airplaneId",
      });
      this.belongsTo(models.airport, {
        foreignKey: "departureAirportId",
      });
      this.belongsTo(models.airport, {
        foreignKey: "arrivalAirportId",
      });
    }
  }
  FlightDetail.init(
    {
      FlightNumber: { type: DataTypes.STRING, allowNull: false },
      airplaneId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      departureAirportId: { type: DataTypes.STRING, allowNull: false },
      arrivalAirportId: { type: DataTypes.STRING, allowNull: false },
      arrivalTime: { type: DataTypes.DATE, allowNull: false },
      departureTime: { type: DataTypes.DATE, allowNull: false },
      price: { type: DataTypes.STRING, allowNull: false },
      boardingGate: { type: DataTypes.STRING },
      totalSeats: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "FlightDetail",
    }
  );
  return FlightDetail;
};
