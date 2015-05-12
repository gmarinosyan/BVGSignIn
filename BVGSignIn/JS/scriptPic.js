var student_id, firstName, lastName, status, test;

$(document).ready(function() {
    getData(updateProfilePic, empty);
    $('#cancel').click(function() {
        window.location.href = "main.html";
    });

    $('#uploadPhoto').submit(function(event){
        event.preventDefault();
        jQuery.ajax({
            type: "POST", // HTTP method POST or GET
            url: "changePic.php", //Where to make Ajax calls
            contentType: false,
            cache: false,
            processData: false,
            data: new FormData(this),
            success: function(response) {
                if(response == 1){
                    alert("Successfully uploaded photo.");
                    getData(updateProfilePic, empty);
                    window.location.href = "main.html?" + Date.now();
                }
                else if(response === 0){
                    alert("Error uploading photo.");
                }
                else if(response == 2){
                    alert("Please pick an appropriate file!");
                }
                else if(response == 3){
                    alert("Your file must be either a JPG or a PNG. Max file size is 1MB.");
                }
                else{
                    alert(response);
                }
            },
            error: function(xhr, ajaxOptions, thrownError) {
                alert(thrownError + "!");
            }
        });
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

function empty(){

}


function updateProfilePic(){
    $('#userImage').css("background-image", "url(profilePics/" + student_id + ".jpg)");
}
