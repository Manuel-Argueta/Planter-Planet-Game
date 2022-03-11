// Defines the class for Bot object
export default class Bot {
    constructor(botName,botIncrease,botPrice,botID,botIcon,priceIncrease) {
      this.botName = botName;
      this.botIcon = botIcon;
      this.botIncrease = botIncrease;
      this.botRate = 0;
      this.botEntities = 0;
      this.botPrice = botPrice;
      this.botID = botID;
      this.botBoosts = {}
      this.botPriceIncrease = priceIncrease
    }
}