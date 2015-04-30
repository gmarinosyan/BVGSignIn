var student_id, firstName, lastName, status;

$(document).ready(function() {
    getData(main);

    
});

function getData(callback) {
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
                status = values[3];
                callback();
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

function main() {
    updateNames();
    $('#logOut').click(function(){
        jQuery.ajax({
        type: "POST", // HTTP method POST or GET
        url: "logout.php", //Where to make Ajax calls
        dataType: "text", // Data type, HTML, json etc.
        data: null, //Form variables
        success: function(response) {
            window.location.href = "main.html";
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert(thrownError + "!");
        }
    });
    });
}
