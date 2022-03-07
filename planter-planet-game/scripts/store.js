import Bot from './objects/Bot.js'
import Boost from './objects/Boost.js'
import updateStatsUI from './data.js'

let currentPlayer = {}
let boostOptions = []
let botOptions = []
let boostElements = []
let botElements = []

//Add any other boosts here (boostName,boostMulti,maxEntities, boostPrice)
boostOptions.push(new Boost("Micronutrient Boost", 1.1, 150, 100, "microBoost"))
boostOptions.push(new Boost("Mulch Boost", 1.5, 50, 500, "mulchBoost"))
boostOptions.push(new Boost("Super Boost", 2, 20, 2000, "superBoost"))

//Add any other bots here (botName,botAutoIncrease,maxEntities,botPrice)
botOptions.push(new Bot("Droid Farmer", 1, 100, 10, "droidFarmer"))
botOptions.push(new Bot("Droid Farmer Clan", 5, 50, 500, "droidClan"))
botOptions.push(new Bot("Droid Farmer Army", 10, 25, 5000, "droidArmy"))

//Add HTML DOM elements creation
export function createStoreObjects() {
        //Renders all boot and bot options based on lines defined above
        for (let i = 0; i < boostOptions.length; i++) {
            const parentElement = document.getElementById('boost-sub-container')
            let tempContainer = document.createElement('div')
            let tempButton =document.createElement('button')

            tempContainer.id = boostOptions[i].boostContainerID 
            tempContainer.innerHTML = "Price: " + boostOptions[i].boostPrice + "<br/>"
            + "Boost Amount: " + boostOptions[i].boostMultiplier + "<br/>" + "Boosts Owned: " + 0 + "<br/>";
            parentElement.appendChild(tempContainer)
             
            tempButton.innerHTML = boostOptions[i].boostName
            tempButton.id = boostOptions[i].boostContainerID + "-button"
            tempButton.addEventListener('click', function() {addUserBoosts(boostOptions[i])})
            tempContainer.appendChild(tempButton)

            boostElements.push(tempContainer)
        }

        for (let i = 0; i < botOptions.length; i++) {
            const parentElement = document.getElementById('bot-sub-container')
            let tempContainer = document.createElement('div')
            let tempButton = document.createElement('button')

            tempContainer.id = botOptions[i].botContainerID
            tempContainer.innerHTML = "Price: " + botOptions[i].botPrice + "<br/>"
            + "Bot Auto XP Increase: " + botOptions[i].botAutoIncrease + "<br/>" + "Bots Owned: " + 0 + "<br/>";
            parentElement.appendChild(tempContainer)

            tempButton.innerHTML = botOptions[i].botName
            tempButton.id = botOptions[i].botContainerID + "-button"
            tempButton.addEventListener('click', function() {addUserBots(botOptions[i])})
            tempContainer.appendChild(tempButton)
            botElements.push(tempContainer)
        }
}

//Not being called on first click
function addUserBoosts(boost) {
    loadPlayer()
    if (currentPlayer.currentUpgrades.hasOwnProperty(boost.boostContainerID)) {
        let currBoost = currentPlayer.currentUpgrades[boost.boostContainerID]
        if (currentPlayer.currentSOIL >= currBoost.boostPrice) {
        currentPlayer.currentSOIL -= currBoost.boostPrice;
        currentPlayer.currentXPRate *= currBoost.boostMultiplier;
        currBoost.boostEntities++;
        currBoost.boostPrice *= 2;
        currentPlayer.currentUpgrades[boost.boostContainerID] = currBoost
        console.log(currentPlayer.currentUpgrades)
        } else {
            console.log("cant afford " + currBoost.boostName)
        }
    } else {
        currentPlayer.currentUpgrades[boost.boostContainerID] = boost
    }
    updateLocalStorage(currentPlayer)
    updateStatsUI()
    updateStoreUI()
}

function addUserBots(bot) {
    loadPlayer()
    if (currentPlayer.currentUpgrades.hasOwnProperty(bot.botContainerID)) {
        let currBot = currentPlayer.currentUpgrades[bot.botContainerID]
        if (currentPlayer.currentSOIL >= currBot.botPrice) {
        currentPlayer.currentSOIL -= currBot.botPrice;
        currentPlayer.currentAutoXPRate += currBot.botAutoIncrease;
        currBot.botEntities++;
        currBot.botPrice *= 2;
        currentPlayer.currentUpgrades[bot.botContainerID] = currBot
        console.log(currentPlayer.currentUpgrades)
        } else {
            console.log("cant afford " + currBot.botName)
        }
    } else {
        currentPlayer.currentUpgrades[bot.botContainerID] = bot
    }
    updateLocalStorage(currentPlayer)
    updateStatsUI()
}

//UI not updating - bug
function updateStoreUI() {
    for (let i = 0; i > boostElements.length; i++) {
        if (currentPlayer.currentUpgrades.hasOwnProperty(boostElements[i].id)) {
            console.log("updated")
        boostElements[i].innerHTML = "Price: " + currentPlayer.currentUpgrades[boostElements[i].id].boostPrice  + "<br/>"
        + "Boost Amount: " + currentPlayer.currentUpgrades[boostElements[i].id].boostMultiplier + "<br/>" + "Boosts Owned: " + 
        currentPlayer.currentUpgrades[boostElements[i].id].boostInstances + "<br/>";
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


