// The script for the index.html page

$(document).ready(function() {
    $('#error').hide();
    jQuery.ajax({ // query the database to make sure a student is not currently logged in
        type: "POST", 
        url: "services/getData.php",
        dataType: "text", 
        data: null, 
        success: function(response) {
            if (response != 404) { // if student is logged in, redirect to the main landing page
                window.location.href = "main.html?" + Date.now();
            }
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert(thrownError + "!");
        }
    });

    $("#login").click(function(e) {
        e.preventDefault();
        if ($("#username").val() === '' || $("#password").val() === '') { // if login fields are empty, prompt user to fill in
            alert("Please enter some text!");
            return false;
        }

        var myData = 'username=' + $("#username").val() + "&password=" + $("#password").val(); //build a post data structure from given parameters
        jQuery.ajax({ // query database to see whether user with given username and password exists
            type: "POST", 
            url: "services/response.php",
            dataType: "text", 
            data: myData,
            success: function(response) {
                if (response == "1") { // if user exists, go to main landing page
                    window.location.href = "main.html?" + Date.now();
                } else { // if user doesn't exist, prompt user to reenter credentials
                        $('#error').html('Invalid credentials!');
                        $('#error').fadeOut(200);
                        $('#error').fadeIn(1000);
                        $('#password').val("");
                }
            },
            error: function(xhr, ajaxOptions, thrownError) {
                alert(thrownError + "!");
            }
        });
    });

});
