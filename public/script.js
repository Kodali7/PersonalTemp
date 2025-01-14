//const intervalTime = setInterval(refresh, 5000); //calls get emails function every 5 seconds

function copyClick() {
  let email = document.getElementById("generateHere");
  email.select();
  email.setSelectionRange(0, 99999); //mobile
  navigator.clipboard.writeText(email.value); //email copied to clipboard
}

function refresh() {
  goBack(); //manual way
}

function changeEmail() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  const length = 8; //numbe of characters before domain
  var email = "";
  for (let i = 0; i < length; i++) {
    email += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  email += "@mailslurp.biz"; //domain at the end
  let emailOld = document.getElementById("generateHere");
  console.log(`Fronted: ${email}`);
  emailOld.value = email;
  fetch("/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email }),
  })
    .then((response) => {
      console.log(`Response: ${response}`);
      return response;
    })
    .then((data) => console.log("Email sent:", data))
    .catch((error) => console.error("Error:", error));
}

function goBack(){
  const checker = document.querySelector('.email-main');
  checker.innerHTML = "";
  getEmails();
}

async function backEmails(){
  try{
    const emails = await fetch("http://localhost:5500/emails");
    const email_parse = await emails.json();
    console.log(email_parse);
    return email_parse.data;
  }catch (error){
    console.log("Error: ", error.message);
  }
}

async function getEmails(){
  const data = await backEmails();
  const body = document.querySelector('.email-main'); //this is what we are updating
  let block;
  for (const x of data){
    block = createsEmail(x); //we need data here ; fetch request to
    body.prepend(block); //put the email at top instead of behind
  }
}
function createsEmail(data) {
  // data will be the payload that API returns
  const card = document.createElement("div"); // create a card
  card.classList.add("email-card"); // Add a class for styling

  // Define the card content
  card.innerHTML = `
    <div class="email-info" onclick="clickEmail()">
      <div class="email-header">
        <span class="sender">${
          data.sender.name || data.sender.emailAddress
        }</span>
        <span class="time">${formatTime(data.createdAt)}</span>
      </div>
      <div class="email-subject">
        <span class="subject">${data.subject}</span>
      </div>
    </div>
  `;

  // Styling for the card
  card.style.border = "1px solid #ddd"; // Lighter border color for subtlety
  card.style.borderRadius = "8px"; // Rounded corners for a modern look
  card.style.margin = "10px 0";
  card.style.padding = "15px";
  card.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.1)";
  card.style.backgroundColor = "#ffffff"; // White background for the card

  // Styling for sender's info and subject
  const senderElement = card.querySelector(".sender");
  const subjectElement = card.querySelector(".subject");
  const timeElement = card.querySelector(".time");

  senderElement.style.fontWeight = "bold";
  senderElement.style.fontSize = "16px";
  senderElement.style.color = "#333";

  subjectElement.style.fontSize = "14px";
  subjectElement.style.color = "#555";

  timeElement.style.fontSize = "12px";
  timeElement.style.color = "#888";

  // Apply padding for sender element to give space
  senderElement.style.paddingRight = "10px";
  senderElement.style.paddingLeft = "5px";

  // Add padding and alignment adjustments for cleaner look
  const emailHeader = card.querySelector(".email-header");
  emailHeader.style.display = "flex";
  emailHeader.style.justifyContent = "space-between";
  emailHeader.style.alignItems = "center";

  // Adjust the subject styling to make it stand out
  const emailSubject = card.querySelector(".email-subject");
  emailSubject.style.marginTop = "5px";
  
  card.addEventListener("mouseover", function () {
    card.style.cursor = "pointer"; 
  });
  card.addEventListener("click", function() {
    clickEmail(data);
  })
  return card;
}

function formatTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();

  const isToday = date.toDateString() === now.toDateString();

  if (isToday) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; 
    const formattedMinutes = minutes.toString().padStart(2, "0");

    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  } else {
    const options = { month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }
}

async function clickEmail(data){
  try{
    const other_data = await mailslurp.getEmail(data.emailId);
    const body = document.querySelector('.email-main'); //main body
    body.innerHTML = `
      <div class="topSubject">
        <h3 id="topSubject">${data.subject}</span>
      </div>
      <div class="body">
        <p id="body">${other_data.body}</p> 
      </div>
      <div class="attachments">

      </div>
    `; //need to fix the body thing by using email instead of email preview so one post and one get 
  }catch(error){
    console.log("Error Email: ", error.message);
  }
}