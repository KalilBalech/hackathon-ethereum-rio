Moralis.initialize("3q4SgmTjl0VSId3TfehuSGaavhtaUVoMcquNaJ2k"); // Application id from moralis.io
Moralis.serverURL = "https://wrnhdac0kyx9.usemoralis.com:2053/server"; //Server url from moralis.io

const nft_contract_address = "0x5405F4bfbDC03C6443EbeBFd9936Fb78d0c3615f" //NFT Minting Contract Use This One "Batteries Included", code of this contract is in the github repository under contract_base for your reference.


const web3 = new Web3(window.ethereum);

//frontend logic

async function login(){
  
  Moralis.Web3.authenticate().then(function (user) {
     
      user.save();
      document.getElementById("view").href = "https://testnets.opensea.io/" +  ethereum.selectedAddress ;
      adrs = ethereum.selectedAddress;
     document.getElementById("submit").textContent = "Wallet Connected" + " " + adrs[0]+adrs[1]+adrs[2]+adrs[3]+adrs[4] +
                                                                         "..."+ adrs[adrs.length-3]+ adrs[adrs.length-2]+ adrs[adrs.length-1];
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
  alert(imageURI + "     Seu arquivo está armazenado de forma totalmente decentralizada!" );
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