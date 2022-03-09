import Tree from "./objects/Tree.js"

window.onload = function() {
    initPlayer()
};

const ethereumButton = document.getElementById('connectWalletButton');
const usernameField = document.getElementById("usernameField");
const beginButton = document.getElementById("beginGame");

ethereumButton.addEventListener('click', getAccount);
beginButton.addEventListener("click", createNewPlayer);

async function getAccount() {
  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  let account = accounts[0];
  return account
}

ethereum.on('accountsChanged', function (accounts) {
    window.location.reload = true; 
});


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
    ethereumButton.hidden = true;
    usernameField.hidden = true;
    beginButton.hidden = true;
    if (ethereum.selectedAddress == undefined) {
        ethereumButton.hidden = false;
    } else if (window.localStorage.getItem("player") === null) {
        ethereumButton.hidden = true;
        usernameField.hidden = false;
        beginButton.hidden = false;
        //Check if user exists in DB, if yes pull form DB, if not do this (return)
        return
    } else {
        console.log(window.location)
        window.location.href = "../index.html"
    }
}

//How to hide secret?
function updateLocalStorage(player) {
    let playerToUpload = CryptoJS.AES.encrypt(JSON.stringify(player),"secret")
    window.localStorage.setItem("player", playerToUpload);
}
