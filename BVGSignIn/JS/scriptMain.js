var student_id, firstName, lastName, status, test;

$(document).ready(function() {
    getData(updateNames, updateButton);

    $('#logOut').click(function() {
        jQuery.ajax({
            type: "POST", // HTTP method POST or GET
            url: "logout.php", //Where to make Ajax calls
            dataType: "text", // Data type, HTML, json etc.
            data: null, //Form variables
            success: function(response) {
                window.location.href = "index.html";
            },
            error: function(xhr, ajaxOptions, thrownError) {
                alert(thrownError + "!");
            }
        });
    });
    $('#button').click(function() {
        var prompt = "";
        if (status == 1) {
            prompt = "Are you sure you want to sign out of the building?";
        } else {
            prompt = "Are you sure you want to sign into the building?";
        }

        if (confirm(prompt)) {
            jQuery.ajax({
                type: "POST", // HTTP method POST or GET
                url: "changeStatus.php", //Where to make Ajax calls
                dataType: "text", // Data type, HTML, json etc.
                data: null, //Form variables
                success: function(response) {
                    getData(updateButton, empty);
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

$('#settingsButton').click(function(){
    $(".menu").dropit();
});

});

function getData(callback, callback2) {
    jQuery.ajax({
        type: "POST", // HTTP method POST or GET
        url: "getData.php", //Where to make Ajax calls
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

function updateNames() {
    $('#firstName').html(firstName);
    $('#lastName').html(lastName);
}

function updateButton() {
    if (status == 1) {
        $('#currentStatus').html("You are currently <b>signed into</b> the building.");
        $('#button').html("<input type = 'button' value = 'Sign out' id = 'statusButton'>");
    } else {
        $('#currentStatus').html("You are currently <b>signed out</b> of the building.");
        $('#button').html("<input type = 'button' value = 'Sign in' id = 'statusButton'>");
    }

}

function empty() {}
