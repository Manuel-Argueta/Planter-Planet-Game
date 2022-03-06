//Import tree class
import Tree from "./objects/Tree.js";
import updateStatsUI from "./data.js";
// Getting the main HTML elements
const stageImage = document.getElementById("stageImage");
const progressBar = document.getElementById("stage-progress");
const XPButton = document.getElementById("addXPButton");
const usernameField = document.getElementById("usernameField");
const beginButton = document.getElementById("beginGame");

const statsContainer = document.getElementById("main-stats-container")
const gameContainer = document.getElementById("main-game-container")
const shopContainer = document.getElementById("main-shop-container")

const DEFAULT_RANK = 3

// Creates event lsiteners for main inputs
XPButton.addEventListener("click", function() {updateXP(1) });
beginButton.addEventListener("click", createNewPlayer);

// Defines empty object where the players information will be stored and manipulated
let currentPlayer = {};

//Can be added to
const playerRanks = ["Dogwater Farmer", "Farmer", "Bio Hero", "Spawner","Giga Farmer", "God"]

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
        treeToLoad.currentXP+=currentPlayer.currentXPRate;
        currentPlayer.currentBarXP += calcBarPercentage()
        currentPlayer.currentSOIL++;
        updateLocalStorage(currentPlayer);
        setup()
    }
}

function checkTreeStage() {
    let treeToLoad = currentPlayer.currentTree;
    if (treeToLoad.currentXP < treeToLoad.threshXP) {
        return true;
    } else if (treeToLoad.currentXP >= treeToLoad.threshXP && treeToLoad.currentStage != 6) {
        treeToLoad.currentXP = 0;
        currentPlayer.currentBarXP = 0
        //testing difficulty increase
        treeToLoad.threshXP *=10;
        progressBar.style.width = currentPlayer.currentBarXP  + "%";
        treeToLoad.currentStage++;
        treeToLoad.currentStageName = treeToLoad.treeStages[treeToLoad.currentStage];
        updateLocalStorage(currentPlayer);
        setup()
        return false;
    } else if (treeToLoad.currentStage == 6) {
        let newTree = new Tree();
        treeToLoad = newTree;
        currentPlayer.treesGrown++;
        ascendRank(currentPlayer.treesGrown,currentPlayer.rankIndex)
        updateLocalStorage(currentPlayer);
        setup()
    }
}

function calcBarPercentage() {
    let newStep = 0;
    let treeToLoad = currentPlayer.currentTree;
    newStep = currentPlayer.currentXPRate/(treeToLoad.threshXP/100)
    console.log(newStep)
    return newStep
}

function ascendRank(treesGrown,rankIndex) {
    //Updated in sync with addition of ranks
    let ranksTresh = [5,10,15,25,35,45,60,75,90,110,130,150,175,200,225]
    let floorIndex, capIndex = 0;
    if (rankIndex == 0) {floorIndex = 0, capIndex = 2}
    else if (rankIndex == 1) {floorIndex = 3, capIndex = 5}
    else if (rankIndex == 2) {floorIndex = 6, capIndex = 8}
    else if (rankIndex == 3) {floorIndex = 9, capIndex = 11}
    else if (rankIndex == 4) {floorIndex = 12, capIndex = 14}
    if (treesGrown > ranksTresh[ranksTresh.length-1] ) {
        currentPlayer.playerRank = playerRanks[5]
        currentPlayer.rankLevel = "";
        return 
    } else if (treesGrown >= ranksTresh[floorIndex] && currentPlayer.rankLevel == DEFAULT_RANK) {
        currentPlayer.rankLevel = DEFAULT;
    } else if (treesGrown >= ranksTresh[floorIndex+1] && currentPlayer.rankLevel == DEFAULT_RANK-1) {
        currentPlayer.rankLevel = 1;
    } else if (treesGrown >= ranksTresh[capIndex] && currentPlayer.rankLevel ==  DEFAULT_RANK-2) {
        currentPlayer.rankIndex++;
        currentPlayer.playerRank = playerRanks[currentPlayer.rankIndex]
        currentPlayer.rankLevel = DEFAULT_RANK;
    } 

}

function loadProgress() {
    progressBar.style.width = currentPlayer.currentBarXP + "%";
}

// Loads the asset for the current trees stage
function loadStage() {
    let treeToLoad = currentPlayer.currentTree;
    let treeStages = ["./assets/seedlingPhase.png", "./assets/sproutPhase.png", "./assets/saplingPhase.png", "./assets/youngPhase.png","./assets/halfLife.png", "./assets/adultPhase.png","./assets/maturePhase.png"]
    //add image resizing 
    stageImage.src = treeStages[treeToLoad.currentStage];
}

function loadPlayer() {
    statsContainer.hidden = true;
    gameContainer.hidden = true;
    shopContainer.hidden = true;
    beginButton.hidden = true;
    if (window.localStorage.getItem("player") === null) {
        //Check if user exists in DB, if yes pull form DB, if not do this
        //alert("Please enter a username to begin");
        beginButton.hidden = false;
    } else {
        usernameField.hidden = true;
        statsContainer.hidden = false;
        gameContainer.hidden = false;
        shopContainer.hidden = false;
        let playerToLoad = CryptoJS.AES.decrypt(window.localStorage.getItem("player"),"secret").toString(CryptoJS.enc.Utf8)
        currentPlayer = JSON.parse(playerToLoad);
    }
}

function createNewPlayer() {
    let genesisTree = new Tree();
    let newPlayer = {
        username: usernameField.value,
        //IPFS link for NFT minted upon game connection
        avatar: "https://gateway.pinata.cloud/ipfs/QmcAFtNfnCmnrY2XAPpn3aHpoHnPKxF5ZXYZ4Fvyptxb1n",
        rankIndex: 0,
        playerRank: playerRanks[0],
        rankLevel: 3,
        treesGrown: 0,
        //Wallet address
        address: "0x0000000000000000000000000",
        currentSOIL: 0,
        currentTree: genesisTree,
        currentUpgrades: [],
        currentXPRate: 1,
        currentAutoXPRate: 0,
        currentBarXP: 0
    };
    updateLocalStorage(newPlayer);
    currentPlayer = newPlayer;
    setup()
    usernameField.hidden = true;
    beginButton.hidden = true;
}

//How to hide secret?
function updateLocalStorage(player) {
    let playerToUpload = CryptoJS.AES.encrypt(JSON.stringify(player),"secret")
    window.localStorage.setItem("player", playerToUpload);
}

//Create fucnction to backup data in MongoDB on tab close

// function backupUserProgress() {

// }
