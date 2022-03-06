// Defines the class for Boost object
export default class Boost {
    constructor(boostName,boostMulti,maxEntities, boostPrice,boostContainerID) {
      this.boostName = boostName;
      this.boostMultiplier = boostMulti;
      this.currentInstances = 0;
      this.maxEntities = maxEntities;
      this.boostPrice= boostPrice;
      this.boostContainerID = boostContainerID;
    }
}