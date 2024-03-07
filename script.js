
function submitForm() {
  // Prevent default form submission if needed
  // e.preventDefault();

  // Retrieve input values
  const email = document.getElementById('Inputemail').value;
  const name = document.getElementById('Inputname').value;
  // Assuming you want to use the textarea value as the comment
  const comment = document.getElementById('Inputmessage').value;

  console.log("data===============,",email,name,comment)
  if(email.trim()==="" || name.trim()===""|| comment.trim()===""){
    alert("Please fill all fields");
    return
  }

  // Prepare the data to be sent
  const data = {
    name: name,
    email: email,
    phone: "", // Static value as example; adjust as needed
    subject: "Enquery",
    comment: comment
  };

  // Use fetch API to send the data
  fetch('https://dynaptsendmailapi.azurewebsites.net/api/sendMail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    if(data){
        alert("Sent Successfully");
        document.getElementById('Inputemail').value=""
        document.getElementById('Inputname').value ="";
        document.getElementById('Inputmessage').value="";
    }else{
        document.getElementById('Inputemail').value=""
        document.getElementById('Inputname').value ="";
        document.getElementById('Inputmessage').value="";
    }
   
    // Handle success, e.g., showing a success message to the user
  })
  .catch((error) => {
    console.error('Error:', error);
    // Handle error, e.g., showing an error message to the user
  });
}

