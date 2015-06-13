var student_id, firstName, lastName, status, test;

$(document).ready(function() {
    getData(updateProfilePic, empty);
    $('#cancel').click(function() {
        window.location.href = "main.html";
    });

    $(document).keypress(function(event) {
        if (event.which == 13) {
            $('#submit').trigger('click');
        }
    });

    $('#submit').click(function() {
        if ($('#existingPass').val() != $('#newPass').val()) {
            if ($('#newPass').val() == $('#newPass2').val()) {
                var myData = 'existingPass=' + $("#existingPass").val() + "&newPass=" + $("#newPass").val();
                jQuery.ajax({
                    type: "POST", // HTTP method POST or GET
                    url: "services/changePass.php", //Where to make Ajax calls
                    dataType: "text", // Data type, HTML, json etc.
                    data: myData, //Form variables
                    success: function(response) {
                        if (response == "1") {
                            alert("Your password has been changed!");
                            window.location.href = "main.html?" + Date.now();
                        } else {
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
            } else {
                alert("New password does not match.");
            }
        } else {
            alert("New password cannot be the same as old password!");
        }
    });


});


function getData(callback, callback2) {
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

function empty() {

}

function updateProfilePic(){
    $('#userImage').css("background-image", "url(profilePics/" + student_id + ".jpg)");
}
