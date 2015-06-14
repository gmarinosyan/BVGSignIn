<?php 

// The script which retrieves all of the information about the currently logged in student user.

include "base.php"; 
$mysqli = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

if(isset($_SESSION['studentLoggedIn'])){ // check whether student is logged in
	$student_id = $_SESSION['student_id']; // get student ID
	$checklogin = $mysqli->query("SELECT * FROM students WHERE student_id = '$student_id'"); // get student with given ID

    $row = $checklogin->fetch_array();
    $_SESSION['firstName'] = $row['firstName']; // get info about student
    $_SESSION['lastName'] = $row['lastName'];
    $_SESSION['status'] = $row['status'];

	echo $_SESSION['student_id'], " ", $_SESSION['firstName'], " ", $_SESSION['lastName'], " ", $_SESSION['status'];
	// return all info
}
else{ // if student not logged in, report error
	echo 404;
}

?>


