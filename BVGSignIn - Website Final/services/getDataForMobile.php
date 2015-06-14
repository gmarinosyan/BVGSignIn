<?php

// THIS SCRIPT IS WRITTEN SOLELY FOR THE iOS APP. This script returns all of the information about a student user 
// given a username and password.

include "base.php"; 
$mysqli = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

$username = $mysqli->real_escape_string($_POST['username']);
$password = md5($mysqli->real_escape_string($_POST['password']));

    $checklogin = $mysqli->query("SELECT * FROM students WHERE username = '$username' AND password = '$password' ");
    // get student who matches the given username and password
    if($checklogin->num_rows == 1) // if such student exists, get all info about him
    {
        $row = $checklogin->fetch_array();
		echo intval($row['student_id']), " ", $row['firstName'], " ", $row['lastName'], " ", $row['status'];
        // return all info about student
    }
    else // if student does not exist, report error
    {
        echo "0";
    }

?>