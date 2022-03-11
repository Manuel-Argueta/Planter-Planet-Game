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
    soilDisplay.innerHTML = "SOIL: " + returnLabel(currentPlayer.currentSOIL)
    XPDisplay.innerHTML = "Total XP: " + returnLabel(currentPlayer.totalXP)
}

export function returnLabel(number) {
    let possLabels = ["Thousand", "Million","Billion","Trillion","Quadrillion","Quintillion","Sextillion","Septillion","Octillion","Nonillion"]
    let treshVals = [10e2,10e5,10e8,10e11,10e14,10e17,10e20,10e23,10e26,10e29]
    for (let i = 0; i < possLabels.length;i++) {
        if (number >= treshVals[i] && number < treshVals[i+1]) {
            return (number/treshVals[i]).toFixed(1) + " " + possLabels[i]
        }
    } 
    return number
}
function loadPlayer() {
    let playerToLoad = CryptoJS.AES.decrypt(window.localStorage.getItem("player"),"secret").toString(CryptoJS.enc.Utf8)
    currentPlayer = JSON.parse(playerToLoad);
}
