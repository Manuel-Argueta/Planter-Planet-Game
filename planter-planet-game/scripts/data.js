const usernameDisplay = document.getElementById("username")
const avatarDisplay = document.getElementById("playerAvatar")
const rankDisplay = document.getElementById("rank")
const treesGrownDisplay = document.getElementById("treesGrown")
const soilDisplay = document.getElementById("soil-count")
const XPDisplay = document.getElementById("XPDisplay")
const XPRateDisplay = document.getElementById("XPRateDisplay")
const AutoXPRateDisplay = document.getElementById("AutoXPRateDisplay")



let currentPlayer = {}

function updateStatsUI() {
    loadPlayer()
    usernameDisplay.innerHTML = "Username: " + currentPlayer.username;
    avatarDisplay.src = currentPlayer.avatar;
    rankDisplay.innerHTML = "Rank: " + currentPlayer.playerRank + " " + currentPlayer.rankLevel;
    treesGrownDisplay.innerHTML = "Trees Grown: " + currentPlayer.treesGrown
    soilDisplay.innerHTML = "Current SOIL: " + currentPlayer.currentSOIL
    XPDisplay.innerHTML = "Current XP: " + currentPlayer.currentTree.currentXP;
    XPRateDisplay.innerHTML = "Current XP Rate: " + currentPlayer.currentXPRate;
    AutoXPRateDisplay.innerHTML = "Current Auto XP Rate: " + currentPlayer.currentAutoXPRate;
}

function loadPlayer() {
    let playerToLoad = CryptoJS.AES.decrypt(window.localStorage.getItem("player"),"secret").toString(CryptoJS.enc.Utf8)
    currentPlayer = JSON.parse(playerToLoad);
}

export default updateStatsUI