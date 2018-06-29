// Get the Position where to add the Button
let metaContents = document.getElementById("meta-contents");
let topRow = metaContents.childNodes[0].childNodes[0].childNodes[1];

// Create the Button and Add it to the position
let btn = document.createElement("BUTTON");
btn.innerHTML = "IOTA Tip";
topRow.appendChild(btn);

// Create Inputfield for the Amount
let inputField = document.createElement("INPUT");
inputField.type = "number";
inputField.width = 10;
topRow.appendChild(inputField);

// Create the Event when the button is clicked
btn.addEventListener("click", function(){
  //alert("Wilfried Gruber has tipped you " + inputField.value.toString() + " IOTAs");
  tipIOTA();
  inputField.value = 0;
});

// Get the description of the video
let description = document.getElementById("description").innerHTML;
//console.log(description);

function tipIOTA(){
  // Get the connection to IOTA Fullnode
  let iota = new IOTA({
      'provider': 'https://node.iotanode.host:443'
  });
  console.log(iota);
  // Make the PoW with curl.lib.js in browser
  var curl = window.curl;
  try {
    curl.init();
    curl.overrideAttachToTangle(iota);
    console.log("overrideAttachToTangle was successfull");
  } catch (err){
    console.error("Error", err);
  }
  // Get the NodeInfo
  iota.api.getNodeInfo(function(error, success) {
    if (error) {
        console.error(error);
    } else {
        console.log(success);
    }
  });
  // Define the seed to work with
  let seed = "VMGBBXOOX9PACPGJXUAWOQJSRA9XIAEHFHZPIZ9ZLB9OHTLLEL9CPTQSZJHZBDIVJEXXYZC9GRUMWLBDG";
  // Get a new Address (not necessary in this case)
  iota.api.getNewAddress(seed, function(err, res){
    if(!err){
      console.log(res);
    } else {
      console.log(err);
    }
  });
  // Define the address where to send the transaction
  let sendAddress = "EPOZCRHFAVLUVJQMGGSW9A9IANBEADEXZZBMTEPSMKVNCMUTRIEIHBQ9YVBWSBSHUAWGPKRGMLHQSJIID";
  // Compose the Message
  let messageTag = "TIPWILFRIEDGRUBER";
  let messageToSend = "Wilfried Gruber has tipped you " + inputField.value.toString() + " IOTAs";
  let messageTrytes = iota.utils.toTrytes(messageToSend);
  // Compose the Transfer
  let transfer = [{ "address" : sendAddress,
                    "value": 0,
                    "message" : messageTrytes,
                    "tag": messageTag}];
  // Send the transfer
  iota.api.sendTransfer(seed, 4, 14, transfer, function(err, res) {if(!err){console.log(res);}else {console.log(err);}});
}
