const usernameDisplay = document.getElementById("username")
const avatarDisplay = document.getElementById("playerAvatar")
const rankDisplay = document.getElementById("rank")
const treesGrownDisplay = document.getElementById("treesGrown")

let currentPlayer = {}

function updateStatsUI() {
    loadPlayer()
    usernameDisplay.innerHTML = "Username: " + currentPlayer.username;
    avatarDisplay.src = currentPlayer.avatar;
    rankDisplay.innerHTML = "Rank: " + currentPlayer.playerRank + " " + currentPlayer.rankLevel;
    treesGrownDisplay.innerHTML = "Trees Grown: " + currentPlayer.treesGrown
}

function loadPlayer() {
    currentPlayer = JSON.parse(window.localStorage.getItem("player"));
}

export default updateStatsUI