var studentList;

$(document).ready(function() {
    updateTable();

    $('#logOut').click(function() {
        jQuery.ajax({
            type: "POST", // HTTP method POST or GET
            url: "services/logout.php", //Where to make Ajax calls
            dataType: "text", // Data type, HTML, json etc.
            data: null, //Form variables
            success: function(response) {
                window.location.href = "adminLogin.html";
            },
            error: function(xhr, ajaxOptions, thrownError) {
                alert(thrownError + "!");
            }
        });
    });

    setInterval(function() {
        updateTable();
    }, 20000);
});

function updateTable() {
    $('#students').empty();
    $('#students').append("<tr><th>Student ID</td><th>Student Name</td><th>Current Status</td></tr>");
    jQuery.ajax({
        type: "POST", // HTTP method POST or GET
        url: "services/getDataAdmin.php", //Where to make Ajax calls
        dataType: "text", // Data type, HTML, json etc.
        data: null, //Form variables
        success: function(response) {
            studentList = JSON.parse(response);
            $.each(studentList, function(studentNum) {
                var id = studentList[studentNum][0];
                var fName = studentList[studentNum][1];
                var lName = studentList[studentNum][2];
                var status = studentList[studentNum][3];
                if(status == "1"){
                    status = "In";
                }
                else{
                    status = "Out";
                }
                $('#students').append("<tr> <td>" + id + "</td><td>" + fName + " " + lName + "</td><td>" + status +  "</td>");
            });
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert(thrownError + "!");
        }
    });
}
