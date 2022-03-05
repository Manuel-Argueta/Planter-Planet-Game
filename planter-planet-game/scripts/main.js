//Import tree class
import Tree from "./objects/Tree.js";

// Getting the main HTML elements
const stageImage = document.getElementById("stageImage");
const progressBar = document.getElementById("stage-progress");
const XPButton = document.getElementById("addXPButton");
const XPDisplay = document.getElementById("XPDisplay")
const usernameField = document.getElementById("username");
const beginButton = document.getElementById("beginGame");

// Creates event lsiteners for main inputs
XPButton.addEventListener("click", updateXP);
beginButton.addEventListener("click", createNewPlayer);

// Defines empty object where the players information will be stored and manipulated
let currentPlayer = {};

// Sets up environment on page load
window.onload = setup;

function setup() {
    loadPlayer();
    loadStage();
    loadProgress();
}

function updateXP() {
    let treeToLoad = currentPlayer.currentTree;
    if (checkTreeStage()) {
        treeToLoad.currentXP+=1;
        updateLocalStorage(currentPlayer);
        loadProgress();
        loadStage();
    }
}

function checkTreeStage() {
    let treeToLoad = currentPlayer.currentTree;
    if (treeToLoad.currentXP < treeToLoad.threshXP) {
        return true;
    } else if (treeToLoad.currentXP >= 100 && treeToLoad.currentStageName != "mature") {
        console.log("here")
        treeToLoad.currentXP = 0;
        progressBar.style.width = treeToLoad.currentXP + "%";
        treeToLoad.currentStage++;
        treeToLoad.currentStageName =
        treeToLoad.treeStages[treeToLoad.currentStage];
        updateLocalStorage(currentPlayer);
        loadProgress();
        loadStage();
        return false;
    } else if (treeToLoad.currentStageName == "mature") {
        let newTree = new Tree();
        currentPlayer.currentTree = newTree;
        updateLocalStorage(currentPlayer);
        loadProgress();
        loadStage();
    }
}

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
    beginButton.hidden = true;
    if (window.localStorage.getItem("player") === null) {
        //Check if user exists in DB, if yes pull form DB, if not do this
        alert("Please enter a username to begin");
        beginButton.hidden = false;
    } else {
        usernameField.hidden = true;
        currentPlayer = JSON.parse(window.localStorage.getItem("player"));
    }
}

function createNewPlayer() {
    let genesisTree = new Tree();
    let newPlayer = {
        username: usernameField.value,
        avatar:
            "https://gateway.pinata.cloud/ipfs/QmcAFtNfnCmnrY2XAPpn3aHpoHnPKxF5ZXYZ4Fvyptxb1n",
        playerRank: "Genesis Farmer",
        playerLevel: 0,
        treesGrown: 0,
        //Should be wallet address
        address: "0x0000000000000000000000000",
        currentSOIL: 0,
        //Implement ability to have multiple trees at once (change to array)
        currentTree: genesisTree,
    };
    updateLocalStorage(newPlayer);
    currentPlayer = newPlayer;
    loadStage();
    usernameField.hidden = true;
    beginButton.hidden = true;
}

function updateLocalStorage(player) {
    window.localStorage.setItem("player", JSON.stringify(player));
}
