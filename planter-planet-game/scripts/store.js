import Bot from './objects/Bot.js'
import Boost from './objects/Boost.js'

let currentPlayer = {}

//Add HTML DOM elements creation
function createStoreObjects() {
    let storeOptions = []
    
    //Add any other boosts here (boostName,boostMulti,maxEntities, boostPrice)
    storeOptions.push(new Boost("Fertilzer Boost",5,))
    storeOptions.push(new Boost())
    storeOptions.push(new Boost())

    //Add any other bots here (botName,botAutoIncrease,maxEntities,botPrice)
    storeOptions.push(new Boost())
    storeOptions.push(new Boost())
    storeOptions.push(new Boost())
    return storeOptions
}

// function updateUserUpgrades() {

// }

function loadPlayer() {
    let playerToLoad = CryptoJS.AES.decrypt(window.localStorage.getItem("player"),"secret").toString(CryptoJS.enc.Utf8)
    currentPlayer = JSON.parse(playerToLoad);
}