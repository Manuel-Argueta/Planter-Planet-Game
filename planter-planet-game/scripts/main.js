//Import tree class
import Tree from "./objects/Tree.js";
import { updateStatsUI } from "./data.js"
import { initStoreObjects } from "./store.js";
import { defineStoreOptions } from "./store.js";
import { updateStoreUI } from "./store.js";

// Getting the main HTML elements
const stageImage = document.getElementById("stageImage");
const progressBar = document.getElementById("stageProgressBar");
const XPButton = document.getElementById("addXPButton");
const hardResetButton = document.getElementById("hardResetButton")

const DEFAULT_RANK = 3
    //Can be added to
const playerRanks = ["Copper", "Farmer", "Bio Hero", "Spawner", "Giga Farmer", "God"]


// Creates event listeners for main inputs
XPButton.addEventListener("click", function() { updateXP()  });
hardResetButton.addEventListener("click", hardReset)

// Defines empty object where the players information will be stored and manipulated
let currentPlayer = {};
let xpUpdate;

//Not loading in at first 
window.onload = function() {
    initPlayer()
    setup()
    let botOptions = defineStoreOptions()
    initStoreObjects(botOptions);
    updateStoreUI()
    xpUpdate = setInterval(autoUpdateXP, 1000)
};


function setup() {
    loadStage()
    loadProgress();
    updateStatsUI();
}

function autoUpdateXP() {
    loadPlayerProfile()
    if (checkTreeStage()) {
        currentPlayer.currentTree.currentXP += currentPlayer.currentAutoXPRate;
        currentPlayer.totalXP += currentPlayer.currentAutoXPRate;
        currentPlayer.currentBarXP += calcAutoBarPercentage()
        currentPlayer.currentSOIL += currentPlayer.currentAutoXPRate;;
        updateLocalStorage(currentPlayer);
        setup()
    }
}

function updateXP() {
    loadPlayerProfile()
    if (checkTreeStage()) {
        currentPlayer.currentTree.currentXP += currentPlayer.currentXPRate;
        currentPlayer.totalXP += currentPlayer.currentXPRate;
        currentPlayer.currentBarXP += calcManualBarPercentage()
        currentPlayer.currentSOIL += currentPlayer.currentXPRate;;
        updateLocalStorage(currentPlayer);
        setup()
    }
}

function checkTreeStage() {
    loadPlayerProfile()
    if (currentPlayer.currentTree.currentXP < currentPlayer.currentTree.threshXP) {
        return true;
    } else if (currentPlayer.currentTree.currentXP >= currentPlayer.currentTree.threshXP && currentPlayer.currentTree.currentStage != 6) {
        increaseStageSize();
        currentPlayer.currentTree.currentXP = 0;
        currentPlayer.currentBarXP = 0
        //testing difficulty increase
        currentPlayer.currentTree.threshXP *= calcDifficultyFactor();
        progressBar.style.width = currentPlayer.currentBarXP + "%";
        currentPlayer.currentTree.currentStage++;
        currentPlayer.currentTree.currentStageName = currentPlayer.currentTree.treeStages[currentPlayer.currentTree.currentStage];
        updateLocalStorage(currentPlayer);
        setup()
        return false;
    } else if (currentPlayer.currentTree.currentStage == currentPlayer.currentTree.treeStages.length - 1 || currentPlayer.cureenBarXP >= 100) {
        // mint function here + last minute metamask connect if needed
        let newTree = new Tree(5);
        currentPlayer.currentTree = newTree;
        currentPlayer.currentBarXP = 0;
        currentPlayer.treesGrown++;
        ascendRank(currentPlayer.treesGrown, currentPlayer.rankIndex)
        updateLocalStorage(currentPlayer);
        setup()
        return false
    }
}

function calcAutoBarPercentage() {
    let newStep = 0;
    let treeToLoad = currentPlayer.currentTree;
    newStep = (100 / treeToLoad.threshXP) * (currentPlayer.currentAutoXPRate)
    return newStep
}

