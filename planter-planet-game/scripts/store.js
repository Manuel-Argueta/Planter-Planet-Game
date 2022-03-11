import Bot from "./objects/Bot.js";
import Boost from "./objects/Boost.js";
import { updateStatsUI } from "./data.js";
import { returnLabel } from "./data.js"

let currentPlayer = {};

let boostOptions = [];
let botOptions = [];
export function defineStoreOptions() {
  //Add any other boosts here (boostName,boostMulti,maxEntities, boostPrice, boostID, boostPriceIncrease)
  boostOptions.push(new Boost("3 x Multi", 3, 500, "ThreeMulti",5));

  boostOptions.push(new Boost("3 x Multi", 3, 50000, "ThreeMulti",5));

  boostOptions.push(new Boost("3 x Multi", 3, 1500000, "ThreeMulti",5));

  //Add any other bots here constructor(botName,botIncrease, maxEntities, botPrice, botID,"botIcon",botPriceIncrease)
  botOptions.push(
    new Bot("Droid", 10, 5, "droid", "./assets/Droid.png", 3)
  );

  botOptions.push(
    new Bot(
      "Super Droid",
      50,
      5000,
      "superDroid",
      "./assets/SuperDroid.png",
      3
    )
  );
  botOptions.push(
    new Bot(
      "Ultra Droid",
      1000,
      500000,
      "ultraDroid",
      "./assets/UltraDroid.png",
      3
    )
  );

  return botOptions;
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
    itemIcon.id = botOptions[i].botID + "Icon";
    itemIcon.src = botOptions[i].botIcon;

    let itemCounter = document.createElement("p");
    itemCounter.id = botOptions[i].botID + "CounterDisplay";
    itemCounter.innerHTML = botOptions[i].botEntities;

    let progressBarShell = document.createElement("div");
    progressBarShell.id = botOptions[i].botID + "ProgressBarContainer";

    let itemButton = document.createElement("button");
    itemButton.id = botOptions[i].botID + "Button";
    itemButton.innerHTML =
      botOptions[i].botName + " Price: " + botOptions[i].botPrice;
    itemButton.addEventListener("click", function () {
      addBots(botOptions[i]);
    });

    let progressBar = document.createElement("div");
    progressBar.id = botOptions[i].botID + "ProgressBar";

    let progressBarText = document.createElement("div");
    progressBarText.id = botOptions[i].botID + "ProgressBarText";
    progressBarText.innerHTML = botOptions[i].botRate + " / Second";

    let boostButton = document.createElement("button");
    boostButton.id = botOptions[i].botID + boostOptions[i].boostID + "Button";
    boostButton.innerHTML =
      boostOptions[i].boostName + " Price: " + boostOptions[i].boostPrice;
    boostButton.addEventListener("click", function () {
      addBoost(botOptions[i], boostOptions[i]);
    });

    itemButton.className = "botButton";
    itemIcon.className = "botIcon";
    itemCounter.className = "botCounter";
    progressBarShell.className = "botProgressBarContainer";
    progressBar.className = "botProgressBar";

    progressBarShell.appendChild(progressBar);
    progressBar.appendChild(progressBarText);
    itemContainer.appendChild(progressBarShell);
    itemContainer.appendChild(itemIcon);
    itemContainer.appendChild(itemCounter);
    itemContainer.appendChild(itemButton);
    itemContainer.appendChild(boostButton);
    parentElement.appendChild(itemContainer);
  }
}

function addBots(currBot) {
  loadPlayer();
  let currBotID = currBot.botID;
  if (
    currentPlayer.currentUpgrades.hasOwnProperty(currBotID) &&
    currentPlayer.currentSOIL >=
      currentPlayer.currentUpgrades[currBotID].botPrice
  ) {
    manipBotData(currBotID);
  } else if (
    !currentPlayer.currentUpgrades.hasOwnProperty(currBotID) &&
    currentPlayer.currentSOIL >= currBot.botPrice
  ) {
    currentPlayer.currentUpgrades[currBotID] = currBot;
    manipBotData(currBotID);
  } else {
    console.log("Cant afford " + currBotID);
  }
}

