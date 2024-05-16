var sliderTeam = (function (document, $) {

  'use strict';

  var $sliderTeams = $('.slider--teams'),
    $list = $('#list'),
    $listItems = $('#list li'),
    $nItems = $listItems.length,
    $nView = 3,
    autoSlider,
    $current = 0,
    $isAuto = true,
    $acAuto = 2500,

    _init = function () {
      _initWidth();
      _eventInit();
    },

    _initWidth = function () {
      $list.css({
        'margin-left': ~~(100 / $nView) + '%',
        'width': ~~(100 * ($nItems / $nView)) + '%'
      });
      $listItems.css('width', 100 / $nItems + '%');
      $sliderTeams.velocity({ opacity: 1 }, { display: "block" }, { delay: 1000 });
    },

    _eventInit = function () {

      window.requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function (callback, element) {
            window.setTimeout(callback, 1000 / 60);
          };
      })();

      window.requestInterval = function (fn, delay) {
        if (!window.requestAnimationFrame &&
          !window.webkitRequestAnimationFrame &&
          !window.mozRequestAnimationFrame &&
          !window.oRequestAnimationFrame &&
          !window.msRequestAnimationFrame)
          return window.setInterval(fn, delay);
        var start = new Date().getTime(),
          handle = new Object();

        function loop() {
          var current = new Date().getTime(),
            delta = current - start;
          if (delta >= delay) {
            fn.call();
            start = new Date().getTime();
          }
          handle.value = requestAnimFrame(loop);
        };
        handle.value = requestAnimFrame(loop);
        return handle;
      }

      window.clearRequestInterval = function (handle) {
        window.cancelAnimationFrame ? window.cancelAnimationFrame(handle.value) :
          window.webkitCancelRequestAnimationFrame ? window.webkitCancelRequestAnimationFrame(handle.value) :
            window.mozCancelRequestAnimationFrame ? window.mozCancelRequestAnimationFrame(handle.value) :
              window.oCancelRequestAnimationFrame ? window.oCancelRequestAnimationFrame(handle.value) :
                window.msCancelRequestAnimationFrame ? msCancelRequestAnimationFrame(handle.value) :
                  clearInterval(handle);
      };

      $.each($listItems, function (i) {
        var $this = $(this);
        $this.on('touchstart click', function (e) {
          e.preventDefault();
          _stopMove(i);
          _moveIt($this, i);
        });
      });

      autoSlider = requestInterval(_autoMove, $acAuto);
    },

    _moveIt = function (obj, x) {

      var n = x;

      obj.find('figure').addClass('active');
      $listItems.not(obj).find('figure').removeClass('active');

      $list.velocity({
        translateX: ~~((-(100 / $nItems)) * n) + '%',
        translateZ: 0
      }, {
        duration: 1000,
        easing: [400, 26],
        queue: false
      });

    },

    _autoMove = function (currentSlide) {
      if ($isAuto) {
        $current = ~~(($current + 1) % $nItems);
      } else {
        $current = currentSlide;
      }
      console.log($current);
      _moveIt($listItems.eq($current), $current);
    },

    _stopMove = function (x) {
      clearRequestInterval(autoSlider);
      $isAuto = false;
      _autoMove(x);
    };

  return {
    init: _init
  };

})(document, jQuery);

$(window).load(function () {
  'use strict';
  sliderTeam.init();
});


// Get the button element
var button = document.getElementById("getStartedButton");

// Add a click event listener to the button
button.addEventListener("click", function () {
  // Redirect to the desired URL when the button is clicked
  window.location.href = "https://bot.dynaptmax.ai/";
});
function scrollToSection(sectionId) {
  var section = document.getElementById(sectionId);
  window.scrollTo({
    top: section.offsetTop,
    behavior: 'smooth'
  });
}