function calcManualBarPercentage() {
    let newStep = 0;
    let treeToLoad = currentPlayer.currentTree;
    newStep = (100 / treeToLoad.threshXP) * (currentPlayer.currentXPRate)
    return newStep
}

function calcDifficultyFactor() {
    let diffFactor = 1000;
    //write algo to calc difficulty based on total XP??
    return diffFactor
}

function ascendRank(treesGrown, rankIndex) {
    //Updated in sync with addition of ranks
    let ranksTresh = [5, 10, 15, 25, 35, 45, 60, 75, 90, 110, 130, 150, 175, 200, 225]
    let floorIndex, capIndex = 0;
    if (rankIndex == 0) { floorIndex = 0, capIndex = 2 } else if (rankIndex == 1) { floorIndex = 3, capIndex = 5 } else if (rankIndex == 2) { floorIndex = 6, capIndex = 8 } else if (rankIndex == 3) { floorIndex = 9, capIndex = 11 } else if (rankIndex == 4) { floorIndex = 12, capIndex = 14 }

    if (treesGrown > ranksTresh[ranksTresh.length - 1]) {
        currentPlayer.playerRank = playerRanks[5]
        currentPlayer.rankLevel = "";
        return
    } else if (treesGrown >= ranksTresh[floorIndex] && currentPlayer.rankLevel == DEFAULT_RANK) {
        currentPlayer.rankLevel = DEFAULT_RANK - 1;
    } else if (treesGrown >= ranksTresh[floorIndex + 1] && currentPlayer.rankLevel == DEFAULT_RANK - 1) {
        currentPlayer.rankLevel = DEFAULT_RANK - 2;
    } else if (treesGrown >= ranksTresh[capIndex] && currentPlayer.rankLevel == DEFAULT_RANK - 2) {
        currentPlayer.rankIndex++;
        currentPlayer.playerRank = playerRanks[currentPlayer.rankIndex]
        currentPlayer.rankLevel = DEFAULT_RANK;
    }

}

function loadProgress() {
    progressBar.style.width = currentPlayer.currentBarXP + "%";
    //progressPercentage.innerHTML = currentPlayer.currentBarXP.toFixed(2) + "%";
}

// Loads the asset for the current trees stage
function loadStage() {
    loadPlayerProfile()
    let treeStages = ["./assets/seedlingPhase.png", "./assets/sproutPhase.png", "./assets/saplingPhase.png", "./assets/youngPhase.png", "./assets/halfLife.png", "./assets/adultPhase.png", "./assets/maturePhase.png"]
    stageImage.src = treeStages[currentPlayer.currentTree.currentStage];
    stageImage.style.width = currentPlayer.currentTree.currentSize + "%";
    updateLocalStorage(currentPlayer)
}

function increaseStageSize() {
    loadPlayerProfile()
    currentPlayer.currentTree.currentSize += 8
    updateLocalStorage(currentPlayer)
}
//How to hide secret?
function initPlayer() {
    if (window.localStorage.getItem("player") === null) {
        window.location.href = "./pages/connect.html"
    } else {
        let playerToLoad = CryptoJS.AES.decrypt(window.localStorage.getItem("player"), "secret").toString(CryptoJS.enc.Utf8)
        currentPlayer = JSON.parse(playerToLoad);
    }
}

//How to hide secret?
function updateLocalStorage(player) {
    let playerToUpload = CryptoJS.AES.encrypt(JSON.stringify(player), "secret")
    window.localStorage.setItem("player", playerToUpload);
}

function loadPlayerProfile() {
    if (window.localStorage.getItem("player") === null) {
        return
    } else {
        let playerToLoad = CryptoJS.AES.decrypt(window.localStorage.getItem("player"), "secret").toString(CryptoJS.enc.Utf8)
        currentPlayer = JSON.parse(playerToLoad);
    }

}

function hardReset() {
    clearInterval(xpUpdate)
    window.localStorage.clear()
    window.location.reload()
    currentPlayer = {}
}