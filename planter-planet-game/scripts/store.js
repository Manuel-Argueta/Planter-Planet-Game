import Bot from "./objects/Bot.js";
import Boost from "./objects/Boost.js";
import { updateStatsUI } from "./data.js";
import { returnLabel } from "./data.js";

const buyButtonSound = new Audio("./assets/shopBuyEffect.mp3")
buyButtonSound.volume = 0.01;
let currentPlayer = {};

let boostOptions = [];
let botOptions = [];

export function defineStoreOptions() {
  //Add any other boosts here (boostName,boostMulti,maxEntities, boostPrice, boostID, boostPriceIncrease)
  boostOptions.push(new Boost("3 x Multi", 3, 500, "threeMulti", 5));

  boostOptions.push(new Boost("3 x Multi", 3, 50000, "threeMulti", 5));

  boostOptions.push(new Boost("3 x Multi", 3, 150000, "threeMulti", 5));

  //Add any other bots here constructor(botName,botIncrease, maxEntities, botPrice, botID,"botIcon",botPriceIncrease)
  botOptions.push(new Bot("Droid", 1, 5, "droid", "./assets/Droid.png", 3));

  botOptions.push(
    new Bot(
      "Super Droid",
      1000,
      5000,
      "superDroid",
      "./assets/SuperDroid.png",
      3
    )
  );
  botOptions.push(
    new Bot(
      "Ultra Droid",
      10000,
      50000,
      "ultraDroid",
      "./assets/UltraDroid.png",
      3
    )
  );

  return botOptions;
}

//Create a bunch of parent divs and span elements where neccesary refactor
export function initStoreObjects(botOptions) {
  loadPlayer();
  let parentElement = document.getElementById("upgradeShop");
  //Renders all boot and bot options based on lines defined above
  for (let i = 0; i < botOptions.length; i++) {
    let itemContainer = document.createElement("div");
    itemContainer.id = botOptions[i].botID + "Item";

    let itemIconContainer = document.createElement("div");
    let itemButtonsContainer = document.createElement("div");

    let itemIcon = document.createElement("img");
    itemIcon.id = botOptions[i].botID + "Icon";
    itemIcon.src = botOptions[i].botIcon;

    let itemCounterContainer = document.createElement("div");
    itemCounterContainer.id = botOptions[i].botID + "CounterDisplayContainer";
    let itemCounter = document.createElement("p");
    itemCounter.id = botOptions[i].botID + "CounterDisplay";
    itemCounter.innerHTML = returnLabel(botOptions[i].botEntities);

    let itemButton = document.createElement("button");
    let itemButtonLabel = document.createElement("div");
    let itemButtonPrice = document.createElement("div");
    itemButton.id = botOptions[i].botID + "Button";
    itemButtonLabel.id = botOptions[i].botID + "ButtonLabel";
    itemButtonPrice.id = botOptions[i].botID + "ButtonPrice";
    itemButtonLabel.innerHTML = "Buy";
    itemButtonPrice.innerHTML = returnLabel(botOptions[i].botPrice);
    itemButton.appendChild(itemButtonLabel);
    itemButton.appendChild(itemButtonPrice);
    itemButton.addEventListener("click", function () {
      addBots(botOptions[i]);
    });

    let progressBarShell = document.createElement("div");
    progressBarShell.id = botOptions[i].botID + "ProgressBarContainer";

    let progressBar = document.createElement("div");
    progressBar.id = botOptions[i].botID + "ProgressBar";

    let progressBarLabel = document.createElement("div");
    progressBarLabel.id = botOptions[i].botID + "ProgressBarLabel";
    progressBarLabel.innerHTML =
      returnLabel(botOptions[i].botRate) + " SOIL / Second";

    let boostButton = document.createElement("button");
    let boostButtonLabel = document.createElement("div");
    let boostButtonPrice = document.createElement("div");
    boostButton.id = botOptions[i].botID + boostOptions[i].boostID + "Button";
    boostButtonLabel.id =
      botOptions[i].botID + boostOptions[i].boostID + "ButtonLabel";
    boostButtonPrice.id =
      botOptions[i].botID + boostOptions[i].boostID + "ButtonPrice";
    boostButton.appendChild(boostButtonLabel);
    boostButton.appendChild(boostButtonPrice);
    boostButtonLabel.innerHTML = boostOptions[i].boostName;
    boostButtonPrice.innerHTML = returnLabel(boostOptions[i].boostPrice);
    boostButton.addEventListener("click", function () {
      addBoost(botOptions[i], boostOptions[i]);
    })

    boostButton.className = "boostButton";
    boostButtonLabel.className = "boostButtonLabel";
    boostButtonPrice.className = "boostButtonPrice";
    itemButton.className = "botButton";
    itemButtonLabel.className = "botButtonLabel";
    itemButtonPrice.className = "botButtonPrice";
    itemIcon.className = "botIcon";
    itemCounterContainer.className = "botCounterContainer"
    itemCounter.className = "botCounter";
    progressBarLabel.className = "botProgressBarLabel";
    progressBarShell.className = "botProgressBarContainer";
    progressBar.className = "botProgressBar";
    itemContainer.className = "botContainer row";
    itemIconContainer.className = "botIconContainer col-3";
    itemButtonsContainer.className = "botButtonsContainer col-9";

    progressBarShell.appendChild(progressBar);
    progressBarShell.appendChild(progressBarLabel);
    itemButtonsContainer.appendChild(progressBarShell);
    
    itemButtonsContainer.appendChild(itemButton);
    itemButtonsContainer.appendChild(boostButton);

    itemIconContainer.appendChild(itemIcon);
    itemCounterContainer.appendChild(itemCounter)
    itemIconContainer.appendChild(itemCounterContainer);

    itemContainer.appendChild(itemIconContainer);
    itemContainer.appendChild(itemButtonsContainer);
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
    buyButtonSound.play()
    manipBotData(currBotID);
  } else if (
    !currentPlayer.currentUpgrades.hasOwnProperty(currBotID) &&
    currentPlayer.currentSOIL >= currBot.botPrice
  ) {
    buyButtonSound.play()
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
    buyButtonSound.play()
    manipBoostData(currBotID, currBoostID);
  } else if (
    currentPlayer.currentUpgrades[currBotID].botBoosts.hasOwnProperty(
      currBoostID
    ) == false &&
    currentPlayer.currentSOIL >= currBoost.boostPrice
  ) {
    buyButtonSound.play()
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
  currentPlayer.currentUpgrades[currBotID].botBoosts[currBoostID].boostPrice *=
    currentPlayer.currentUpgrades[currBotID].botBoosts[
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
      currentUpgrades[key].botID + "ProgressBarLabel",
    ]).innerText = returnLabel(currentUpgrades[key].botRate) + " SOIL / Second";

    document.getElementById([
      currentUpgrades[key].botID + "CounterDisplay",
    ]).innerHTML = returnLabel(
      currentUpgrades[currentUpgrades[key].botID].botEntities
    );

    document.getElementById([
      currentUpgrades[key].botID + "ButtonPrice",
    ]).innerHTML = returnLabel(
      currentUpgrades[currentUpgrades[key].botID].botPrice
    );

    let currentBoosts = currentUpgrades[key].botBoosts;
    for (altKey in currentBoosts) {
      document.getElementById([
        currentUpgrades[key].botID +
          currentBoosts[altKey].boostID +
          "ButtonPrice",
      ]).innerHTML = returnLabel(currentBoosts[altKey].boostPrice);
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
