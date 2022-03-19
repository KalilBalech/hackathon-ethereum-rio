// npm install @thirdweb-dev/react @thirdweb-dev/sdk ethers;

const fs = require('fs');
const fetch = require('node-fetch');
const FormData = require('form-data');

let file = document.getElementById("upload-file").files[0]
let nftName = document.getElementById("name").value;
let nftDescription = document.getElementById("description").value;
let walletAddress = document.getElementById("address").value;

const form = new FormData();

form.append('file', file);

const options = {
  method: 'POST',
  body: form,
  headers: {
    "Authorization": "578d8550-cfaf-4ee1-b301-6d03fa62311d",
  },
};

function mintNFT(){

  alert("foi")

  fetch("https://api.nftport.xyz/v0/mints/easy/files?" + new URLSearchParams({
  chain: 'rinkeby',
  name: nftName,
  description: nftDescription,
  mint_to_address: walletAddress,
}), options)
  .then(function(response) { return response.json() })
  .then(function(responseJson) {
    // Handle the response
    console.log(responseJson);
  })
}