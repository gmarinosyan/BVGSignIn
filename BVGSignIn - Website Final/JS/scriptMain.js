// The script for the main.html page

var student_id, firstName, lastName, status, test;

$(document).ready(function() { 
    getData(updateInfo, updateButton); 

    $('#logOut').click(function() { 
        jQuery.ajax({ // destroy current session and return to the log in page
            type: "POST", 
            url: "services/logout.php",
            dataType: "text",
            data: null,
            success: function(response) {
                window.location.href = "index.html";
            },
            error: function(xhr, ajaxOptions, thrownError) {
                alert(thrownError + "!");
            }
        });
    });
    $('#button').click(function() { // clicked on the Sign in/out button
        var prompt = ""; // make sure user clicked button purposefully
        if (status == 1) {
            prompt = "Are you sure you want to sign out of the building?";
        } else {
            prompt = "Are you sure you want to sign into the building?";
        }

        if (confirm(prompt)) {
            jQuery.ajax({ // query database to change status from "in" to "out" or vice versa.
                type: "POST",
                url: "services/changeStatus.php", 
                dataType: "text", 
                data: null,
                success: function(response) {
                    getData(updateButton, empty); // inform user of success
                    if (response == 1) {
                        alert("You have been signed into the building.");
                    } else {
                        alert("You have been signed out of the building.");
                    }
                },
                error: function(xhr, ajaxOptions, thrownError) {
                    alert(thrownError + "!");
                }
            });
        }


    });

});

function getData(callback, callback2) { // get info about currently logged in user
    jQuery.ajax({ 
        type: "POST", 
        url: "services/getData.php", 
        dataType: "text", 
        data: null,
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

function updateInfo() { // update the user info displayed on the page
    $('#firstName').html(firstName);
    $('#lastName').html(lastName);
    $('#userImage').css("background-image", "url(profilePics/" + student_id + ".jpg)");
}

function updateButton() { // update the text on the button based on whether the user is currently "in" or "out"
    if (status == 1) {
        $('#currentStatus').html("You are currently <b>signed into</b> the building.");
        $('#button').html("<input type = 'button' value = 'Sign out' id = 'statusButton'>");
    } else {
        $('#currentStatus').html("You are currently <b>signed out</b> of the building.");
        $('#button').html("<input type = 'button' value = 'Sign in' id = 'statusButton'>");
    }

}

function empty() {} // dummy function
