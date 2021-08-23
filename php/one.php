<link rel="stylesheet" href="/styles/home.css"><link rel="icon" href="../muse.ico">
<style>footer{width:100%;position:fixed;bottom:0px;left:0px;right:0px;}header{position:fixed;top:0px;left:0px;right:0px;}audio{width:100%;}ul.flexnone{height:80%;position:fixed;top:100px;left:0px;right:0px;margin:0px;padding:0px;justify-content:center;}li{text-align:center;width:250px!important; border:dotted; border-width:0.3px; margin:8px;}</style>
<?php
$search_dir = '../music';
$current_dir = basename(__DIR__);
if (isset($_GET['id']) ) {
	$master = urldecode($_GET['id']);
	if (strpos($master,'.mp3') !== false)
		{
			print '<title>' .  substr(preg_replace('/.* _ /',"",$master),0,-4) . '</title>';
			print '<header><audio src="' .$search_dir . '/' .$master . '" type="audio/mpeg" controls autoplay><code> Your browser does not support audio tags</code></audio></header>';
		}
	else if (strpos($master,'.html') == false){
			print '<header><h1>pick a song</h1></header><ul class="flexnone">';
			$contents = scandir($search_dir . '/' . $master);
			foreach ($contents as $item) {
				$url=urlencode($master . '/' .$item);
				if ( (is_file($search_dir . '/' . $master . '/' . $item)) AND (substr($item, -5, 5) != '.html') ){print "<li><a href='?id=$url'>$item</a></li>";}
			}
			print '</ul>';
		}
}
else {
	print '<header><h1>album board</h1></header><ul class="flexnone">';
	$contents2 = scandir($search_dir);
	foreach ($contents2 as $item) {
		$url=urlencode($item);
		if ((is_dir($search_dir . '/' . $item)) AND (substr($item, 0, 1) != '.')){print "<li><a href='?id=$url'>$item</a></li>";}
	}
	print '</ul>' ;
}
?>
<footer><a title="back" href="./one.php" style="text-decoration:none">===================================================================</span></a></footer>
