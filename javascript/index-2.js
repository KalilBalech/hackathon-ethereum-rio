Moralis.initialize("3q4SgmTjl0VSId3TfehuSGaavhtaUVoMcquNaJ2k"); // Application id from moralis.io
Moralis.serverURL = "https://wrnhdac0kyx9.usemoralis.com:2053/server"; //Server url from moralis.io

const nft_contract_address = "0x0Fb6EF3505b9c52Ed39595433a21aF9B5FCc4431" //NFT Minting Contract Use This One "Batteries Included", code of this contract is in the github repository under contract_base for your reference.
/*
Available deployed contracts
Ethereum Rinkeby 0x0Fb6EF3505b9c52Ed39595433a21aF9B5FCc4431
Polygon Mumbai 0x351bbee7C6E9268A1BF741B098448477E08A0a53
BSC Testnet 0x88624DD1c725C6A95E223170fa99ddB22E1C6DDD
*/

const web3 = new Web3(window.ethereum);

//frontend logic

async function login(){
  
  Moralis.Web3.authenticate().then(function (user) {
     
      user.save();
      document.getElementById("view").href = "https://testnets.opensea.io/" +  ethereum.selectedAddress ;
  })
}

async function up(){
  
  const fileInput = document.getElementById("file");
  const data = fileInput.files[0];
  const imageFile = new Moralis.File(data.name, data);
  
  await imageFile.saveIPFS();
  const imageURI = imageFile.ipfs();
  const preview = document.getElementById("preview");
  preview.src = imageURI;
  alert(imageURI);
  const metadata = {
    "name":document.getElementById("name").value,
    "description":document.getElementById("description").value,
    "image":imageURI
  }
  const metadataFile = new Moralis.File("metadata.json", {base64 : btoa(JSON.stringify(metadata))});
  await metadataFile.saveIPFS();
  const metadataURI = metadataFile.ipfs();
  const txt = await mintToken(metadataURI).then(notify);
  
  //document.getElementById("view").href = "https://testnets.opensea.io/assets" + "/" + ethereum.selectedAddress ;
 
  
}

async function mintToken(_uri){
  //const link = document.getElementById("os-link");
  //link.textContent = "https://testnets.opensea.io/" + ethereum.selectedAddress
  const encodedFunction = web3.eth.abi.encodeFunctionCall({
    name: "mintToken",
    type: "function",
    inputs: [{
      type: 'string',
      name: 'tokenURI'
      }]
  }, [_uri]);

  const transactionParameters = {
    to: nft_contract_address,
    from: ethereum.selectedAddress,
    data: encodedFunction
  };
  const txt = await ethereum.request({
    method: 'eth_sendTransaction',
    params: [transactionParameters]
  });
  return txt
}

async function notify(_txt){
  document.getElementById("resultSpace").innerHTML =  
  `<input disabled = "true" id="result" type="text" class="form-control" placeholder="Description" aria-label="URL" aria-describedby="basic-addon1" value="Your NFT was minted in transaction ${_txt}">`;
} 


/*async function view ()  {
  const viewOS = document.getElementById("view");
  
  viewOS.href = "https://testnets.opensea.io/assets" + "/" + ethereum.selectedAddress ;
  alert(viewOS.href);
} */