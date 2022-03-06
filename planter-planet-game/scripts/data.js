const usernameDisplay = document.getElementById("username")
const avatarDisplay = document.getElementById("playerAvatar")
const rankDisplay = document.getElementById("rank")
const treesGrownDisplay = document.getElementById("treesGrown")
const soilDisplay = document.getElementById("soil-count")
const XPDisplay = document.getElementById("XPDisplay")
const XPRateDisplay = document.getElementById("XPRateDisplay")
const AutoXPRateDisplay = document.getElementById("AutoXPRateDisplay")
const microBoostCountDisplay = document.getElementById("microBoost-display")
const superBoostCountDisplay = document.getElementById("superBoost-display")
const ultraBoostCountDisplay = document.getElementById("ultraBoost-display")

const droidFarmerCountDisplay = document.getElementById("droidFarm-display")
const droidClanCountDisplay = document.getElementById("droidClan-display")
const droidArmyCountDisplay = document.getElementById("droidArmy-display")




let currentPlayer = {}

function updateStatsUI() {
    loadPlayer()
    usernameDisplay.innerHTML = "Username: " + currentPlayer.username;
    avatarDisplay.src = currentPlayer.avatar;
    rankDisplay.innerHTML = "Rank: " + currentPlayer.playerRank + " " + currentPlayer.rankLevel;
    treesGrownDisplay.innerHTML = "Trees Grown: " + currentPlayer.treesGrown
    soilDisplay.innerHTML = "Current SOIL: " + currentPlayer.currentSOIL
    XPDisplay.innerHTML = "Current XP: " + currentPlayer.currentTree.currentXP.toFixed(1);
    XPRateDisplay.innerHTML = "Current XP Rate: " + currentPlayer.currentXPRate.toFixed(1) + "/ click";
    AutoXPRateDisplay.innerHTML = "Current Auto XP Rate: " + currentPlayer.currentAutoXPRate + "/ second";
    //console.log(currentPlayer.currentUpgrades)
    //Figure out how to access individual boosts and bot values
    // microBoostCountDisplay.innerHTML = "Boosts Owned: " + currentPlayer.currentUpgrades;
    // superBoostCountDisplay.innerHTML = "Boosts Owned: " + currentPlayer.currentAutoXPRate;
    // ultraBoostCountDisplay.innerHTML = "Boosts Owned: " + currentPlayer.currentAutoXPRate;

    // droidFarmerCountDisplay.innerHTML = "Bots Owned: " + currentPlayer.currentAutoXPRate;
    // droidClanCountDisplay.innerHTML = "Bots Owned: " + currentPlayer.currentAutoXPRate;
    // droidArmyCountDisplay.innerHTML = "Bots Owned: " + currentPlayer.currentAutoXPRate;
}

function loadPlayer() {
    let playerToLoad = CryptoJS.AES.decrypt(window.localStorage.getItem("player"),"secret").toString(CryptoJS.enc.Utf8)
    currentPlayer = JSON.parse(playerToLoad);
}

export default updateStatsUI;