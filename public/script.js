const intervalTime = setInterval(getEmails, 5000); //calls get emails function every 5 seconds

function copyClick() {
  let email = document.getElementById("generateHere");
  email.select();
  email.setSelectionRange(0, 99999); //mobile
  navigator.clipboard.writeText(email.value); //email copied to clipboard
}

function refresh() {}

function changeEmail() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  const length = 8; //numbe of characters before domain
  var email = "";
  for (let i = 0; i < length; i++) {
    email += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  email += "@gmail.com"; //domain at the end
  let emailOld = document.getElementById("generateHere");
  console.log(email);
  emailOld.value = email;
}

function goBack(){

}

async function getData(){ 
  const data = await fetch("http://localhost:5500/data"); //waiting for data and interacting with backend
  const parse = await data.json();
  console.log("I am ", parse.data);
  return parse.data;
}

async function getEmails(){
  const data = await getData();
  const body = document.querySelector('.email-main'); //this is what we are updating
  const block = createEmail(data); //we need data here ; fetch request to 
  body.prepend(block); //put the email at top instead of behind
}

function createEmail(data){ //data will be the paylad that api returns
  const card = document.createElement('div'); //create a card
  card.innerHTML = `
    <div class="email-info" onclick="clickEmail()">
      <span class="sender">${data.sender}</span>
      <span class="time">${data.time}</span>
    </div>
  `; //need to edit this once i know how api works
  return card; 
}

function clickEmail(){

}