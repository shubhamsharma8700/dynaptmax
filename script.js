$('.owl-carousel').owlCarousel({
  loop:true,
  margin:10,
  nav:false,
  autoplay:true,
  dots:false,
  responsive:{
      0:{
          items:3
      },
      600:{
          items:5
      },
      1000:{
          items:5
      }
  }
})

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

  if(email.trim() !=""){
    if(isValidEmail(email)) {
      console.log(email + " is a valid email address.");
    } else {
      alert(email + " is not a valid email address.");
      return
    }
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
        alert("Email to Sales has been sent successfully.");
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

function isValidEmail(email) {
  // Regular expression to test the email format
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return regex.test(String(email).toLowerCase());
}

