import Bot from "./objects/Bot.js";
import Boost from "./objects/Boost.js";
import { updateStatsUI } from "./data.js";

let currentPlayer = {};

let boostOptions = [];
let botOptions = [];
export function defineStoreOptions() {
  //Add any other boosts here (boostName,boostMulti,maxEntities, boostPrice, boostID)
  boostOptions.push(new Boost("3 x Multi", 3, 5, 50000, "threeMulti"));

  //Add any other bots here constructor(botName,botIncrease, maxEntities, botPrice, botID,"botIcon")
  botOptions.push(
    new Bot("Droid", 10, 5000, 5, "droid", "./assets/Droid.png")
  );
  botOptions.push(
    new Bot("Super Droid", 50, 2500, 100, "superDroid", "./assets/Droid.png")
  );
  botOptions.push(
    new Bot("Ultra Droid", 100, 1000, 500, "ultraDroid", "./assets/Droid.png")
  );

  return botOptions
}

//Add HTML DOM elements creation
export function initStoreObjects(botOptions) {
  loadPlayer();
  let parentElement = document.getElementById("upgradeShop");
  //Renders all boot and bot options based on lines defined above
  for (let i = 0; i < botOptions.length; i++) {
    let itemContainer = document.createElement("div");
    itemContainer.id = botOptions[i].botID + "Item";

    let itemIcon = document.createElement("img");
    itemIcon.src = botOptions[i].botIcon;

    let itemCounter = document.createElement("p");
    itemCounter.id = botOptions[i].botID + "CounterDisplay";
    itemCounter.innerHTML = botOptions[i].botEntities;
    let progressBarShell = document.createElement("div");
    progressBarShell.id = botOptions[i].botID + "ProgressBarContainer";

    let itemButton = document.createElement("button");
    itemButton.id = botOptions[i].botID + "Button";
    itemButton.innerHTML = botOptions[i].botName + " Price: " + botOptions[i].botPrice;
    itemButton.addEventListener('click', function () { addBots(botOptions[i]) })

    let progressBar = document.createElement("div");
    progressBar.id = botOptions[i].botID + "ProgressBar";
    progressBar.innerHTML = botOptions[i].botRate + " / Second";
    itemButton.className = "botButton";
    itemIcon.className = "botIcon";
    itemCounter.className = "botCounter";
    progressBarShell.className = "botProgressBarContainer";
    progressBar.className = "botProgressBar";

    progressBarShell.appendChild(progressBar);
    itemContainer.appendChild(progressBarShell);
    itemContainer.appendChild(itemIcon);
    itemContainer.appendChild(itemCounter);
    itemContainer.appendChild(itemButton);
    for (let j = 0; j < boostOptions.length; j++) {
      let boostButton = document.createElement("button");
      boostButton.id = botOptions[i].botID + boostOptions[j].boostID + "Button";
      boostButton.innerHTML = boostOptions[j].boostName + " Price: " + boostOptions[j].boostPrice;
      boostButton.addEventListener('click', function() { addBoost(botOptions[i],boostOptions[j])})
      itemContainer.appendChild(boostButton);
    }
    parentElement.appendChild(itemContainer);
  }
}

//refactor and create function for the repeated code
function addBots(currBot) {
  loadPlayer()
  let currBotID = currBot.botID
  if (currentPlayer.currentUpgrades.hasOwnProperty(currBotID) && currentPlayer.currentSOIL >= currentPlayer.currentUpgrades[currBotID].botPrice) {
    currentPlayer.currentUpgrades[currBotID].botEntities++;
    currentPlayer.currentSOIL -= currentPlayer.currentUpgrades[currBotID].botPrice
    //change increase factor for better in game econ
    currentPlayer.currentUpgrades[currBotID].botPrice *= 5;
    currentPlayer.currentUpgrades[currBotID].botRate += currentPlayer.currentUpgrades[currBotID].botIncrease;
    getNewAutoXPRate(currentPlayer.currentUpgrades)
    updateLocalStorage(currentPlayer)
    updateStoreUI()
    updateStatsUI()
  } else if (!currentPlayer.currentUpgrades.hasOwnProperty(currBotID) && currentPlayer.currentSOIL >= currBot.botPrice) {
    currentPlayer.currentUpgrades[currBotID] = currBot
    currentPlayer.currentUpgrades[currBotID].botEntities++;
    currentPlayer.currentSOIL -= currentPlayer.currentUpgrades[currBotID].botPrice
    currentPlayer.currentUpgrades[currBotID].botPrice *= 5;
    currentPlayer.currentUpgrades[currBotID].botRate += currentPlayer.currentUpgrades[currBotID].botIncrease;
    getNewAutoXPRate(currentPlayer.currentUpgrades)
    updateLocalStorage(currentPlayer)
    updateStoreUI()
    updateStatsUI()
  } else {
    console.log("cant afford")
  }
}

