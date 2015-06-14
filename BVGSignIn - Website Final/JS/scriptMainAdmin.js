// The script for the mainAdmin.html page

var studentList;

$(document).ready(function() {
    checkLogin();
    updateTable();

    $('#logOut').click(function() {
        jQuery.ajax({ // destroy current session and return to the log in page
            type: "POST", 
            url: "services/logout.php",
            dataType: "text",
            data: null,
            success: function(response) {
                window.location.href = "adminLogin.html";
            },
            error: function(xhr, ajaxOptions, thrownError) {
                alert(thrownError + "!");
            }
        });
    });

    setInterval(function() { // update the student table every 20 seconds
        updateTable();
    }, 20000);
});

function updateTable() { // put new data into the table based on the information from the database
    $('#students').empty();
    $('#students').append("<tr><th>Student ID</th><th>Student Name</th><th>Current Status</th><th>Last Status Change</th></tr>");
    jQuery.ajax({ // get data for all students from the database
        type: "POST", 
        url: "services/getDataAdmin.php",
        dataType: "text", 
        data: null,
        success: function(response) {
            studentList = JSON.parse(response);
            populateTable();
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert(thrownError + "!");
        }
    });
}

function populateTable() {
    $.each(studentList, function(studentNum) { // use the data retrieved from the database to populate the student table
            var id = studentList[studentNum][0]; 
            var fName = studentList[studentNum][1];
            var lName = studentList[studentNum][2];
            var status = studentList[studentNum][3];
            var lastOperation = studentList[studentNum][4];
            var operationType = studentList[studentNum][5];
            if (status == "1") {
                status = "In";
            } else {
                status = "Out";
            }

            var d = new Date();
            if (lastOperation.substring(0, 10) == d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + d.getDate()) {
                lastOperation = lastOperation.substring(11, 19);
                if (operationType == 1) {
                    lastOperation = "In @ " + lastOperation;
                } else {
                    lastOperation = "Out @ " + lastOperation;
                }
            } else {
                lastOperation = "Did not leave today";
            }

            $('#students').append("<tr> <td>" + id + "</td><td><a href = \"" + "studentDetail.html?id=" + id + "\">" + fName + " " + lName + "</a></td><td>" + status + "</td><td>" + lastOperation + "</td>");

        });
    }

function checkLogin() { // check whether the administrator is currently logged in
    jQuery.ajax({
        type: "POST",
        url: "services/checkAdminLogin.php",
        dataType: "text",
        data: null,
        success: function(response) {
            if (response == '0') {
                $('body').html("");
                window.location.href = "adminLogin.html"; // if admin is not logged in, redirect to log in page
            }
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert(thrownError + "!");
        }
    });
}