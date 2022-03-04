//REFACTOR REFACTOR REFACTOR


const stageImage = document.getElementById("stageImage")
const progressBar = document.getElementById("stage-progress")
const XPButton = document.getElementById("addXPButton")
XPButton.addEventListener('click', updateXP)
const usernameField = document.getElementById('username')
const beginButton = document.getElementById("beginGame")
let currentPlayer = {}

window.onload = function() {
    setup()
  };

class Tree {
    constructor() {
        this.stages = ["seed","sprout","sapling","young","mature"]
        this.currentStageIndex = 0;
        this.currentStageName = this.stages[this.currentStageIndex];
        this.currentStageXP = 0;
        this.treeName = "palito"
    }

    updateStageXP(step) {
        this.currentStageXP += step;
        if (this.currentStageXP >= 100 && this.currentStageName != "mature") {4
            this.currentStageIndex ++;
            this.currentStageName = this.stages[this.currentStageIndex];
            this.currentStageXP = 0;
            return true
        }
        return false
    }

}


function setup() {
    loadPlayer();
    loadStage();
    showStats();
}

function showStats() {

}

function updateXP() {
    let currentTree = currentPlayer.currentTree;
    if ( currentTree.currentStageXP < 100 ) {
        console.log(currentTree.currentStageXP)
        //not recognized as function
        currentPlayer.currentTree.updateStageXP(1)
        progressBar.style.width = currentTree.currentStageXP + "%";
    }
}
function loadStage() {
    if (currentPlayer.currentTree.currentStageName == "seed") {
        stageImage.src = './assets/seedStage.png'
    } else if (currentPlayer.currentTree.currentStageName == "sprout") {
        stageImage.src = './assets/sproutStage.png'
    } else if (currentPlayer.currentTree.currentStageName == "sapling") {
        stageImage.src = './assets/saplingStage.png'
    } else if (currentPlayer.currentTree.currentStageName == "young") {
        stageImage.src = './assets/youngTreeStage.png'
    } else if (currentPlayer.currentTree.currentStageName == "mature") {
        stageImage.src = './assets/matureTreeStage.png'
    }


}



function loadPlayer() {
    beginButton.hidden = true;
    if (window.localStorage.getItem('player') === null) {
        //Check if user exists in DB, if yes pull form DB, if not do this 
        alert("Please enter a username to begin") 
        beginButton.hidden = false;
        beginButton.addEventListener('click',createNewPlayer)
    } else {
         usernameField.hidden = true;
         currentPlayer = JSON.parse(window.localStorage.getItem('player'))
    }
}


function createNewPlayer() {
    let genesisTree = new Tree()
        newPlayer = {
            username: usernameField.value,
            avatar: "https://gateway.pinata.cloud/ipfs/QmcAFtNfnCmnrY2XAPpn3aHpoHnPKxF5ZXYZ4Fvyptxb1n",
            playerRank: "Genesis Farmer",
            playerLevel: 0,
            //SHoudl be wallet address
            address: "0x0000000000000000000000000",
            currentSOIL: 0,
            //Implement ability to have muptliple trees at once (change to array)
            currentTree: genesisTree
        }
        updateLocalStorage(newPlayer)
        currentPlayer = newPlayer;
}


function updateLocalStorage(player) {
    window.localStorage.setItem('player',JSON.stringify(player))
}
