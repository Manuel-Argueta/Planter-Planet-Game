import Bot from './objects/Bot.js'
import Boost from './objects/Boost.js'
import updateStatsUI from './data.js'

let currentPlayer = {}
let boostOptions = []
let botOptions = []
let boostLabelElements = []
let botLabelElements = []

//Add any other boosts here (boostName,boostMulti,maxEntities, boostPrice)
boostOptions.push(new Boost("Micronutrient Boost", 2, 150, 5, "microBoost"))
boostOptions.push(new Boost("Mulch Boost", 5, 50, 100, "mulchBoost"))
boostOptions.push(new Boost("Super Boost", 10, 20, 500, "superBoost"))

//Add any other bots here (botName,botAutoIncrease,maxEntities,botPrice)
botOptions.push(new Bot("Droid Farmer", 1.25, 100, 50, "droidFarmer"))
botOptions.push(new Bot("Droid Farmer Clan", 1.5, 50, 150, "droidClan"))
botOptions.push(new Bot("Droid Farmer Army", 1.75, 25, 500, "droidArmy"))

//Add HTML DOM elements creation
export function createStoreObjects() {
    //Renders all boot and bot options based on lines defined above
    for (let i = 0; i < boostOptions.length; i++) {
        const parentElement = document.getElementById('boost-sub-container')
        let tempContainer = document.createElement('div')
        let tempDescriptionContainer = document.createElement('div')
        let tempButton = document.createElement('button')

        tempDescriptionContainer.id = boostOptions[i].boostContainerID
        tempDescriptionContainer.innerHTML = "Price: " + boostOptions[i].boostPrice + "<br/>"
            + "Boost Amount: " + boostOptions[i].boostIncrease + "<br/>" + "Boosts Owned: " + 0 + "<br/>";
        tempContainer.appendChild(tempDescriptionContainer)

        tempButton.innerHTML = boostOptions[i].boostName
        tempButton.id = boostOptions[i].boostContainerID + "-button"
        tempButton.addEventListener('click', function () { addUserBoosts(boostOptions[i]) })
        tempContainer.appendChild(tempButton)
        parentElement.appendChild(tempContainer)

        boostLabelElements.push(tempDescriptionContainer)
    }

    for (let i = 0; i < botOptions.length; i++) {
        const parentElement = document.getElementById('bot-sub-container')
        let tempContainer = document.createElement('div')
        let tempDescriptionContainer = document.createElement('div')
        let tempButton = document.createElement('button')

        tempDescriptionContainer.id = botOptions[i].botContainerID
        tempDescriptionContainer.innerHTML = "Price: " + botOptions[i].botPrice + "<br/>"
            + "Bot Auto XP Increase: " + botOptions[i].botIncrease + "<br/>" + "Bots Owned: " + 0 + "<br/>";
        tempContainer.appendChild(tempDescriptionContainer)

        
        tempContainer.id = botOptions[i].botContainerID + "-container"
        tempButton.innerHTML = botOptions[i].botName
        tempButton.id = botOptions[i].botContainerID + "-button"
        tempButton.addEventListener('click', function () { addUserBots(botOptions[i]) })
        tempContainer.appendChild(tempButton)
        parentElement.appendChild(tempContainer)

        botLabelElements.push(tempDescriptionContainer)
    }
}

function addUserBoosts(boost) {
    loadPlayer()
    if (currentPlayer.currentUpgrades.hasOwnProperty(boost.boostContainerID)) {
        let currBoost = currentPlayer.currentUpgrades[boost.boostContainerID]
        manipUpgradeData(currBoost)
    } else {
        currentPlayer.currentUpgrades[boost.boostContainerID] = boost
        let currBoost = currentPlayer.currentUpgrades[boost.boostContainerID]
        manipUpgradeData(currBoost)
    }
    updateLocalStorage(currentPlayer)
    updateStoreUI(boostLabelElements,"boost")
    updateStatsUI()
}

function addUserBots(bot) {
    loadPlayer()
    if (currentPlayer.currentUpgrades.hasOwnProperty(bot.botContainerID)) {
        let currBot = currentPlayer.currentUpgrades[bot.botContainerID]
        manipUpgradeData(currBot)
    } else {
        currentPlayer.currentUpgrades[bot.botContainerID] = bot
        let currBot = currentPlayer.currentUpgrades[bot.botContainerID]
        manipUpgradeData(currBot,)
    }
    updateLocalStorage(currentPlayer)
    updateStoreUI(botLabelElements,"bot")
}

function manipUpgradeData(currUpgrade) {
    let upgradePrice = currUpgrade.type + "Price"
    let upgradeAbility = currUpgrade.type + "Increase"
    let upgradeEntities = currUpgrade.type + "Entities"
    let upgradeName = currUpgrade.type + "Name"
    let upgradeID = currUpgrade.type + "ContainerID"
    let XPRateType =  "current" + currUpgrade.rateType + "Rate"
    if (currentPlayer.currentSOIL >= currUpgrade[upgradePrice] && currUpgrade[upgradeEntities] <= currUpgrade.maxEntities) {
        currentPlayer.currentSOIL -= currUpgrade[upgradePrice]
        if (currUpgrade.increaseType == "multi") {
            if (currentPlayer[XPRateType] == 0) {
                currentPlayer[XPRateType] = 1;
            }
            currentPlayer[XPRateType] *= currUpgrade[upgradeAbility];
        } else if (currUpgrade.increaseType == "add") {
            currentPlayer[XPRateType] += currUpgrade[upgradeAbility];
        }
        currUpgrade[upgradeEntities]++;
        currUpgrade[upgradePrice] *= 2;
        currentPlayer.currentUpgrades[currUpgrade[upgradeID]] = currUpgrade
    } else {
        console.log("Cant afford " + currUpgrade[upgradeName])
    }
}

//UI not updating on load -bug
function updateStoreUI(descArr,upgradeType) {
    let upgradePrice = upgradeType + "Price"
    let upgradeAbility = upgradeType + "Increase"
    let upgradeEntities = upgradeType + "Entities"
    for (let i = 0; i < descArr.length; i++) {
        if (currentPlayer.currentUpgrades.hasOwnProperty(descArr[i].id)) {
            descArr[i].innerHTML = "Price: " + currentPlayer.currentUpgrades[descArr[i].id][upgradePrice] + "<br/>"
                + "Amount Increase: " + currentPlayer.currentUpgrades[descArr[i].id][upgradeAbility] + "<br/>" + "Owned: " +
                currentPlayer.currentUpgrades[descArr[i].id][upgradeEntities] + "<br/>";
        }
    }
}

function loadPlayer() {
    let playerToLoad = CryptoJS.AES.decrypt(window.localStorage.getItem("player"), "secret").toString(CryptoJS.enc.Utf8)
    currentPlayer = JSON.parse(playerToLoad);
}

function updateLocalStorage(player) {
    let playerToUpload = CryptoJS.AES.encrypt(JSON.stringify(player), "secret")
    window.localStorage.setItem("player", playerToUpload);
}

