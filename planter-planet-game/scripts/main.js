//Import tree class
import Tree from "./objects/Tree.js";
import updateStatsUI from "./data.js";
// Getting the main HTML elements
const stageImage = document.getElementById("stageImage");
const progressBar = document.getElementById("stage-progress");
const XPButton = document.getElementById("addXPButton");
const XPDisplay = document.getElementById("XPDisplay")
const usernameField = document.getElementById("usernameField");
const beginButton = document.getElementById("beginGame");

const statsContainer = document.getElementById("main-stats-container")
const gameContainer = document.getElementById("main-game-container")

// Creates event lsiteners for main inputs
XPButton.addEventListener("click", updateXP);
beginButton.addEventListener("click", createNewPlayer);

// Defines empty object where the players information will be stored and manipulated
let currentPlayer = {};

const playerRanks = ["Dogwater Farmer", "Farmer", "Bio Hero", "Bio Invoker", "God"]

// Sets up environment on page load
window.onload = function() {
    setup()
};

function setup() {
    loadPlayer();
    loadStage();
    loadProgress();
    updateStatsUI();
}

function updateXP() {
    let treeToLoad = currentPlayer.currentTree;
    if (checkTreeStage()) {
        treeToLoad.currentXP+=10;
        updateLocalStorage(currentPlayer);
        setup()
    }
}

function checkTreeStage() {
    let treeToLoad = currentPlayer.currentTree;
    if (treeToLoad.currentXP < treeToLoad.threshXP) {
        return true;
    } else if (treeToLoad.currentXP >= 100 && treeToLoad.currentStageName != "mature") {
        treeToLoad.currentXP = 0;
        progressBar.style.width = treeToLoad.currentXP + "%";
        treeToLoad.currentStage++;
        treeToLoad.currentStageName =
        treeToLoad.treeStages[treeToLoad.currentStage];
        updateLocalStorage(currentPlayer);
        setup()
        return false;
    } else if (treeToLoad.currentStageName == "mature") {
        let newTree = new Tree();
        currentPlayer.currentTree = newTree;
        currentPlayer.treesGrown++;
        ascendRank(currentPlayer.treesGrown)
        updateLocalStorage(currentPlayer);
        setup()
    }
}

//Must refactor and make more efficient
// function ascendRank(treesGrown) {
//     if (treesGrown > 5 && currentPlayer.rankLevel > 1) {
//         currentPlayer.rankLevel--;
//     }
//     if (treesGrown > 40 && currentPlayer.rankLevel >=  1) {
//         currentPlayer.rankIndex++;
//         currentPlayer.playerRank = playerRanks[currentPlayer.rankIndex]
//         currentPlayer.rankLevel = 3;
//     } 
// }

function loadProgress() {
    let treeToLoad = currentPlayer.currentTree;
    progressBar.style.width = treeToLoad.currentXP + "%";
    XPDisplay.innerHTML = "Current XP: " + treeToLoad.currentXP;
}

// Loads the asset for the current trees stage
function loadStage() {
    let treeToLoad = currentPlayer.currentTree;
    if (treeToLoad.currentStageName == "seed") {
        stageImage.src = "./assets/seedStage.png";
    } else if (treeToLoad.currentStageName == "sprout") {
        stageImage.src = "./assets/sproutStage.png";
    } else if (treeToLoad.currentStageName == "sapling") {
        stageImage.src = "./assets/saplingStage.png";
    } else if (treeToLoad.currentStageName == "young") {
        stageImage.src = "./assets/youngTreeStage.png";
    } else if (treeToLoad.currentStageName == "mature") {
        stageImage.src = "./assets/matureTreeStage.png";
    }
}

function loadPlayer() {
    statsContainer.hidden = true;
    gameContainer.hidden = true;
    beginButton.hidden = true;
    if (window.localStorage.getItem("player") === null) {
        //Check if user exists in DB, if yes pull form DB, if not do this
        //alert("Please enter a username to begin");
        beginButton.hidden = false;
    } else {
        usernameField.hidden = true;
        statsContainer.hidden = false;
        gameContainer.hidden = false;
        currentPlayer = JSON.parse(window.localStorage.getItem("player"));
    }
}

function createNewPlayer() {
    let genesisTree = new Tree();
    let newPlayer = {
        username: usernameField.value,
        avatar: "https://gateway.pinata.cloud/ipfs/QmcAFtNfnCmnrY2XAPpn3aHpoHnPKxF5ZXYZ4Fvyptxb1n",
        rankIndex: 0,
        playerRank: playerRanks[0],
        rankLevel: 3,
        treesGrown: 0,
        address: "0x0000000000000000000000000",
        currentSOIL: 0,
        currentTree: genesisTree,
    };
    updateLocalStorage(newPlayer);
    currentPlayer = newPlayer;
    setup()
    usernameField.hidden = true;
    beginButton.hidden = true;
}

function updateLocalStorage(player) {
    window.localStorage.setItem("player", JSON.stringify(player));
}
