<?php 
// The script which checks whether an admin can be logged in based on the given username and password.
include "base.php"; 
$mysqli = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

$username = $mysqli->real_escape_string($_POST['username']); // get parameters from POST array
$password = md5($mysqli->real_escape_string($_POST['password']));

    $checklogin = $mysqli->query("SELECT * FROM admins WHERE username = '$username' AND password = '$password' ");
    // check whether admin with given parameters exists

    if($checklogin->num_rows == 1) // if admin exists
    {
        $row = $checklogin->fetch_array();
        $_SESSION['username'] = $username; // store all admin info in session
        $_SESSION['admin_id'] = intval($row['admin_id']);
        $_SESSION['adminLoggedIn'] = 1;
		echo "1";
    }
    else // if admin doesn't exist, report error
    {
        echo "0";
    }

?>