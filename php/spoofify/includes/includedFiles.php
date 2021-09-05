<?php

if (isset($_SERVER['HTTP_X_REQUESTED_WITH'])) {
	include("includes/handlers/config.php");
	include("includes/classes/User.php");
	include("includes/classes/playlist.php");
	include("includes/classes/Artist.php");
	include("includes/classes/Album.php");
	include("includes/classes/Songs.php");

	if (isset($_GET['userLoggedIn'])) {
		$userLoggedIn = new User($con, $_GET['userLoggedIn']);
	}
	else
	{
		echo "problem with openpage funtion- userLoggedIn";
	}

}
else
{

	include("includes/header.php");
	include("includes/footer.php");
	$url = $_SERVER['REQUEST_URI'];

	echo "<script>openpage('$url')</script>";

	exit();
}

 ?>