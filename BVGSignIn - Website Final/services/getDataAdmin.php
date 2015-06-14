<?php

// The script which returns all of the students and details about their current statuses and last operations.


include "base.php"; 
$mysqli = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

if(isset($_SESSION['adminLoggedIn'])){ // check whether an admin is currently logged in
	$checklogin = $mysqli->query("SELECT student_id, firstName, lastName, status FROM students ORDER BY lastName");
	$students = mysqli_fetch_all($checklogin);
	// get array of info about all stuedents

	foreach ($students as &$value) { // for each student
    $checkTimes = $mysqli->query("SELECT * FROM operations WHERE student_id = '$value[0]'"); // get all operations by that student
    $operation = mysqli_fetch_all($checkTimes);
    if ($operation != null){ // get last operation and add it to the array
    	 $operation = $operation[count($operation)-1];
    	 array_push($value, $operation[2]);
    	 array_push($value, $operation[3]);
    }
	else{ // if there are no operations, push "Did not leave"
		array_push($value, "Did not leave");
	}
	
    }
	
	echo json_encode($students); // return JSON array
}
else{ // if admin not logged in, report error
	echo 404;
}

?>