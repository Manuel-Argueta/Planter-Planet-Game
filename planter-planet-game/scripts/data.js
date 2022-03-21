const usernameDisplay = document.getElementById("usernameDisplay")
const avatarDisplay = document.getElementById("playerAvatar")
const rankDisplay = document.getElementById("rankDisplay")
const treePhaseDisplay = document.getElementById("phaseDisplay")
const treesGrownDisplay = document.getElementById("treesGrown")
const soilDisplay = document.getElementById("soilDisplay")
const XPDisplay = document.getElementById("XPDisplay")

let currentPlayer = {}

export function updateStatsUI() {
    loadPlayer()
    usernameDisplay.innerHTML = currentPlayer.username;
    avatarDisplay.src = "./assets/" + currentPlayer.avatar + ".png";
    rankDisplay.innerHTML = currentPlayer.playerRank + " " + currentPlayer.rankLevel;
    treePhaseDisplay.innerHTML = currentPlayer.currentTree.currentStageName;
    treesGrownDisplay.innerHTML = currentPlayer.treesGrown
    soilDisplay.innerHTML = returnLabel(currentPlayer.currentSOIL)
    XPDisplay.innerHTML = "Total XP: " + returnLabel(currentPlayer.totalXP)
}

export function returnLabel(number) {
    let possLabels = ["Thousand", "Million", "Billion", "Trillion", "Quadrillion", "Quintillion", "Sextillion", "Septillion", "Octillion",
        "Nonillion", "Decillion", "Undecillion", "Duodecillion", "Tredecillion", "Quattuordecillion", "Quindecillion", "Sexdecillion", "Septendecillion",
        "Octodecillion", "Novemdecillion", "Vigintillion"
    ]
    let treshVals = [10e2, 10e5, 10e8, 10e11, 10e14, 10e17, 10e20, 10e23, 10e26, 10e29, 10e32, 10e35, 10e38, 10e41, 10e44, 10e47, 10e50, 10e53, 10e57, 10e60, 10e62]
    for (let i = 0; i < possLabels.length; i++) {
        if (number >= treshVals[i] && number < treshVals[i + 1]) {
            return (number / treshVals[i]).toFixed(1) + " " + possLabels[i]
        }
    }
    return number.toFixed(1)
}

function loadPlayer() {
    let playerToLoad = CryptoJS.AES.decrypt(window.localStorage.getItem("player"), "secret").toString(CryptoJS.enc.Utf8)
    currentPlayer = JSON.parse(playerToLoad);
}