import Bot from './objects/Bot.js'
import Boost from './objects/Boost.js'
import updateStatsUI from './data.js'

let currentPlayer = {}
let boostOptions = []
let botOptions = []

//Add any other boosts here (boostName,boostMulti,maxEntities, boostPrice)
boostOptions.push(new Boost("Micronutrient Boost", 1.1, 150, 100, "microBoost"))
boostOptions.push(new Boost("Mulch Boost", 1.5, 50, 500, "mulchBoost"))
boostOptions.push(new Boost("Super Boost", 2, 20, 2000, "superBoost"))

//Add any other bots here (botName,botAutoIncrease,maxEntities,botPrice)
botOptions.push(new Bot("Droid Farmer", 1, 100, 10, "droidFarmer"))
botOptions.push(new Bot("Droid Farmer Clan", 5, 50, 500, "droidClan"))
botOptions.push(new Bot("Droid Farmer Army", 10, 25, 5000, "droidArmy"))

//Add HTML DOM elements creation
function createStoreObjects() {
        //Renders all boot and bot options based on lines defined above
        for (let i = 0; i < boostOptions.length; i++) {
            const parentElement = document.getElementById('boost-sub-container')
            let tempContainer = document.createElement('div')
            let tempButton = document.createElement('button')
            let tempPricePara = document.createElement('p')
            let tempBoostPara = document.createElement('p')
            let tempEntityPara = document.createElement('p')

            tempContainer.id = boostOptions[i].boostContainerID + "-sub-container"
            parentElement.appendChild(tempContainer)

            tempButton.innerHTML = boostOptions[i].boostName
            tempButton.id = boostOptions[i].boostContainerID + "-button"
            tempButton.addEventListener('click', function() {addUserBoosts(boostOptions[i])})
            tempContainer.appendChild(tempButton)

            tempPricePara.id = boostOptions[i].boostContainerID + "-price"
            tempPricePara.innerHTML = "Price: " + boostOptions[i].boostPrice
            tempContainer.appendChild(tempPricePara)

            tempBoostPara.id = boostOptions[i].boostContainerID + "-multi"
            tempBoostPara.innerHTML = "Boost Amount: " + boostOptions[i].boostMultiplier
            tempContainer.appendChild(tempBoostPara)

            tempEntityPara.id = boostOptions[i].boostContainerID + "-display"
            tempEntityPara.innerHTML = "Boosts Owned: " + 0
            tempContainer.appendChild(tempEntityPara)
        }

        for (let i = 0; i < botOptions.length; i++) {
            const parentElement = document.getElementById('bot-sub-container')
            let tempContainer = document.createElement('div')
            let tempButton = document.createElement('button')
            let tempPricePara = document.createElement('p')
            let tempBoostPara = document.createElement('p')
            let tempEntityPara = document.createElement('p')


            tempContainer.id = botOptions[i].botContainerID + "-sub-container"
            parentElement.appendChild(tempContainer)

            tempButton.innerHTML = botOptions[i].botName
            tempButton.id = botOptions[i].botContainerID + "-button"
            tempButton.addEventListener('click', function() {addUserBots(botOptions[i])})
            tempContainer.appendChild(tempButton)

            tempPricePara.id = botOptions[i].botContainerID + "-price"
            tempPricePara.innerHTML = "Price: " + botOptions[i].botPrice
            tempContainer.appendChild(tempPricePara)

            tempBoostPara.id = botOptions[i].botContainerID + "-multi"
            tempBoostPara.innerHTML = "Auto XP Rate: " + botOptions[i].botAutoIncrease
            tempContainer.appendChild(tempBoostPara)

            tempEntityPara.id = boostOptions[i].boostContainerID + "-display"
            tempEntityPara.innerHTML = "Bots Owned: " + 0
            tempContainer.appendChild(tempEntityPara)
        }
}

function addUserBoosts(boost) {
    loadPlayer()
    if (currentPlayer.currentSOIL >= boost.boostPrice &&  boost.boostEntities < boost.maxEntities) {
        boost.boostEntities++;
        currentPlayer.currentUpgrades.push(boost)
        currentPlayer.currentXPRate *= (boost.boostMultiplier)
        currentPlayer.currentSOIL -= boost.boostPrice
    } else if (currentPlayer.currentSOIL >= boost.botPrice) {
        boost.boostEntities++;
        currentPlayer.currentXPRate *= (boost.boostMultiplier)
        currentPlayer.currentSOIL -= boost.boostPrice
    }
    updateLocalStorage(currentPlayer)
    updateStatsUI()
}

function addUserBots(bot) {
    loadPlayer()
    if (currentPlayer.currentSOIL >= bot.botPrice && bot.botEntities < bot.maxEntities) {
        bot.botEntities++;
        currentPlayer.currentUpgrades.push(bot)
        console.log("Purchased " + bot.botName)
        console.log("New Rate: " + bot.botAutoIncrease)
        console.log("Purchase Price: " + bot.boostPrice)
        currentPlayer.currentAutoXPRate += (bot.botAutoIncrease)
        currentPlayer.currentSOIL -= bot.botPrice
    } else if (currentPlayer.currentSOIL >= bot.botPrice) {
        bot.botEntities++;
        console.log("Purchased " + bot.botName)
        console.log("New Rate: " + bot.boostMultiplier*bot.botEntities)
        console.log("Purchase Price: " + bot.boostPrice)
        currentPlayer.currentAutoXPRate += (bot.botAutoIncrease)
        currentPlayer.currentSOIL -= bot.botPrice
    }
    updateLocalStorage(currentPlayer)
    updateStatsUI()
}

function findInList(elem,arr) {
    return arr.filter(x => x == elem)
}

function loadPlayer() {
    let playerToLoad = CryptoJS.AES.decrypt(window.localStorage.getItem("player"), "secret").toString(CryptoJS.enc.Utf8)
    currentPlayer = JSON.parse(playerToLoad);
}

function updateLocalStorage(player) {
    let playerToUpload = CryptoJS.AES.encrypt(JSON.stringify(player), "secret")
    window.localStorage.setItem("player", playerToUpload);
    console.log("saved after purchase")
}

export default createStoreObjects;

