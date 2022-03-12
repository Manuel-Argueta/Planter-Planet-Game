import Tree from "./objects/Tree.js"

const beginButton = document.getElementById("beginGame")
const usernameField = document.getElementById("usernameField")

window.onload = function() {
    initPlayer()
};

beginButton.addEventListener("click", createNewPlayer);

function createNewPlayer() {
    let genesisTree = new Tree(14.25);
    let newPlayer = {
        username: usernameField.value,
        //IPFS link for NFT minted upon game connection
        avatar: "",
        rankIndex: 0,
        playerRank: "Dogwater Farmer",
        rankLevel: 3,
        treesGrown: 0,
        currentSOIL: 0,
        currentTree: genesisTree,
        currentUpgrades: {},
        currentXPRate: 1,
        currentAutoXPRate: 0,
        currentBarXP: 0,
        totalXP: 0
    };
    updateLocalStorage(newPlayer);
    window.location.href = "../index.html"
}

function initPlayer() {
    if (window.localStorage.getItem("player") === null) {
        return
    } else {
        console.log(window.location)
        window.location.href = "../index.html"
    }
}

//How to hide secret?
function updateLocalStorage(player) {
    let playerToUpload = CryptoJS.AES.encrypt(JSON.stringify(player), "secret")
    window.localStorage.setItem("player", playerToUpload);
}