<?php include("includes/includedFiles.php") ?>

<h1 class="pageHeadingBig"> You might also Like</h1>

<div class="gridViewContainer">

  <?php

    $albumQuery = mysqli_query($con,"SELECT * FROM albums ORDER BY RAND() LIMIT 10");

    while($row = mysqli_fetch_array($albumQuery))
    {
      echo "<div class='gridViewItem'>

              <span tabindex='0' role='link' onclick='openpage(\"album.php?id=".$row['id']."\")'>
             <img src='". $row['artworkPath']."'>

              <div class='gridViewInfo'>"
                . $row['title'].
              "</div>
              </span>

            </div>";
    }
  ?>
</div>
