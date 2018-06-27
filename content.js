// Get the Position where to add the Button
let metaContents = document.getElementById("meta-contents");
let topRow = metaContents.childNodes[0].childNodes[0].childNodes[1];

// Create the Button and Add it to the position
let btn = document.createElement("BUTTON");
btn.innerHTML = "IOTA Tip";
topRow.appendChild(btn);

// Get the description of the video
let description = document.getElementById("description").innerHTML;
//console.log(description);
