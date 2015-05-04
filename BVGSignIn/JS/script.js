$(document).ready(function() {
    $('#error').hide();
    jQuery.ajax({
        type: "POST", // HTTP method POST or GET
        url: "getData.php", //Where to make Ajax calls
        dataType: "text", // Data type, HTML, json etc.
        data: null, //Form variables
        success: function(response) {
            if (response != 404) {
                window.location.href = "main.html";
            }
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert(thrownError + "!");
        }
    });

    $("#login").click(function(e) {
        e.preventDefault();
        if ($("#username").val() === '' || $("#password").val() === '') {
            alert("Please enter some text!");
            return false;
        }

        var myData = 'username=' + $("#username").val() + "&password=" + $("#password").val(); //build a post data structure
        jQuery.ajax({
            type: "POST", // HTTP method POST or GET
            url: "response.php", //Where to make Ajax calls
            dataType: "text", // Data type, HTML, json etc.
            data: myData, //Form variables
            success: function(response) {
                if (response == "1") {
                    window.location.href = "main.html";
                } else {
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
