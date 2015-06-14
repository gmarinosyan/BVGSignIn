var student_id, firstName, lastName, status, test;

$(document).ready(function() {
    getData(updateProfilePic, empty);
    $('#cancel').click(function() {
        window.location.href = "main.html"; // if cancel is clicked, redirect to the main landing page
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
                if(re.test($("#newPass").val())){ // validate that password matches security criteria
                    jQuery.ajax({ // query database to change password for this user
                    type: "POST", 
                    url: "services/changePass.php", 
                    dataType: "text",
                    data: myData,
                    success: function(response) {
                        if (response == "1") { // notify user of successful password change
                            alert("Your password has been changed!");
                            window.location.href = "main.html?" + Date.now();
                        } else { // if existing password is wrong, prompt to reenter
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
                }
                else{ // if password doesn't match security criteria, prompt user to try again
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


function getData(callback, callback2) { // get the latest information about the current user
    jQuery.ajax({
        type: "POST", // HTTP method POST or GET
        url: "services/getData.php", //Where to make Ajax calls
        dataType: "text", // Data type, HTML, json etc.
        data: null, //Form variables
        success: function(response) {
            if (response == 404) {
                $('body').html("");
                window.location.href = "index.html";
            } else {
                var values = response.split(" ");
                student_id = parseInt(values[0]);
                firstName = values[1];
                lastName = values[2];
                status = parseInt(values[3]);
                callback();
                callback2();
            }
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert(thrownError + "!");
        }
    });
}

function empty() { // dummy function

}

function updateProfilePic(){ // update profile picture from filesystem
    $('#userImage').css("background-image", "url(profilePics/" + student_id + ".jpg)");
}
