// The script for the addUser.html page

$(document).ready(function() {
    checkLogin();
    $('#fName').hide(); // hide all input boxes except for account type selector
    $('#lName').hide();
    $('#student_id').hide();
    $('#username').hide();
    $('#newPass').hide();
    $('#newPass2').hide();
    $('#noteStudent').hide();
    $('#noteAdmin').hide();
    $('#submit').hide();

    $('#accountType').change(function() {
        if ($('#accountType').val() == "student") { // show only input boxes relevant to a student account
            $('#fName').show();
            $('#lName').show();
            $('#student_id').show();
            $('#username').show();
            $('#newPass').hide();
            $('#newPass2').hide();
            $('#noteStudent').show();
            $('#noteAdmin').hide();
            $('#submit').show();
        } else if ($('#accountType').val() == "admin") { // show only input boxes relevant to an admin account
            $('#fName').hide();
            $('#lName').hide();
            $('#student_id').hide();
            $('#username').show();
            $('#newPass').show();
            $('#newPass2').show();
            $('#noteStudent').hide();
            $('#noteAdmin').show();
            $('#submit').show();
        }

        $(document).keypress(function(event) { // trigger "Submit" on press of enter key
            if (event.which == 13) {
                $('#submit').trigger('click');
            }
        });

    });

    $('#cancel').click(function() {
        window.location.href = "mainAdmin.html?" + Date.now(); // go back to main page
    });

    $('#submit').click(function() {
        if ($('#accountType').val() == "student") { // this is the procedure for a student account

            var re = /^[0-9]*$/;

            if (!re.test($('#student_id').val())) { // validate the entered parameters
                alert("Student ID can only contain digits.");
            } else if (parseInt($('#student_id').val()) > 2147483647) {
                alert("Student ID is too large.");
            } else if ($('#username').val().length > 15) {
                alert("Username is too long. Max length is 15 characters.");
            } else if ($('#fName').val().length > 15) {
                alert("First name is too long. Max length is 15 characters.");
            } else if ($('#lName').val().length > 20) {
                alert("Last name is too long. Max length is 20 characters.");
            } else if ($('#lName').val() === "" || $('#fName').val() === "" || $('#username').val() === "" || $('#student_id').val() === "") {
                alert("Please fill in all fields.");
            } else {
                var myData = 'type=student&student_id=' + $('#student_id').val() + '&username=' + $("#username").val() + "&fName=" + $("#fName").val() + "&lName=" + $("#lName").val(); 
                jQuery.ajax({ // query the database to use the entered parameters to create a new account
                    type: "POST",
                    url: "services/register.php",
                    dataType: "text",
                    data: myData, 
                    success: function(response) { // prompt user based on response from database script
                        if (response == "1") {
                            alert("The student has been added.");
                            window.location.href = "mainAdmin.html?" + Date.now();
                        } else if(response === '0') {
                            $('#username').val('');
                            alert("A student with this username already exists.");
                        } else if (response == "-1"){
                            $('#student_id').val('');
                            alert("A student with this student ID already exists.");
                        }else{
                            alert("Error. Can't connect to the BVG Student System.");
                        }
                    },
                    error: function(xhr, ajaxOptions, thrownError) {
                        alert(thrownError + "!");
                    }
                });
            }
        } else if ($('#accountType').val() == "admin") { // procedure for admin account

            var re2 = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/;

            if ($('#username').val().length > 15) { // validate the entered parameters
                alert("Username is too long. Max length is 15 characters.");
            } else if ($('#newPass').val() != $('#newPass2').val()) {
                alert("Entered passwords do not match.");
            } else if (!re2.test($("#newPass").val())) {
                alert("Your password must contain at least 6 characters! At least 1 upper case character, 1 lower case character, and 1 number are required.");
            }
            else{
                var myData2 = 'type=admin&username=' + $("#username").val() + "&password=" + $("#newPass").val(); 
                jQuery.ajax({ // query the database to use the entered parameters to create a new account
                    type: "POST", 
                    url: "services/register.php",
                    dataType: "text",
                    data: myData2,
                    success: function(response) {  // prompt user based on response from database script
                        if (response == "1") {
                            alert("The administrator has been added.");
                            window.location.href = "mainAdmin.html?" + Date.now();
                        } else {
                            $('#username').val('');
                            alert("An administrator with this username already exists.");
                        }
                    },
                    error: function(xhr, ajaxOptions, thrownError) {
                        alert(thrownError + "!");
                    }
                });
            }
        }
    });


});

function checkLogin() { // check current session to make sure an admin is logged in
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