function changeTestimonialBackground(backgroundURL, obj) {
  let backgrounds = new Map([
    ['client-logo-1', ['url(./assets/omega.png) 50% / cover no-repeat', 'url(./assets/omega.png) 50% / cover no-repeat opacity: 0.5']],
    ['client-logo-2', ['url(./assets/pwc.png) 50% / cover no-repeat', 'url(./assets/pwc.png) 50% / cover no-repeat opacity: 0.5']],
    ['client-logo-3', ['url(./assets/tcns.png) 50% / cover no-repeat', 'url(./assets/tcns.png) 50% / cover no-repeat opacity: 0.5']],
    ['client-logo-4', ['url(./assets/stemzhealthcare_logo.jpg)50% / cover no-repeat', 'url(./assets/stemzhealthcare_logo.jpg)50% / cover no-repeat opacity: 0.5']]
  ]);

  var testimonial = document.getElementById('testimonial');
  testimonial.style.background = 'url(' + backgroundURL + ') 50% / cover no-repeat';

  backgrounds.forEach(function (value, key) {
    if (key === obj.className) {
      obj.style.background = value[1];
    } else {
      // If the key doesn't match, don't change the background color
      // instead, use the original background specified in the map
      document.querySelector('.' + key).style.background = value[0];
    }
  });
}

//slider

var index = 0;
var slides = document.querySelectorAll(".slides");
var dotsContainer = document.getElementById("dot");

// Create dots dynamically based on the number of slides
for (var i = 0; i < slides.length; i++) {
  var dot = document.createElement("span");
  dot.classList.add("dot");
  dotsContainer.appendChild(dot);
}

var dots = document.querySelectorAll(".dot");

function changeSlide() {
  if (index < 0) {
    index = slides.length - 1;
  }

  if (index > slides.length - 1) {
    index = 0;
  }

  for (var i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    dots[i].classList.remove("active");
  }

  slides[index].style.display = "block";
  dots[index].classList.add("active");

  index++;

  setTimeout(changeSlide, 3000);
}

changeSlide();

function toggle() {
  const smallNav = document.querySelector(".small-nav");
  if (smallNav.style.display === "none") {
    smallNav.style.display = "block";
  } else {
    smallNav.style.display = "none";
  }

}

function closeChatBot() {
  const chatbot = document.querySelector(".bot-chat")
  chatbot.style.display = "none";
}

function onChatBot() {
  const chatbot = document.querySelector(".bot-chat")
  chatbot.style.display = "block";
}

function scrollToForm() {
  // Scroll to the element with id "form"
  document.getElementById('form').scrollIntoView({ behavior: 'smooth' });
}

function isValidEmail(email) {
  // Regular expression to test the email format
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return regex.test(String(email).toLowerCase());
}

function isValidPhoneNumber(phoneNumber) {
  // Regular expression to test the phone number format
  const regex = /^\+?(\d{1,3})?[-.\s]?(\(?\d{3}\)?)[-.\s]?(\d{3})[-.\s]?(\d{4})$/;

  return regex.test(String(phoneNumber).trim());
}


function submitForm() {
  // Retrieve input values
  const email = document.getElementById('Inputmail').value;
  const name = document.getElementById('Inputname').value;
  const comment = document.getElementById('Inputmessage').value;
  const phone = document.getElementById('inputphone').value;

  // Check if any field is empty
  if (email.trim() === "" || name.trim() === "" || comment.trim() === "" || phone.trim()==="") {
    alert("Please fill all fields");
    return;
  }

  // Validate email format
  if (email.trim() !== "") {
    if (!isValidEmail(email)) {
      alert(email + " is not a valid email address.");
      return;
    }
  }

   // Validate phone format
   if (phone.trim() !== "") {
    if (!isValidPhoneNumber(phone)) {
      alert(phone + " is not a valid phone number.");
      return;
    }
  }

  // Prepare the data to be sent
  const data = {
    name: name,
    email: email,
    phone: phone, // Static value as example; adjust as needed
    subject: "Enquiry",
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
      if (data) {
        alert("Email to Sales has been sent successfully.");
        // Clear input fields
        document.getElementById('Inputmail').value = "";
        document.getElementById('Inputname').value = "";
        document.getElementById('Inputmessage').value = "";
        document.getElementById('inputphone').value="";
      } else {
        alert("Failed to send email. Please try again later.");
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      alert("An error occurred while sending the email. Please try again later.");
    });
}