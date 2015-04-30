<?php include "base.php"; 
$mysqli = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

if(isset($_SESSION['loggedIn'])){
	echo $_SESSION['student_id'], " ", $_SESSION['firstName'], " ", $_SESSION['lastName'], " ", $_SESSION['status'];
}
else{
	echo 404;
}

?>