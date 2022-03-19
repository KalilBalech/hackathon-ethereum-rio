const fs = require('fs');
const fetch = require('node-fetch');
const FormData = require('form-data');

const form = new FormData();
const fileStream = fs.createReadStream('/path/to/file_to_upload.png');
form.append('file', fileStream);

const options = {
  method: 'POST',
  body: form,
  headers: {
    "Authorization": "API-Key-Here",
  },
};

fetch("https://api.nftport.xyz/v0/mints/easy/files?" + new URLSearchParams({
  chain: 'polygon',
  name: "NFT_Name",
  description: "NFT_Description",
  mint_to_address: "Wallet_Address",
}), options)
  .then(function(response) { return response.json() })
  .then(function(responseJson) {
    // Handle the response
    console.log(responseJson);
  })