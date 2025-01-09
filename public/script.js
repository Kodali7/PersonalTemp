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

function getEmails(){
  
}