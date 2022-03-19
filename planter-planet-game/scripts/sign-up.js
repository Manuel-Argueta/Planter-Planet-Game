import Tree from "./objects/Tree.js";

const beginButton = document.getElementById("beginGame");
const errorDisplay = document.getElementById("errorDisplay")
const possibleAvatarID = [
  "AvatarOne",
  "AvatarTwo",
  "AvatarThree",
  "AvatarFour",
  "AvatarFive",
];
let avatarSource;


beginButton.addEventListener("click", createNewPlayer);


window.onload = function () {
  initPlayer();
  initAvatars();
};

function initAvatars() {
  for (let i = 0; i < possibleAvatarID.length; i++) {
    document
      .getElementById(possibleAvatarID[i])
      .addEventListener("click", function () {
        chooseAvatar(possibleAvatarID[i]);
      });
  }
}

function chooseAvatar(avatarID) {
    for (let i = 0; i < possibleAvatarID.length; i++) {
        document
          .getElementById(possibleAvatarID[i])
          .style.border ="none"
      }
    avatarSource = avatarID
    document.getElementById(avatarID).style.border ="thick solid white";
    return
}

function getChosenAvatar() {
    if (avatarSource != undefined) {
        return "farmer" + avatarSource
    } else {
        errorDisplay.innerHTML = "Please select an avatar."
        return false
    }
}

function getUserName() {
    const usernameField = document.getElementById("usernameField");
    const userNameRegex =/^\S{0,15}$/
    if (usernameField.value == "") {
        errorDisplay.innerHTML = "Please enter a username."
        return false
    } else if (userNameRegex.test(usernameField.value) == true) {
        return usernameField.value
    } else {
        errorDisplay.innerHTML = "Please enter a username without spaces and less than 15 characters."
        return false
    }
}

function initConnection() {
  if (ethereum.selectedAddress != null) {
    return true;
  } else {
    return false;
  }
}

function createNewPlayer() {
  let currentAvatar = getChosenAvatar()
    // Double if Used to esnure right error message displays
  if (currentAvatar != false) {
      let currentUsername = getUserName()
      if (currentUsername != false) {
  let genesisTree = new Tree(5);
  let newPlayer = {
    username: currentUsername,
    avatar: currentAvatar,
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
    totalXP: 0,
  };
  updateLocalStorage(newPlayer);
  window.location.href = "../index.html";
}
    }
}

function initPlayer() {
  if (
    window.localStorage.getItem("player") === null &&
    initConnection() == true
  ) {
    return;
  } else if (initConnection() == false) {
    window.location.href = "./connect.html";
  } else {
    window.location.href = "../index.html";
  }
}

//How to hide secret?
function updateLocalStorage(player) {
  let playerToUpload = CryptoJS.AES.encrypt(JSON.stringify(player), "secret");
  window.localStorage.setItem("player", playerToUpload);
}
