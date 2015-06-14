// The script for the studentDetail.html page

var studentList;

$(document).ready(function() {
    checkLogin();
    updateTable();

    $('#logOut').click(function() { // destroy all session data and redirect to log in page
        jQuery.ajax({
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

    $('#backButton').click(function() { // redirect back to the main page
        window.location.href = "mainAdmin.html?" + Date.now();
    });

    setInterval(function() { // update table of operations every 20 seconds
        updateTable();
    }, 20000);

    $('#deleteStudent').click(function() {
        if (window.confirm("Are you sure you want to delete this student?")) {
            var url = window.location.href;
            url = url.split("?")[1];
            jQuery.ajax({ // queries database to delete the user whose details are currently displayed
                type: "POST",
                url: "services/deleteUser.php",
                dataType: "text",
                data: url, 
                success: function(response) {
                    if(response == 1){
                        alert("Student deleted.");
                        window.location.href = "mainAdmin.html?" + Date.now();
                    }
                    else{
                        alert(response);
                    }
                }
            });
        }
    });
});



function updateTable() { // get array of operations done by a particular student and populate a table with the data
    $('#studentOperations').empty();
    $('#studentOperations').append("<tr><th class='left head'>Type</th><th class='head'>Time</th></tr>"); // table headers
    var url = window.location.href;
    url = url.split("?")[1];
    jQuery.ajax({ // get operations JSON array
        type: "POST",
        url: "services/getStudentData.php", 
        dataType: "text",
        data: url,
        success: function(response) {
            operations = JSON.parse(response);
            if (operations.length === 0) {
                $('#studentOperations').html("Student has no records yet.");
            } else {
                operations.reverse();
                $.each(operations, function(index, operation) {
                    var time = operation[2];
                    var type = operation[3];

                    if (type == 1) { // append data in different style depending on the type of operation (in/out)
                        type = "In";
                        $('#studentOperations').append("<tr style = 'background-color:#AAD4F0'> <td class = 'left'>" + type + "</td><td class = 'right'>" + time + "</td><tr>");
                    } else {
                        type = "Out";
                        $('#studentOperations').append("<tr style = 'background-color:#CEE6F6'> <td class = 'left'>" + type + "</td><td class = 'right'>" + time + "</td><tr>");
                    }
                });
            }
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert(thrownError + "!");
        }
    });
}

function checkLogin() { // check that administrator is logged in
    jQuery.ajax({
        type: "POST", 
        url: "services/checkAdminLogin.php",
        dataType: "text",
        data: null, 
        success: function(response) {
            if (response == '0') {
                $('body').html("");
                window.location.href = "adminLogin.html";
            }
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert(thrownError + "!");
        }
    });
}
