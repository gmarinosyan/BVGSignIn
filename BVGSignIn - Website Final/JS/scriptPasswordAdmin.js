var admin_id;

$(document).ready(function() {
    checkLogin();
    $('#cancel').click(function() {
        window.location.href = "mainAdmin.html";  // if cancel is clicked, redirect to the main landing page
    });

    $(document).keypress(function(event) { // trigger "Submit" on enter key press
        if (event.which == 13) {
            $('#submit').trigger('click');
        }
    });

    $('#submit').click(function() {
        if ($('#existingPass').val() != $('#newPass').val()) { // make sure the new password isn't the same as the old
            if ($('#newPass').val() == $('#newPass2').val()) { // make sure that the new passwords match
                var myData = 'existingPass=' + $("#existingPass").val() + "&newPass=" + $("#newPass").val();
                var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/;
                if (re.test($("#newPass").val())) { // validate that password matches security criteria
                    jQuery.ajax({ // query database to change password for this user
                        type: "POST", 
                        url: "services/changePassAdmin.php",
                        dataType: "text", 
                        data: myData, 
                        success: function(response) {  // notify user of successful password change
                            if (response == "1") {
                                alert("Your password has been changed!");
                                window.location.href = "mainAdmin.html?" + Date.now();
                            } else {  // if existing password is wrong, prompt to reenter
                                $('#existingPass').val('');
                                $('#newPass').val('');
                                $('#newPass2').val('');
                                alert("Existing password is wrong.");
                            }
                        },
                        error: function(xhr, ajaxOptions, thrownError) {
                            alert(thrownError + "!");
                        }
                    });
                } else {  // if password doesn't match security criteria, prompt user to try again
                     alert("Your password must contain at least 6 characters! At least 1 upper case character, 1 lower case character, and 1 number are required.");
                }
            } else {
                alert("New password does not match.");
            }
        } else {
            alert("New password cannot be the same as old password!");
        }
    });


});


function checkLogin() { // make sure that admin is currently logged in
    jQuery.ajax({
        type: "POST", // HTTP method POST or GET
        url: "services/checkAdminLogin.php", //Where to make Ajax calls
        dataType: "text", // Data type, HTML, json etc.
        data: null, //Form variables
        success: function(response) {
            if (response === 0) {
                $('body').html("");
                window.location.href = "adminLogin.html";
            }
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert(thrownError + "!");
        }
    });
}
