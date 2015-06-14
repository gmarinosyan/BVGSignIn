<?php 

// The script which allows a student user to change his profile picture.

include "base.php"; 
$mysqli = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

if(isset($_FILES["file"]["type"])){ // check whether profile picture file is present

	$validextensions = array("jpeg", "jpg"); // accepted file formats
	$temporary = explode(".", $_FILES["file"]["name"]); // split file name into name and extension
	$file_extension = end($temporary);

	if ((($_FILES["file"]["type"] == "image/jpg") || ($_FILES["file"]["type"] == "image/jpeg")
	) && ($_FILES["file"]["size"] < 3000000) && in_array($file_extension, $validextensions)) { // check that file fits all upload criteria

		if ($_FILES["file"]["error"] > 0){ // report error if file is corrupt
			echo "0";
		}

		else {

			$sourcePath = $_FILES['file']['tmp_name']; // Store source path of the file in a variable
			$targetPath = "../profilePics/".$_SESSION['student_id'].".jpg"; // Target path where file is to be stored
			move_uploaded_file($sourcePath,$targetPath) ; // Movie uploaded file
			echo "1";
		}
	}
	else{ // report error if file doesn't fit criteria
		echo "3";
	}
}

else { // report error if no file found
echo "2";
}


?>