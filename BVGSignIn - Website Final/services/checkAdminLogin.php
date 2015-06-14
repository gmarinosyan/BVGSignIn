<?php 

// The script which checks whether an admin is currently logged in.

include "base.php"; 
$mysqli = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

if(isset($_SESSION['adminLoggedIn'])){ 
	echo 1;
}
else{
	echo 0;
}

?>