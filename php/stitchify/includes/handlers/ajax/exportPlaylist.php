<?php

include("../config.php");

if (isset($_POST['playlistId'])) {

	$playlistId = $_POST['playlistId'];
	$query = mysqli_query($con, "SELECT songId FROM playlistSongs WHERE playlistId='$playlistId'");
	$qt = mysqli_query($con, "SELECT name FROM playlists WHERE id='$playlistId'");
	$tt=mysqli_fetch_array($qt);
	$m3u="#EXTM3U : " . $tt['name'] . "\n" ;

	while($row=mysqli_fetch_array($query)){
		$m3u=$m3u . "#EXTINF : " . preg_replace('/.*_ (.*).mp3/', '${1}',$row['songId'])  . "\n" . "music/" . $row['songId'] . "\n";
	}
	$file = "temp.m3u";
	$txt = fopen($file,"w") or die("Unable to open file!");
	fwrite($txt, $m3u);
	fclose($txt);
	/*
	header('Content-Description: File Transfer');
	header('Content-Disposition: attachment; filename='.basename($file));
	header('Expires: 0');
	header('Cache-Control: must-revalidate');
	header('Pragma: public');
	header('Content-Length: ' . filesize($file));
	header("Content-Type: text/plain");
	readfile($file);*/
	}
else {
	echo "Error exporting playlist";
}


?>