// Defines the class for Boost object
export default class Boost {
    constructor(boostName,boostMulti,maxEntities, boostPrice,boostContainerID) {
      this.boostName = boostName;
      this.boostIncrease = boostMulti;
      this.boostEntities = 0;
      this.maxEntities = maxEntities;
      this.boostPrice= boostPrice;
      this.boostContainerID = boostContainerID;
      this.type = "boost";
      this.rateType = 'XP'
      this.increaseType = "add"
    }
}