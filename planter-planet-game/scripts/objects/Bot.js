// Defines the class for Bot object
export default class Bot {
    constructor(botName,botAutoIncrease,maxEntities,botPrice,botContainerID) {
      this.botName = botName;
      this.botIncrease = botAutoIncrease;
      this.botEntities = 0;
      this.maxEntities = maxEntities;
      this.botPrice = botPrice;
      this.botContainerID = botContainerID;
      this.type = "bot"
      this.rateType= "AutoXP"
      this.increaseType = "multi"
    }
}