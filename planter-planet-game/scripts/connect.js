window.onload = function() {
    getAccount()
};

const ethereumButton = document.getElementById('connectWalletButton');


ethereumButton.addEventListener('click', getAccount);

async function getAccount() {
  initConnection()
  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  let account = accounts[0];
  return account
}

function initConnection() {
    if (ethereum.selectedAddress == null) {
        console.log("not connected")
        return
    } else {
        window.location.href = './sign-up.html'
    }
}
