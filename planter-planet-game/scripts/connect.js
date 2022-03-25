// window.onload = function() {
//     getAccount()
//     initConnection()
// }

const ethereumButton = document.getElementById('connectWalletButton');


ethereumButton.addEventListener('click', getAccount);

async function getAccount() {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    let account = accounts[0];
    window.location.href = './sign-up.html'
    return account
}

function initConnection() {
    if (ethereum.selectedAddress == null) {
        return
    } else {
        window.location.href = './sign-up.html'
    }
}