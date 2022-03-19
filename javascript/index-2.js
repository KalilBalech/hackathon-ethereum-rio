// npm install @thirdweb-dev/react @thirdweb-dev/sdk ethers;

function mintNFT(){

  let file = document.querySelector('input[type="file"]')
let nftName = document.getElementById("name").value;
let nftDescription = document.getElementById("description").value;
let walletAddress = document.getElementById("address").value;

const form = new FormData();

form.append('file', file.files[0]);

const options = {
  method: 'POST',
  body: form,
  headers: {
    "Authorization": "578d8550-cfaf-4ee1-b301-6d03fa62311d",
  },
};


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