// Defines the class for Bot object
export default class Bot {
    constructor(botName,botAutoIncrease,maxEntities,botPrice,botContainerID) {
      this.botName = botName;
      this.botAutoIncrease = botAutoIncrease;
      this.currentEntities = 0;
      this.maxEntities = maxEntities;
      this.botPrice = botPrice;
      this.botContainerID = botContainerID;
    }
}