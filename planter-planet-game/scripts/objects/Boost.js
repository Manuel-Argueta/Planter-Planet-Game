// Defines the class for Boost object
export default class Boost {
    constructor(boostName,boostMulti,maxEntities, boostPrice,boostID) {
      this.boostName = boostName;
      this.boostMulti = boostMulti;
      this.boostEntities = 0;
      this.maxEntities = maxEntities;
      this.boostPrice= boostPrice;
      this.boostID = boostID;
      this.type = "boost";
    }
}