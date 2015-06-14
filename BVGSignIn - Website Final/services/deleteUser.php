<?php

// The script which allows an admin to delete a student user from the database.

include "base.php"; 
$mysqli = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

if(isset($_SESSION['adminLoggedIn'])){ // check whether admin is currently logged in
	$id = intval($_POST["id"]); // get student ID as an int
	
    $deleteStudent = $mysqli->query("DELETE FROM students WHERE student_id = '$id'"); // delete student with from database

    if (file_exists('../profilePics/' . $id . ".jpg")) { // if a profile picture exists, delete it
    	unlink('../profilePics/' . $id . ".jpg");   
	}

	if(file_exists('../profilePics/' . $id . ".jpeg")) {
    	unlink('../profilePics/' . $id . ".jpeg");
	}

	echo 1;
} else { // report error if admin is not logged in
	echo 404;
}

?>