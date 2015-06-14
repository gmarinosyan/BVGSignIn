<?php

// The script which returns returns all of the past operations by a particular student.

include "base.php"; 
$mysqli = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

if(isset($_SESSION['adminLoggedIn'])){ // check whether admin is currently logged in
	$id = intval($_POST["id"]); // get student ID as int
	
    $checkTimes = $mysqli->query("SELECT * FROM operations WHERE student_id = '$id'"); // get all operations given a student ID
    $operations = mysqli_fetch_all($checkTimes);
	echo json_encode($operations); // return JSON array of operations
}
else{ // if admin is not logged in, report error
	echo 404;
}

?>