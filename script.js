function copyClick(){
    let email = document.getElementById("generateHere");
    email.select();
    email.setSelectionRange(0, 99999); //mobile
    navigator.clipboard.writeText(email.value); //email copied to clipboard
}

function refresh(){
    
}

function changeEmail(){

}