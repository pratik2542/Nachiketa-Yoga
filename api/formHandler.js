$(document).ready(function() {
    $('#contactForm').on('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Serialize form data
        const formData = $(this).serialize();

        // Send AJAX request
        $.ajax({
            type: 'POST',
            url: '/api/sendEmail', // Your API endpoint
            data: formData,
            success: function(response) {
                if (response.message === 'Email sent successfully') {
                    // Redirect to send.html on success
                    window.location.href = 'sent.html';
                } else {
                    // Display error message
                    $('#result').text('Failed to send email: ' + response.message);
                }
            },
            error: function(error) {
                // Display error message
                $('#result').text('An error occurred: ' + error.responseText);
            }
        });
    });
});
