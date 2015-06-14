<?php include "base.php"; 
$mysqli = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

$username = $mysqli->real_escape_string($_POST['username']); // get parameters from POST array
$password = md5($mysqli->real_escape_string($_POST['password']));

    $checklogin = $mysqli->query("SELECT * FROM students WHERE username = '$username' AND password = '$password' ");
    // check whether user with given parameters exists

    if($checklogin->num_rows == 1) // if user exists
    {
        $row = $checklogin->fetch_array(); 
        $_SESSION['username'] = $username; // gather all data about user and store it in current session
        $_SESSION['student_id'] = intval($row['student_id']);
        $_SESSION['firstName'] = $row['firstName'];
        $_SESSION['lastName'] = $row['lastName'];
        $_SESSION['status'] = $row['status'];
        $_SESSION['studentLoggedIn'] = 1;
		echo "1";
    }
    else // if user doesn't exist, report error
    {
        echo "0";
    }
?>