//botToUpgrade , pass in the stored bot ID, currBoost, pass in the actual boost object
function addBoost(botToUpgrade, currBoost) {
  loadPlayer()
  let currBoostID = currBoost.boostID
  let currBotID = botToUpgrade.botID
  if (currentPlayer.currentUpgrades[currBotID].botBoosts.hasOwnProperty(currBoostID) && currentPlayer.currentSOIL >= currBoost.boostPrice) {
    currentPlayer.currentUpgrades[botToUpgrade.botID].botRate *= currBoost.boostMulti
    currentPlayer.currentUpgrades[currBotID].botBoosts[currBoostID].boostEntities++;
    currentPlayer.currentSOIL -= currentPlayer.currentUpgrades[currBotID].botBoosts[currBoostID].boostPrice
    getNewAutoXPRate(currentPlayer.currentUpgrades)
    updateLocalStorage(currentPlayer)
    updateStoreUI()
    updateStatsUI() 
  } else if (!currentPlayer.currentUpgrades[currBotID].botBoosts.hasOwnProperty(currBoostID) && currentPlayer.currentSOIL >= currBoost.boostPrice) {
    currentPlayer.currentUpgrades[currBotID].botBoosts[currBoostID] = currBoost
    currentPlayer.currentUpgrades[botToUpgrade.botID].botRate *= currBoost.boostMulti
    currentPlayer.currentUpgrades[currBotID].botBoosts[currBoostID].boostEntities++;
    currentPlayer.currentSOIL -= currentPlayer.currentUpgrades[currBotID].botBoosts[currBoostID].boostPrice
    currentPlayer.currentUpgrades[currBotID].botBoosts[currBoostID].boostPrice *= 100;
    getNewAutoXPRate(currentPlayer.currentUpgrades)
    updateLocalStorage(currentPlayer)
    updateStoreUI()
    updateStatsUI()
  } else {
    console.log("cant afford")
  }
}

function getNewAutoXPRate(currentUpgrades) {
  let key = ""
  let newAutoXPRate = 0
  for (key in currentUpgrades) {
    newAutoXPRate += currentUpgrades[key].botRate
  }
  currentPlayer.currentAutoXPRate = newAutoXPRate
  updateLocalStorage(currentPlayer)
}

//not working index errors
export function updateStoreUI() {
  loadPlayer()
  let currentUpgrades = currentPlayer.currentUpgrades
  let key = ""
  let altKey = ""
  for (key in currentUpgrades) {
    document.getElementById([currentUpgrades[key].botID + "ProgressBar"]).innerHTML =
      currentUpgrades[key].botRate + " / Second";
    document.getElementById([currentUpgrades[key].botID + "CounterDisplay"]).innerHTML =
      currentUpgrades[currentUpgrades[key].botID].botEntities;
    document.getElementById([currentUpgrades[key].botID + "Button"]).innerHTML =
      currentUpgrades[currentUpgrades[key].botID].botName + " Price: " +
      currentUpgrades[currentUpgrades[key].botID].botPrice;
      let currentBoosts = currentUpgrades[key].botBoosts
      for (altKey in currentBoosts) {
        document.getElementById([currentUpgrades[key].botID + currentBoosts[altKey].boostID + "Button"]).innerHTML =
        currentBoosts[altKey].boostName + " Price: " +
        currentBoosts[altKey].boostPrice;
      }
  }
}


function loadPlayer() {
  let playerToLoad = CryptoJS.AES.decrypt(
    window.localStorage.getItem("player"),
    "secret"
  ).toString(CryptoJS.enc.Utf8);
  currentPlayer = JSON.parse(playerToLoad);
}

function updateLocalStorage(player) {
  let playerToUpload = CryptoJS.AES.encrypt(JSON.stringify(player), "secret");
  window.localStorage.setItem("player", playerToUpload);
}
