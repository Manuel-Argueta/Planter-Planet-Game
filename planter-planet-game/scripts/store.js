import Bot from './objects/Bot.js'
import Boost from './objects/Boost.js'

let currentPlayer = {}

createStoreObjects()

//Add HTML DOM elements creation
function createStoreObjects() {
    const parentElement = document.getElementById('main-shop-container')
    let boostOptions = []
    let botOptions = []
    //Add any other boosts here (boostName,boostMulti,maxEntities, boostPrice)
    boostOptions.push(new Boost("Micronutrient Boost",1.1,100,100,"microBoost"))
    boostOptions.push(new Boost("Mulch Boost",1.5,50,500,"mulchBoost"))
    boostOptions.push(new Boost("Super Boost",2,20,2000,"superBoost"))

    //Add any other bots here (botName,botAutoIncrease,maxEntities,botPrice)
    botOptions.push(new Bot("Droid Farmer",5,100,100))
    botOptions.push(new Bot("Droid Farmer Clan",10,50,500))
    botOptions.push(new Bot("Droid Farmer Army",20,25,100))
    console.log("called")

    for (let i = 0; i < boostOptions.length; i++) {
        let tempContainer = document.createElement('div')
        let tempButton = document.createElement('button')
        let tempPricePara = document.createElement('p')
        let tempBoostPara = document.createElement('p')
        let tempEntityPara = document.createElement('p')


        tempContainer.id = boostOptions[i].boostContainerID +"-sub-container"
        parentElement.appendChild(tempContainer)

        tempButton.innerHTML = boostOptions[i].boostName
        tempButton.addEventListener('click',updateUserUpgrades)
        tempContainer.appendChild(tempButton)

        tempPricePara.id = boostOptions[i].boostContainerID +"-price"
        tempPricePara.innerHTML = "Price: " + boostOptions[i].boostPrice
        tempContainer.appendChild(tempPricePara)

        tempBoostPara.id = boostOptions[i].boostContainerID +"-multi"
        tempBoostPara.innerHTML = "Boost Amount: " + boostOptions[i].boostMultiplier
        tempContainer.appendChild(tempBoostPara)

        tempEntityPara.id = boostOptions[i].boostConainerID +"-entity"
        tempEntityPara.innerHTML = "Current Owned: " + boostOptions[i].currentInstances
        tempContainer.appendChild(tempEntityPara)
    }

}

//edit to add current updrages to users data
function updateUserUpgrades() {

}

function loadPlayer() {
    let playerToLoad = CryptoJS.AES.decrypt(window.localStorage.getItem("player"),"secret").toString(CryptoJS.enc.Utf8)
    currentPlayer = JSON.parse(playerToLoad);
}




