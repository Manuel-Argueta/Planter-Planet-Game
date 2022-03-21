// Defines the class for Boost object
export default class Boost {
    constructor(boostName,boostMulti, boostPrice,boostID,priceIncrease) {
      this.boostName = boostName;
      this.boostMulti = boostMulti;
      this.boostEntities = 0;
      this.boostBasePrice= boostPrice;
      this.boostPrice= boostPrice;
      this.boostID = boostID;
      this.boostPriceIncrease = priceIncrease
    }
}