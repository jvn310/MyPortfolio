const form = document.getElementById('contact-form');

    // Add an event listener to the form's submit event
    form.addEventListener('submit', function(event) {
      // Prevent the default form submission behavior
      event.preventDefault();

      // Send the form data to the API (you can use XMLHttpRequest or the Fetch API)
      // For demonstration purposes, I'll just log the form data to the console
      console.log(new FormData(form));

      // Reset the form fields
      form.reset();
    });