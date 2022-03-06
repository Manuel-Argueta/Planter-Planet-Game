// Defines the class for Boost object
export default class Boost {
    constructor(boostName,boostMulti,maxEntities, boostPrice) {
      this.boostName = boostName;
      this.boostMutliplier = boostMulti;
      this.currentInstances = 0;
      this.maxEntities = maxEntities;
      this.boostPrice= boostPrice;
    }
}