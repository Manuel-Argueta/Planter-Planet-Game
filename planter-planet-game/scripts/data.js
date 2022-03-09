const usernameDisplay = document.getElementById("usernameDisplay")
const avatarDisplay = document.getElementById("playerAvatar")
const rankDisplay = document.getElementById("rankDisplay")
const treesGrownDisplay = document.getElementById("treesGrown")
const soilDisplay = document.getElementById("soilDisplay")
const XPDisplay = document.getElementById("XPDisplay")

let currentPlayer = {}

export function updateStatsUI() {
    loadPlayer()
    usernameDisplay.innerHTML = currentPlayer.username;
    avatarDisplay.src = currentPlayer.avatar;
    rankDisplay.innerHTML = "Rank: " + currentPlayer.playerRank + " " + currentPlayer.rankLevel;
    treesGrownDisplay.innerHTML = "Trees Grown: " + currentPlayer.treesGrown
    soilDisplay.innerHTML = "SOIL: " + currentPlayer.currentSOIL.toFixed(1)
    XPDisplay.innerHTML = "Total XP: " + currentPlayer.totalXP.toFixed(1);
}

function loadPlayer() {
    let playerToLoad = CryptoJS.AES.decrypt(window.localStorage.getItem("player"),"secret").toString(CryptoJS.enc.Utf8)
    currentPlayer = JSON.parse(playerToLoad);
}