function manipBotData(currBotID) {
  currentPlayer.currentUpgrades[currBotID].botEntities++;
  currentPlayer.currentSOIL -=
    currentPlayer.currentUpgrades[currBotID].botPrice;
  currentPlayer.currentUpgrades[currBotID].botPrice *=
    currentPlayer.currentUpgrades[currBotID].botPriceIncrease;
  currentPlayer.currentUpgrades[currBotID].botRate +=
    currentPlayer.currentUpgrades[currBotID].botIncrease;
  getNewAutoXPRate(currentPlayer.currentUpgrades);
  updateLocalStorage(currentPlayer);
  updateStoreUI();
  updateStatsUI();
}

//botToUpgrade , pass in the stored bot ID, currBoost, pass in the actual boost object
function addBoost(botToUpgrade, currBoost) {
  loadPlayer();
  let currBoostID = currBoost.boostID;
  let currBotID = botToUpgrade.botID;
  if (
    currentPlayer.currentUpgrades[currBotID].botBoosts.hasOwnProperty(
      currBoostID
    ) &&
    currentPlayer.currentSOIL >=
      currentPlayer.currentUpgrades[currBotID].botBoosts[currBoostID].boostPrice
  ) {
    manipBoostData(currBotID, currBoostID);
  } else if (
    currentPlayer.currentUpgrades[currBotID].botBoosts.hasOwnProperty(
      currBoostID
    ) == false &&
    currentPlayer.currentSOIL >= currBoost.boostPrice
  ) {
    currentPlayer.currentUpgrades[currBotID].botBoosts[currBoostID] = currBoost;
    manipBoostData(currBotID, currBoostID);
  } else {
    console.log("Cant afford " + currBoostID);
  }
}

function manipBoostData(currBotID, currBoostID) {
  currentPlayer.currentUpgrades[currBotID].botRate *=
  currentPlayer.currentUpgrades[currBotID].botBoosts[currBoostID].boostMulti;
  currentPlayer.currentUpgrades[currBotID].botIncrease *=
    currentPlayer.currentUpgrades[currBotID].botBoosts[currBoostID].boostMulti;
  currentPlayer.currentUpgrades[currBotID].botBoosts[currBoostID]
    .boostEntities++;
  currentPlayer.currentSOIL -=
    currentPlayer.currentUpgrades[currBotID].botBoosts[currBoostID].boostPrice;
  currentPlayer.currentUpgrades[currBotID].botBoosts[
    currBoostID
  ].boostPrice *= currentPlayer.currentUpgrades[currBotID].botBoosts[
    currBoostID
  ].boostPriceIncrease;
  getNewAutoXPRate(currentPlayer.currentUpgrades);
  updateLocalStorage(currentPlayer);
  updateStoreUI();
  updateStatsUI();
}

function getNewAutoXPRate(currentUpgrades) {
  let key = "";
  let newAutoXPRate = 0;
  for (key in currentUpgrades) {
    newAutoXPRate += currentUpgrades[key].botRate;
  }
  currentPlayer.currentAutoXPRate = newAutoXPRate;
  updateLocalStorage(currentPlayer);
}

//not working index errors
export function updateStoreUI() {
  loadPlayer();
  let currentUpgrades = currentPlayer.currentUpgrades;
  let key;
  let altKey;
  for (key in currentUpgrades) {
    startAnimations([currentUpgrades[key].botID + "ProgressBar"]);
    document.getElementById([
      currentUpgrades[key].botID + "ProgressBarText",
    ]).innerHTML = returnLabel(currentUpgrades[key].botRate) + " / Second";

    document.getElementById([
      currentUpgrades[key].botID + "CounterDisplay",
    ]).innerHTML = currentUpgrades[currentUpgrades[key].botID].botEntities;

    document.getElementById([currentUpgrades[key].botID + "Button"]).innerHTML =
      currentUpgrades[currentUpgrades[key].botID].botName +
      " Price: " +
      returnLabel(currentUpgrades[currentUpgrades[key].botID].botPrice);

    let currentBoosts = currentUpgrades[key].botBoosts;
    for (altKey in currentBoosts) {
      document.getElementById([
        currentUpgrades[key].botID + currentBoosts[altKey].boostID + "Button",
      ]).innerHTML =
        currentBoosts[altKey].boostName +
        " Price: " +
        returnLabel(currentBoosts[altKey].boostPrice);
    }
  }
}

function startAnimations(progressBar) {
  let bar = document.getElementById(progressBar);
  let barWidth = bar.style.width;
  setInterval(renderAnimation, 10);

  function renderAnimation() {
    if (barWidth >= 100) {
      barWidth = 0;
    } else {
      barWidth++;
      bar.style.width = barWidth + "%";
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
