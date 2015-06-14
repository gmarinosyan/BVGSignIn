<?php 

// The script which allows the student to change his status from "Out" to "In" or vice versa. 

include "base.php"; 
$mysqli = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

if(isset($_SESSION['studentLoggedIn'])){ // check whether student is currently logged in
	$student_id = $_SESSION['student_id']; // get current student ID

	if($_SESSION['status'] == "1"){ // if the status of the current student is "In", change it to out and add a new "Out" operation to the "operations" database table
		$change = $mysqli->query("UPDATE students SET status='0' WHERE student_id='$student_id'");
		$registerquery = $mysqli->query("INSERT INTO operations (student_id, time, type) VALUES('$student_id', NOW(), '0')");
		echo 0;
	}
	else{ // if the status of the current student is "Out", change it to out and add a new "In" operation to the "operations" database table
		$change = $mysqli->query("UPDATE students SET status='1' WHERE student_id='$student_id'");
		$registerquery = $mysqli->query("INSERT INTO operations (student_id, time, type) VALUES('$student_id', NOW(), '1')");
		echo 1;
	}

}
else{ // report error if no student is currently logged in
	echo 404;
}

?>