$(document).ready(function() {
    $('#request').on('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Serialize form data
        const formData = $(this).serialize();

        // Send AJAX request
        $.ajax({
            type: 'POST',
            url: '/api/sendEmail', // Your API endpoint
            data: formData,
            success: function(response) {
                console.log('Response from server:', response); // Log response for debugging

                if (response.message === 'Email sent successfully') {
                    console.log('Email sent successfully. Redirecting to sent.html');
                    // Redirect to send.html on success
                    window.location.href = '/sent.html';
                } else {
                    console.log('Failed to send email:', response.message);
                    // Display error message
                    $('#result').text('Failed to send email: ' + response.message);
                }
            },
            error: function(error) {
                console.error('An error occurred:', error);
                // Display error message
                $('#result').text('An error occurred: ' + error.responseText);
            }
        });
    });
});
