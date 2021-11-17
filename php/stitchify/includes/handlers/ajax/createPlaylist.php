<?php

include("../config.php");

if (isset($_POST['name']) && isset($_POST['username'])) {

	$name = $_POST['name'];
	$username = $_POST['username'];
	$date  = date('U') . $_POST['username'] ;

	$query = mysqli_query($con, "INSERT INTO playlists ( name, owner, id) VALUES( '$name', '$username', '$date')");
}
else {
	echo "Error creating playlist";
}


?>