/*
1. Variables
2. Functions
3. Loops
4. Conditional St.
5. Error Handling
6. Event Listeners
7. Pop Ups
8. DOM
*/

//Keywords are reserved words in prog. lang. that you as a developer cannot use for anything else expect for what they have already been assigned for.

//const, var, let will let you define variables.
//number, decimals, char, sentence, Boolean (true/false), 

// let result_Of_Student = "pass";
// let age = 19;

//Functions

/*2 parts of the function
1. Function definition
2. Function CALL

Arguments/Parameters - Extra information you pass to the functions.
*/

// function greet_user( name ) {
//   console.log("Hello, welcome to my first website!! " + name);
// }

// greet_user("Ifrah");


// function add ( a , b ) {
//   let result = a + b;
//   return result;
// }

// let answer = add(20, 34);
// console.log("The answer is " + answer);

// let marks = 93; //number
// let attendance = "clear";

// if (marks > 90 && attendance == "clear") {
//   console.log("Congratulations, you have passed!!");
// }
  
// else if (marks > 80) {
//   console.log("You have passed, but work harder!!");
// }
  
// else {
//   console.log("Hard Luck, you failed!");
// }

//1. User - defined 
//2. In-built function

//3 types of pops that you can raise.

// alert("Welcome to my web page");

// let response = confirm("Do you want to continue?");
// console.log(response);

// let response = prompt("what is your name habibi?");
// console.log(response);


//DONKEY WORK
// console.log("1");
// console.log("2");
// console.log("3");
// console.log("4");
// console.log("5");

// console.log("Donkey work ends!!");

//SMART - LOOPS

// for (let i=2; i<=20;i=i+2) {
//   console.log(i);
// }

// let control_of_togglebtn = document.getElementById("toggle-theme");

// let control_of_edu = document.getElementById("edu");

// control_of_togglebtn.addEventListener("click", function(){
//   console.log("Toggle button was clicked!!!");
//   control_of_edu.innerHTML= "MASTI";
// });





/*Tasks that need JavaScript Implementation 
1. Make Toggle Theme Button work
2. Make the contact me Section work 
  2a. Make the form collect all the information entered by the user.
  2b. Create a Database backend and connect this app via API.

3. Make Admin Login Button work
4. Make Admin Login Section work
  4a. Checking the Username and password, only show user responses if the credentials are correct. 
  4b. Make Admin login section disappear and User responses section should be visible.

5. Fetch all messages from the DB and show them in the user responses section.
*/

//Task - Making Toggle Btn work
let control_of_toggleBtn = document.getElementById("toggle-theme");
//we can now use this variable to create an event listener on top of it.

control_of_toggleBtn.addEventListener('click', function(){
  document.body.classList.toggle("dark-theme");
});


//Task - Making Admin Login Btn work.

// let control_of_admin_loginBtn = document.getElementById("admin-btn");
let control_of_admin_login_section = document.getElementById("admin-login");


// control_of_admin_loginBtn.addEventListener('click', function(){
//   control_of_admin_login_section.style.display = "block";
// });

function showAdminLogin(){
  control_of_admin_login_section.style.display = "block";
}

let db_url = "https://script.google.com/macros/s/AKfycbyrySG9jP75uAvZAEDYVqloC6OJxPGt5HgYjd3gOoacqQDD1ACzundC0NZ1A_r8sCHPiQ/exec"


let control_of_contactform = document.getElementById("contact-form");

control_of_contactform.addEventListener("submit", async function( event ){
  event.preventDefault(); // 404 not found error will not come.
  
  let name = document.getElementById("name_input").value;
  let email = document.getElementById("email_input").value;
  let msg = document.getElementById("msg_input").value;

  //Error handling code
  try {
    let response = await fetch (
      db_url,
      {
        method: "POST", //HTTP Method
        headers:{
          "Content-Type": "text/plain; charset=utf-8"
        },
        body: JSON.stringify({
          action:"save_message",
          name: name,
          email: email,
          msg: msg
        })
      }
    );

    let result = await response.json();

    if(result.success){
      alert("Message Submitted!");
    }
    else{
      alert("Message could not be sent!");
    }
  }

  catch (error) {
    console.error(error);
    alert("Something went wrong, please try again later!");
  }
  
});

//Task - Making the admin login section work.

let control_of_admin_form = document.getElementById("admin-form");

let control_of_user_responses = document.getElementById("user-responses");

control_of_admin_form.addEventListener("submit", async function(event){
  event.preventDefault();

  let username = document.getElementById("input_username").value;

  let password = document.getElementById("input_password").value;

  try {
    
    let response = await fetch (
      db_url,
      {
        method: "POST", //HTTP Method
        headers:{
          "Content-Type": "text/plain; charset=utf-8"
        },
        body: JSON.stringify({
          action:"login",
          username: username,
          password: password
        })
      }
    );

    let result = await response.json();

    if(result.success){
      
      alert("Access Granted!");
      //Hide admin login and bring up user responses section.
      
      control_of_admin_login_section.style.display= "none"; //hide

      control_of_user_responses.style.display = "block"; //show
      
      //call the fucnction that we will write to fetch messages from the sheets DB.
      get_messages();
    }
    else{
      alert("Access Denied!");
    }

  }

  catch (error){
    console.error(error);
    alert("Something went wrong, while trying to login!");
  }
});

//Task - Bring back the responses from the DB and show in User responses

async function get_messages(){
  
  try {
    let response = await fetch (
      db_url,
      {
        method: "GET", //HTTP Method
      }
    );

    let result = await response.json();

    if(!result.success){
      
      alert("Could not fetch messages!");
      
      return; //function stops working when it meets the first return statement.
    }

    let control_of_user_responses_div = document.getElementById("user-messages");

    result.messages.forEach(
      responses => {
        //per response in the DB, we create a div, and inside it, 4 p tags to show name, email, msg and date.
        let control_of_new_div = document.createElement('div');

        let name_paragraph = document.createElement('p');

        let email_paragraph = document.createElement('p');

        let message_paragraph = document.createElement('p');

        let date_paragraph = document.createElement('p');

        //since the creation of tags is done, we will now put content in them.

        name_paragraph.textContent = "Name: " + responses.name; 

        email_paragraph.textContent = "Email: " + responses.email; 
        
        message_paragraph.textContent = "Message: " + responses.msg; 

        date_paragraph.textContent = "Date: " + responses.date; 

        //we want a separator 

        let separator = document.createElement('hr');

        //Where should these new elements that we created be placed?

        //All paragraphs should go inside the new div.
        control_of_new_div.appendChild(name_paragraph);
        control_of_new_div.appendChild(email_paragraph);
        control_of_new_div.appendChild(message_paragraph);
        control_of_new_div.appendChild(date_paragraph);

        //The new div itself should go inside the pre existing html div.

        control_of_user_responses_div.appendChild(control_of_new_div);

      }
    );
    
    
  }

  catch(error){
    console.error(error);
    alert("Something went wrong, while fetching the user responses!");
  }
  
}