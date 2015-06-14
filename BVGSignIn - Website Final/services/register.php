<?php 

// The script which adds a user to the database. This can be done with either a student or administrator user.

include "base.php"; 
$mysqli = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

if(isset($_SESSION['adminLoggedIn'])){ // check whether admin is currently logged in
if($_POST['type'] == 'student' && !empty($_POST['username']) && !empty($_POST['student_id']) && !empty($_POST['fName']) && !empty($_POST['lName'])){
    // check that a student user is being created and none of the parameters are empty

    $username = $mysqli->real_escape_string($_POST['username']); // gather all necessary parameters from POST array
    $password = md5($mysqli->real_escape_string($_POST['username']));
    $student_id = intval($mysqli->real_escape_string($_POST['student_id']));
    $fName = $mysqli->real_escape_string($_POST['fName']);
    $lName = $mysqli->real_escape_string($_POST['lName']);
    $status = 1;

    $checkusername = $mysqli->query("SELECT * FROM students WHERE username = '".$username."'"); // check whether username is already used
    $checkID = $mysqli->query("SELECT * FROM students WHERE student_id = '".$student_id."'"); // check whether ID is already being used
      
    if($checkusername->num_rows >= 1) // if username is taken, report error
    {
        echo 0;
    }
    elseif($checkID->num_rows >= 1) // if ID is taken, report error
    {
        echo -1;
    }
    else
    {
        $registerquery = $mysqli->query("INSERT INTO students (student_id, username, password, firstName, lastName, status) VALUES('".$student_id."', '".$username."', '".$password."', '".$fName."', '".$lName."',  '".$status."')");
        // create new user with given parameters

        if($registerquery)
        {
            $file = '../profilePics/default.jpg';
            $newfile = '../profilePics/' . strval($student_id) . '.jpg'; // assign default profile picture to new user

            if (!copy($file, $newfile)) {
                 echo 505;
            }
            echo 1;
        }
        else // if error occurs, return error code
        {
            echo 404;   
        }       
    }
}
else if($_POST['type'] == 'admin' && !empty($_POST['username']) && !empty($_POST['password'])){
    // check that an admin user is being created and none of the parameters are empty

    $username = $mysqli->real_escape_string($_POST['username']); // gather all necessary parameters from POST array
    $password = md5($mysqli->real_escape_string($_POST['password']));

    $checkusername = $mysqli->query("SELECT * FROM admins WHERE username = '".$username."'"); // check whether username is already used
      
    if($checkusername->num_rows >= 1) // if username is taken, report error
    {
        echo 0;
    }
    else
    {
        $registerquery = $mysqli->query("INSERT INTO admins (username, password) VALUES('".$username."', '".$password."')");
        // create new user with given parameters

        if($registerquery)
        {
            echo 1;
        }
        else // if error occurs, return error code
        {
            echo 404;   
        }       
    }
}
}
?>
