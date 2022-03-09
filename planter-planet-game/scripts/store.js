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
    new Bot("Droid", 10, 5000, 250, "droid", "./assets/Droid.png")
  );
  botOptions.push(
    new Bot("Super Droid", 50, 2500, 1000, "superDroid", "./assets/Droid.png")
  );
  botOptions.push(
    new Bot("Ultra Droid", 100, 1000, 5000, "ultraDroid", "./assets/Droid.png")
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
    itemButton.addEventListener('click',addBots)

    let progressBar = document.createElement("div");
    progressBar.id = botOptions[i].botID + "ProgressBar";
    progressBar.innerHTML =  botOptions[i].botRate + " / Second";
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
      boostButton.id = boostOptions[j].boostID + "Button";
      boostButton.innerHTML = boostOptions[j].boostName + " Price: " + boostOptions[j].boostPrice;
      itemContainer.appendChild(boostButton);
    }
    parentElement.appendChild(itemContainer);
  }
}

function addBots() {
  loadPlayer()
  for (let i = 0; i < botOptions.length; i++) {
    let currBotID = botOptions[i].botID
    if (currentPlayer.currentUpgrades.hasOwnProperty(currBotID) && currentPlayer.currentSOIL >= currentPlayer.currentUpgrades[currBotID].botPrice) {
      currentPlayer.currentUpgrades[currBotID].botEntities++;
      currentPlayer.currentSOIL -= currentPlayer.currentUpgrades[currBotID].botPrice
      currentPlayer.currentUpgrades[currBotID].botPrice *= 100;
      currentPlayer.currentUpgrades[currBotID].botRate += currentPlayer.currentUpgrades[currBotID].botIncrease;
      getNewAutoXPRate(botOptions)
      updateLocalStorage(currentPlayer)
      updateStoreUI(botOptions)
      updateStatsUI()
    } else if (currentPlayer.currentSOIL >= botOptions[i].botPrice) {
      currentPlayer.currentUpgrades[currBotID] = botOptions[i]
      currentPlayer.currentUpgrades[currBotID].botEntities++;
      currentPlayer.currentSOIL -= currentPlayer.currentUpgrades[currBotID].botPrice
      currentPlayer.currentUpgrades[currBotID].botPrice *= 100;
      currentPlayer.currentUpgrades[currBotID].botRate += currentPlayer.currentUpgrades[currBotID].botIncrease;
      getNewAutoXPRate(botOptions)
      updateLocalStorage(currentPlayer)
      updateStoreUI(botOptions)
      updateStatsUI()
    }
  }
}

function getNewAutoXPRate(botOptions) {
  let currentUpgrades = currentPlayer.currentUpgrades
  let newAutoXPRate = 0
  for (let i = 0; i < botOptions.length; i++) {
    newAutoXPRate += currentUpgrades[botOptions[i].botID].botRate 

  }
  currentPlayer.currentAutoXPRate = newAutoXPRate
  updateLocalStorage(currentPlayer)
}

//not working index errors
export function updateStoreUI(botOptions) {
  loadPlayer()
  let currentUpgrades = currentPlayer.currentUpgrades
  console.log(currentUpgrades)
  let count = Object.keys(currentUpgrades).length
  console.log(count)
  for (let i = 0; i < count; i++) {
    console.log(botOptions[i])
    document.getElementById([botOptions[i].botID + "ProgressBar"]).innerHTML =  
    currentUpgrades[botOptions[i].botID].botRate + " / Second";
    document.getElementById([botOptions[i].botID + "CounterDisplay"]).innerHTML = 
    currentUpgrades[botOptions[i].botID].botEntities;
    document.getElementById([botOptions[i].botID + "Button"]).innerHTML = 
    currentUpgrades[botOptions[i].botID].botName + " Price: " + currentUpgrades[botOptions[i].botID].botPrice;

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
