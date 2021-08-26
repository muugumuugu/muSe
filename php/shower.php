<?php
header( 'content-type: text/html; charset:utf-8' );
session_start();
error_reporting( 0 );
$usepassword = false;
$password = '123';
$allowedextensions = array( 'mp3', 'flac', 'wav', 'ogg', 'opus', 'webm' );
$excluded = array( '.', '..', '.git', '.htaccess', '.htpasswd', 'covers','css','dist','html','js','lyrics','php','playlists',"forMP3player");
$width = '40%';
###themes
### "shore"
###$backgroundimg = '../covers/bg_shore.webp';$background = '#222';$accentfg = '#000';$accentbg = '#f9df5d';$menubg = '#cda453';$menushadow = '#ffdbaa';$gradient1 = '#1a1a1a';$gradient2 = '#444';$filebuttonfg = '#bbb';
###dark"
 $backgroundimg = '../covers/bg_dark.webp';
 $background = '#333';
 $accentfg = '#000';
 $accentbg = '#555';
 $menubg = '#777';
 $menushadow = '#ccc';
 $gradient1 = '#1a1a1a';
 $gradient2 = '#444';
 $filebuttonfg = '#bbb';
### "forest"
###$backgroundimg = '../covers/bg_forest.webp';$background = '#556555';$accentfg = '#034'; $accentbg = '#a8f75e';$menubg = '#5e9748'; $menushadow = '#a9fa98'; $gradient1 = '#1a1a1a';$gradient2 = '#444'; $filebuttonfg = '#bbb';
if( isset( $_POST['password'] ) ) {
    if ( htmlspecialchars($password) == htmlspecialchars( $_POST['password'] ) ) {
        $_SESSION['authenticated'] = 'yes';
        header( "Location: {$_SERVER['HTTP_REFERER']}" );
    }
} elseif( isset( $_GET['play'] ) ) {
    $song = sanitizeGet( $_GET['play'] );
    if ( is_file( $song ) ) {
        $songinfo = getsonginfo( $song );
        $dirsonglist = getDirContents( dirname( $song ) );
        foreach ($dirsonglist['files'] as &$file) {
            $file = dirname( $song ) . '/' . $file;
        } unset($file);
        setcookie( 'nm_nowplaying', urlencode( $song ), strtotime( '+1 day' ) );
        setcookie( 'nm_songs_currentsongdir', json_encode( $dirsonglist['files'] ), strtotime ( '+1 week' ) );
        if ( !isset( $_COOKIE['nm_songs_active'] ) ) {
            setcookie( 'nm_songs_active', json_encode( $dirsonglist['files'] ), strtotime ( '+1 week' ) );
            setcookie( 'nm_songs_active_idx', array_search( $song, $dirsonglist['files'] ), strtotime ( '+1 week' ) );
        } else {
            $activesonglist = json_decode( $_COOKIE['nm_songs_active'], true );
            if ( array_search( $song, $activesonglist ) === false ) {
                if ( isset( $_COOKIE['nm_shuffle'] ) && $_COOKIE['nm_shuffle'] == 'on' ) {
                    shuffle( $dirsonglist['files'] );
                    array_splice( $dirsonglist['files'], array_search( $song, $dirsonglist['files'] ), 1 );
                    array_unshift( $dirsonglist['files'], $song );
                }
                setcookie( 'nm_songs_active', json_encode( $dirsonglist['files'] ), strtotime ( '+1 week' ) );
                setcookie( 'nm_songs_active_idx', array_search( $song, $dirsonglist['files'] ), strtotime ( '+1 week' ) );
            } else {
                setcookie( 'nm_songs_active_idx', array_search( $song, $activesonglist ), strtotime ( '+1 week' ) );
            }
        }
        $error = '';
    } else {
        $songinfo = array();
        $error = "Could not find file {$song}.";
        $song = '';
    }
    loadPage( $song, $error, $songinfo );
} elseif( isset( $_GET['which'] ) )  {
    $which = sanitizeGet( $_GET['which'] );
    if ( isset( $_COOKIE['nm_songs_active'] ) && isset( $_COOKIE['nm_songs_active_idx'] ) ) {
        $songlist = json_decode( $_COOKIE['nm_songs_active'], true );
        $currentindex = $_COOKIE['nm_songs_active_idx'];
        if ( $which === 'next' && isset( $songlist[$currentindex + 1] ) ) {
            echo urlencode( $songlist[$currentindex + 1] );
        } elseif ( $which === 'previous' && isset( $songlist[$currentindex - 1] ) ) {
            echo urlencode( $songlist[$currentindex - 1] );
        }
    }
} elseif( isset( $_GET['dir'] ) )  {
    ### responding to AJAX request for directory contents
    if ( $usepassword && !isset ( $_SESSION['authenticated'] ) ) {
        echo <<<PASSWORDREQUEST
<div id="header"><div id="passwordrequest">
    Password required
    <form action="." method="post">
        <input type="password" name="password" id="passwordinput" />
        <input type="submit" value="Submit" />
    </form>
</div></div>';
PASSWORDREQUEST;
    } else {
        $basedir = sanitizeGet( $_GET['dir'] );
        if ( is_dir( $basedir ) ) {
            setcookie( 'nm_currentbrowsedir', urlencode( $basedir ), strtotime( '+1 day' ) );
            $dircontents = getDirContents( $basedir );
            echo '<div id="header">';
            renderButtons();
            echo '<div id="breadcrumbs">';
            $breadcrumbs = explode( '/', $basedir );
            for ( $i = 0; $i != sizeof( $breadcrumbs ); $i++ ) {
                $title = $breadcrumbs[$i] == '..'  ? 'Root'  : $breadcrumbs[$i];
                if ($i == sizeof($breadcrumbs) - 1) {
                    echo "<span id=\"breadcrumbactive\">{$title}</span>";
                } else {
                    $link = urlencode( implode( '/', array_slice( $breadcrumbs, 0, $i+1 ) ) );
                    echo "<span class=\"breadcrumb\" onclick=\"goToDir('{$link}');\">{$title}</span><span class=\"separator\">/</span>";
                }
            }
            echo '</div>';
            echo '</div>';
            if ( empty( $dircontents['dirs'] ) && empty( $dircontents['files'] ) ) {
                echo '<div id="filelist" class="list"><div>This directory is empty.</div></div>';
            } else {
                if ( !empty( $dircontents['dirs'] ) ) {
                    echo '<div id="dirlist" class="list">';
                    foreach ( $dircontents['dirs'] as $dir ) {
                        $link = urlencode( $basedir . '/' . $dir );
                        echo "<div class=\"dir\" onclick=\"goToDir('{$link}');\">{$dir}</div>";
                    } unset( $dir );
                    echo '</div>';
                }
                if ( !empty( $dircontents['files'] ) ) {
                    echo '<div id="filelist" class="list">';
                    foreach ( $dircontents['files'] as $file ) {
                        $link = urlencode( $basedir . '/' . $file );
                        $song = pathinfo( $file, PATHINFO_FILENAME );
                        $jslink = str_replace( "'", "\'", $link );
                        $nowplaying = ( isset( $_COOKIE['nm_nowplaying'] ) && $_COOKIE['nm_nowplaying'] == $link ) ? ' nowplaying' : '';
                        echo "<div class=\"file{$nowplaying}\"><a href=\"?play={$link}\" onclick=\"setPlayMode('browse', '{$jslink}');\">&#x25ba; {$song}</a><div class=\"filebutton\" onclick=\"addToPlaylist('{$jslink}');\" title=\"Add to playlist\">+</div></div>";
                    } unset( $file );
                    echo '</div>';
                }
            }
        }
    }
} elseif( isset( $_GET['playlist'] ) )  {
    ### responding to AJAX request for playlist contents
    if ( $usepassword && !isset ( $_SESSION['authenticated'] ) ) {
        echo <<<PASSWORDREQUEST
<div id="header"><div id="passwordrequest">
    Password required
    <form action="." method="post">
        <input type="password" name="password" id="passwordinput" />
        <input type="submit" value="Submit" />
    </form>
</div></div>';
PASSWORDREQUEST;
    } else {
        if ( isset( $_COOKIE['nm_songs_playlist'] ) ) {
            $playlist = json_decode( $_COOKIE['nm_songs_playlist'], true );
        }
        echo '<div id="header">';
        renderButtons();
        echo '<div id="playlisttitle">Playlist</div>';
        echo '</div>';
        if ( empty( $playlist ) ) {
            echo '<div id="filelist" class="list"><div>This playlist is empty.</div></div>';
        } else {
            echo '<div id="filelist" class="list">';
            foreach ( $playlist as $link ) {
                $song = pathinfo( $link, PATHINFO_FILENAME );
                $dir = dirname( $link );
                $playlistdir = ( $dir == '.' ? '' : "<span class=\"playlistdirectory\">{$dir}</span><br />" );
                $link = urlencode( $link );
                $nowplaying = ( isset( $_COOKIE['nm_nowplaying'] ) && $_COOKIE['nm_nowplaying'] == $link ) ? ' nowplaying' : '';
                $jslink = str_replace( "'", "\'", $link );
                echo "<div class=\"file{$nowplaying}\"><a href=\"?play={$link}\" onclick=\"setPlayMode('playlist', '{$jslink}');\">{$playlistdir}&#x25ba; {$song}<br /></a><div class=\"filebutton\" onclick=\"moveInPlaylist('{$jslink}', -1);\"title=\"Move up\">&#x2191</div><div class=\"filebutton\" onclick=\"moveInPlaylist('{$jslink}', 1);\"title=\"Move down\">&#x2193</div><div class=\"filebutton\" onclick=\"removeFromPlaylist('{$jslink}');\" title=\"Remove from playlist\">&#x00d7</div></div>";
            } unset( $file );
            echo '</div>';
        }
    }
} else {
    loadPage();
}
function renderButtons() {
    $viewmode = ( isset( $_COOKIE['nm_viewmode'] ) && $_COOKIE['nm_viewmode'] == 'playlist' ) ? 'playlist' : 'browse';
    $playlistactive = ( $viewmode == 'playlist' ) ? ' active' : '';
    $browseactive = ( $viewmode == 'browse' ) ? ' active' : '';
    $shuffleactive = ( isset( $_COOKIE['nm_shuffle'] ) && $_COOKIE['nm_shuffle'] == 'on' ) ? ' active' : '';
    if ( isset( $_COOKIE['nm_currentbrowsedir'] ) ) { $dir = $_COOKIE['nm_currentbrowsedir']; }
    elseif ( isset( $_COOKIE['nm_currentsongdir'] ) ) { $dir = $_COOKIE['nm_currentsongdir']; }
    else { $dir = '.'; }
    if ( $viewmode == 'playlist' ) {
        $playlistbuttons = <<<PLBUTTONS
        <div class="button" onclick="clearPlaylist();"><span>Clear</span></div>
        <div class="separator"></div>
PLBUTTONS;
    } else {
        $playlistbuttons = '';
    }
    echo <<<BUTTONS
    <div class="buttons">
        {$playlistbuttons}
        <div class="button{$shuffleactive}" id="shufflebutton" onclick="toggleShuffle();"><span>Shuffle</span></div>
        <div class="separator"></div>
        <div class="button border{$browseactive}" onclick="goToDir('{$dir}');"><span>Browse</span></div>
        <div class="button{$playlistactive}" onclick="goToPlaylist('default')"><span>Playlist</span></div>
    </div>
BUTTONS;
}
function getDirContents( $dir ) {
    global $excluded, $allowedextensions;
    $allowedextensions = array_map( 'strtolower', $allowedextensions );
    $dirlist = array();
    $filelist = array();
    if ( $dh = opendir( $dir ) ) {
        while ( $itemname = readdir( $dh ) ) {
            if ( !in_array( $itemname, $excluded ) ) {
                if ( is_file( $dir . '/' . $itemname ) ) {
                    $info = pathinfo( $itemname );
                    if ( isset( $info['extension'] ) && in_array( strtolower( $info['extension'] ), $allowedextensions ) ) {
                        $filelist[] = $info['filename'] . '.' . $info['extension'];
                    }
                } elseif ( is_dir( $dir . '/' . $itemname ) ) {
                    $dirlist[] = $itemname;
                }
            }
        }
        closedir($dh);
    }
    if ( sizeof( $dirlist ) > 1 ) { usort( $dirlist, 'compareName' ) ; }
    if ( sizeof( $filelist ) > 1 ) { usort( $filelist, 'compareName' ) ; }
    return array('dirs' => $dirlist, 'files' => $filelist);
}
function getSongInfo( $song ) {
    $str = str_replace('.mp3','',basename( $song ));
	$titlePattern = '/(.*) _ /';
	$artistPattern = '/ _ (.*)/';
	$albumPattern='/.*\//';
    if ( file_exists( 'getid3/getid3.php' ) ) {
        require_once( 'getid3/getid3.php' );
        $getID3 = new getID3;
        $fileinfo = $getID3->analyze( $song );
        getid3_lib::CopyTagsToComments( $fileinfo );
        if ( isset( $fileinfo['comments_html']['title'][0] ) && !empty( trim( $fileinfo['comments_html']['title'][0] ) ) ) {
            $title = trim( $fileinfo['comments_html']['title'][0] );
        } else {
            $title = preg_replace($titlePattern, '', $str);
        }
        if ( isset( $fileinfo['comments_html']['artist'][0] ) && !empty( trim( $fileinfo['comments_html']['artist'][0] ) ) ) {
            $artist = trim( $fileinfo['comments_html']['artist'][0] );
        } else {
            $artist = preg_replace($artistPattern, '', $str);
        }
        if ( isset( $fileinfo['comments_html']['album'][0] ) && !empty( trim( $fileinfo['comments_html']['album'][0] ) ) ) {
            $album = trim( $fileinfo['comments_html']['album'][0] );
        } else {
            $album = preg_replace($albumPattern,'',dirname( $song ));
        }
        if ( isset( $fileinfo['comments_html']['year'][0] ) && !empty( trim( $fileinfo['comments_html']['year'][0] ) ) ) {
            $year = trim( $fileinfo['comments_html']['year'][0] );
        } elseif ( isset($fileinfo['comments_html']['date'][0] ) && !empty( trim( $fileinfo['comments_html']['date'][0] ) ) ) {
            $year = trim( $fileinfo['comments_html']['date'][0] );
        } else {
            $year = '';
        }
        if ( isset( $fileinfo['comments']['picture'][0] ) ) {
            $art = 'data:'.$fileinfo['comments']['picture'][0]['image_mime'].';charset=utf-8;base64,'.base64_encode( $fileinfo['comments']['picture'][0]['data'] );
        } else {
            $art = '';
        }
        return array(
            "title" => $title,
            "artist" => $artist,
            "album" => $album,
            "year" => $year,
            "art" => $art
        );
    } else {
        $str = basename( $song );
		$titlePattern = '/(.*) _ /';
		$artistPattern = '/ _ (.*)/';
		$albumPattern='/.*\//';
        return array(
            "title" => preg_replace($titlePattern, '', $str),
            "artist" => preg_replace($artistPattern, '', $str),
            "album" => preg_replace($albumPattern,'',dirname( $song )),
            "year" => '',
            "art" => ''
        );
    }
}
function sanitizeGet( $str ) {
    $str = stripslashes( $str );
	return $str;
}
function compareName( $a, $b ) {
    return strnatcasecmp( $a, $b );
}
function loadPage( $song = '', $error = '', $songinfo = array() ) {
    global $width, $background, $backgroundimg, $accentfg, $accentbg, $menubg, $menushadow, $gradient1, $gradient2, $filebuttonfg;
    $errordisplay = empty( $error ) ? 'none' : 'block';
    if ( isset( $_COOKIE['nm_viewmode'] ) && $_COOKIE['nm_viewmode'] == 'playlist' ) {
        $onloadgoto = "goToPlaylist('default');";
    } else {
        if ( isset( $_COOKIE['nm_currentbrowsedir'] ) ) { $dir = $_COOKIE['nm_currentbrowsedir']; }
        elseif ( isset( $_COOKIE['nm_currentsongdir'] ) ) { $dir = $_COOKIE['nm_currentsongdir']; }
        else { $dir ="../music/" ; }
        $onloadgoto = "goToDir('{$dir}');";
    }
    if ( empty( $songinfo ) ) {
        $songtitle = 'No file playing';
        $songinfoalign = 'center';
        $songsrc = '';
        $pagetitle = "ShoWer TiMe";
        $artist = '';
        $artistdisplay = 'none';
        $album = '';
        $albumdisplay = 'none';
        $year = '';
        $yeardisplay = 'none';
        $art = '';
        $artdisplay = 'none';
    } else {
        $songsrc = " src=\"{$song}\"";
        $songtitle = $songinfo['title'];
        $pagetitle = $songtitle;
        if ( !empty( $songinfo['artist'] ) ) {
            $artist = $songinfo['artist'];
            $artistdisplay = 'block';
            $pagetitle = "$artist - $pagetitle";
        } else {
            $artistdisplay = 'none';
        }
        if ( !empty( $songinfo['album'] ) ) {
            $album = $songinfo['album'];
            $albumdisplay = 'block';
        } else {
            $album = '';
            $albumdisplay = 'none';
        }
        if ( !empty( $songinfo['year'] ) ) {
            $year = $songinfo['year'];
            $yeardisplay = 'inline-block';
        } else {
            $year = '';
            $yeardisplay = 'none';
        }
        if ( !empty( $songinfo['art'] ) ) {
            $art = $songinfo['art'];
            $artdisplay = 'block';
            $songinfoalign = 'left';
        } else {
            $art = '';
            $artdisplay = 'none';
            $songinfoalign = 'center';
        }
    }
    echo <<<HTML
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <title>{$pagetitle}</title>
    <link href="../muse.png" rel="icon">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" id="viewport" />
    <script>
        function goToDir(dir) {
            setCookie('nm_viewmode', 'browse', 7);

            xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
                    document.getElementById('interactioncontainer').innerHTML = xmlhttp.responseText;
                }
            }
            xmlhttp.open('GET', '?dir=' + dir, true);
            xmlhttp.send();
        };
        function goToPlaylist(playlist) {
            setCookie('nm_viewmode', 'playlist', 7);

            xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
                    document.getElementById('interactioncontainer').innerHTML = xmlhttp.responseText;
                }
            }
            xmlhttp.open('GET', '?playlist=' + playlist, true);
            xmlhttp.send();
        };
        function addToPlaylist(song) {
            song = song.replace(/\+/g, '%20');
            song = decodeURIComponent(song);

            var playlist = getCookie('nm_songs_playlist');
            if (playlist) {

                playlist = JSON.parse(playlist);
                var songIdx = playlist.indexOf(song);
                if (songIdx >= 0) {
                    playlist.splice(songIdx, 1);
                }

                playlist.push(song);
            } else {
                var playlist = [song];
            }
            setCookie('nm_songs_playlist', JSON.stringify(playlist), 365);

            var playmode = getCookie('nm_playmode');
            if (playmode == 'playlist') {
                var shuffle = getCookie('nm_shuffle');
                if (shuffle == 'on') {

                    var currentsong = getCookie('nm_nowplaying');
                    var songlist = getCookie('nm_songs_active');
                    if (songlist) {
                        songlist = JSON.parse(songlist);
                        var songIdx = songlist.indexOf(currentsong);
                        var randomIdx = Math.floor(Math.random() * (songlist.length - songIdx) + songIdx + 1);
                        songlist.splice(randomIdx, 0, song);
                        setCookie('nm_songs_active', JSON.stringify(songlist), 7);
                    }
                } else {

                    var currentsong = getCookie('nm_nowplaying');
                    var songIdx = playlist.indexOf(currentsong);

                    setCookie('nm_songs_active', JSON.stringify(playlist), 7);
                    setCookie('nm_songs_active_idx', songIdx, 7);
                }
            }
        };
        function removeFromPlaylist(song) {
            song = song.replace(/\+/g, '%20');
            song = decodeURIComponent(song);
            var playlist = getCookie('nm_songs_playlist');
            if (playlist) {
                playlist = JSON.parse(playlist);
                var songIdx = playlist.indexOf(song);

                if (songIdx >= 0) {
                    playlist.splice(songIdx, 1);
                }
                setCookie('nm_songs_playlist', JSON.stringify(playlist), 365);

                var playmode = getCookie('nm_playmode');
                if (playmode == 'playlist') {
                    var songlist = getCookie('nm_songs_active');
                    songlist = JSON.parse(songlist);
                    var currentsong = getCookie('nm_nowplaying');
                    var songIdx = songlist.indexOf(currentsong);
                    songlist.splice(songIdx, 1)
                    setCookie('nm_songs_active', JSON.stringify(songlist), 7);
                }

                goToPlaylist('default');
            }
        };
        function moveInPlaylist(song, direction) {
            song = song.replace(/\+/g, '%20');
            song = decodeURIComponent(song);
            var playlist = getCookie('nm_songs_playlist');
            playlist = JSON.parse(playlist);
            var songIdx = playlist.indexOf(song);
            if (songIdx + direction >= 0 && songIdx + direction < playlist.length) {
                playlist.splice(songIdx, 1);
                playlist.splice(songIdx + direction, 0, song);
            }
            setCookie('nm_songs_playlist', JSON.stringify(playlist), 365);

            var playmode = getCookie('nm_playmode');
            var shuffle = getCookie('nm_shuffle');
            if (playmode == 'playlist' && shuffle != 'on') {
                var currentsong = getCookie('nm_nowplaying');
                var songIdx = playlist.indexOf(currentsong);
                setCookie('nm_songs_active', JSON.stringify(playlist), 7);
                setCookie('nm_songs_active_idx', songIdx, 7);
            }

            goToPlaylist('default');
        };
        function clearPlaylist() {
            setCookie('nm_songs_playlist', '', 365);
            var playmode = getCookie('nm_playmode');
            if (playmode == 'playlist') {
                setCookie('nm_songs_active', '', 7);
                setCookie('nm_songs_active_idx', '0', 7);
            }
            goToPlaylist('default');
        };
        function setPlayMode(mode, song) {
            setCookie('nm_playmode', mode, 7);

            if (mode == 'browse') {
                var songlist = getCookie('nm_songs_currentsongdir');
            } else if (mode == 'playlist') {
                var songlist = getCookie('nm_songs_playlist');
            }
            if (songlist) {
                songlist = JSON.parse(songlist)
                if (getCookie('nm_shuffle') == 'on') {
                    songlist = shuffleArray(songlist);

                    var songIdx = songlist.indexOf(song);
                    songlist[songIdx] = songlist[0];
                    songlist[0] = song;
                }
                setCookie('nm_songs_active', JSON.stringify(songlist), 7);
            }
        };
        function advance(which) {

            xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
                    if (xmlhttp.responseText) {
                        window.location.href = '?play=' + xmlhttp.responseText;
                    } else if (which == 'next' && getCookie('nm_shuffle') == 'on') {

                        toggleShuffle();
                        toggleShuffle();
                        advance('next');
                    }
                }
            }
            xmlhttp.open('GET', '?which=' + which, true);
            xmlhttp.send();
        };
        function toggleShuffle() {
            var shuffle = getCookie('nm_shuffle');
            if (shuffle == 'on') {

                setCookie('nm_shuffle', 'off', 7);
                document.getElementById('shufflebutton').classList.remove('active');

                var playmode = getCookie('nm_playmode');
                if (playmode == 'browse') {
                    var songlist = JSON.parse(getCookie('nm_songs_currentsongdir'));
                } else if (playmode == 'playlist') {
                    var songlist = JSON.parse(getCookie('nm_songs_playlist'));
                }

                var song = getCookie('nm_nowplaying');
                var songIdx = songlist.indexOf(song);

                setCookie('nm_songs_active', JSON.stringify(songlist), 7);
                setCookie('nm_songs_active_idx', songIdx, 7);
            } else {

                setCookie('nm_shuffle', 'on', 7);
                document.getElementById('shufflebutton').classList.add('active');

                var songlist = JSON.parse(getCookie('nm_songs_active'));
                var songlist = shuffleArray(songlist);

                var song = getCookie('nm_nowplaying');
                var songIdx = songlist.indexOf(song);

                songlist[songIdx] = songlist[0];
                songlist[0] = song;

                setCookie('nm_songs_active', JSON.stringify(songlist), 7);
                setCookie('nm_songs_active_idx', 0, 7);
            }
        };
        function shuffleArray(array) {
            var currentindex = array.length, temporaryValue, randomIndex;

            while (0 !== currentindex) {

                randomIndex = Math.floor(Math.random() * currentindex);
                currentindex -= 1;

                temporaryValue = array[currentindex];
                array[currentindex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }
            return array;
        };
        function setCookie(cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays*24*60*60*1000));
            var expires = 'expires=' + d.toUTCString();
            document.cookie = cname + '=' + encodeURIComponent(cvalue) + ';' + expires;
        }
        function getCookie(cname) {
            var name = cname + '=';
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for(var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    var result = c.substring(name.length, c.length);
                    result = result.replace(/\+/g, '%20');
                    return decodeURIComponent(result);
                }
            }
            return '';
        };
        document.addEventListener("DOMContentLoaded", function() {
            document.getElementById('audio').addEventListener('error', function() {
                document.getElementById('error').innerHTML = 'Playback error';
                document.getElementById('error').style.display = 'block';
                setTimeout(function(){ advance('next'); }, 2000);
            });
            document.getElementById('audio').addEventListener('ended', function() {
                advance('next');
            });
            {$onloadgoto}
        }, false);
        document.onkeydown = function(e){
            switch (e.keyCode) {
                case 90:
                    advance('previous');
                    break;
                case 88:
                    document.getElementById('audio').play();
                    document.getElementById('audio').fastSeek(0);
                    break;
                case 67:
                    var audio = document.getElementById('audio');
                    if (audio.paused) {
                        audio.play();
                    } else {
                        audio.pause();
                    }
                    break;
                case 86:
                    document.getElementById('audio').pause();
                    document.getElementById('audio').fastSeek(0);
                    break;
                case 66:
                    advance('next');
                    break;
                case 37:
                    advance('previous');
                    break;
                case 39:
                    advance('next');
                    break;
                case 13:
                    toggleView('$photoUrl');
                    break;
            }
        };
        function swipedetect(el, callback){
            var touchsurface = el,
                swipedir,
                startX,
                startY,
                distX,
                distY,
                threshold = 50,
                handleswipe = callback || function(swipedir){}
            touchsurface.addEventListener('touchstart', function(e){
                var touchobj = e.changedTouches[0]
                swipedir = 'none'
                dist = 0
                startX = touchobj.pageX
                startY = touchobj.pageY
            }, false)
            touchsurface.addEventListener('touchend', function(e){
                var touchobj = e.changedTouches[0]
                distX = touchobj.pageX - startX
                distY = touchobj.pageY - startY
                if (Math.abs(distX) >= threshold && Math.abs(distX) > Math.abs(distY)){
                    swipedir = (distX < 0)? 'left' : 'right'
                } else if (Math.abs(distY) >= threshold && Math.abs(distY) > Math.abs(distX)){
                    swipedir = (distY < 0)? 'up' : 'down'
                }
                handleswipe(swipedir)
            }, false)
        };
        window.addEventListener('load', function(){
            var el = document.getElementById('interactioncontainer');
            swipedetect(el, function(swipedir){
                if (swipedir == 'left'){
                    advance('next');
                } else if (swipedir == 'right'){
                    advance('previous');
                }
            })
        }, false);
    </script>
    <style>
        html, body {
                width: 100%;
                margin: 0px; padding: 0px;
                font-family: sans-serif; }
            html {
                    background: {$background} url('{$backgroundimg}') no-repeat fixed center top;
                    background-size: cover;}
            body {
                    min-height: 100vh;
                    box-sizing: border-box;
                    padding-bottom: 5px;
                    background-color: rgba(0, 0, 0, 0.25);  }
        #stickycontainer {
                position: sticky;
                top: 0;
                margin-bottom: 10px; }
            #playercontainer {
                    padding: 20px 0;
                    background-color: #333;
                    background-image: linear-gradient({$gradient1}, {$gradient2}); }
                #player {
                        width: {$width};
                        margin: 0 auto;
                        display: flex;
                        box-sizing: border-box;
                        padding: 10px;
                        background-color: #111; }
                    #albumart {
                            display: {$artdisplay};
                            width: 7.25vw;
                            height: 7.25vw;
                            margin-right: 10px;
                            background: #333 url({$art}) center center / contain no-repeat; }
                    #song {
                            flex-grow: 1;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between; }
                        #songinfo { }
                            #songinfo div {
                                    color: grey;
                                    text-align: {$songinfoalign};
                                    font-size: 1.2vw;
                                    height: 1.4vw;
                                    width: 100%;
                                    overflow: hidden; }
                            #artist {
                                    display: {$artistdisplay}; }
                            #album {
                                    display: {$albumdisplay}; }
                            #year {
                                    margin-left: .35em;
                                    display: {$yeardisplay}; }
                                #year:before {
                                        content: "("; }
                                #year:after {
                                        content: ")"; }
                        #player audio {
                                width: 100%;
                                height: 1.3vw;
                                margin-top: 1.5vw; }
                #divider {
                        height: 2px;
                        background-color: {$accentbg}; }
        #error {
                box-sizing: border-box;
                width: {$width};
                display: {$errordisplay};
                color: white;
                text-align: center;
                word-break: break-all;
                margin: 20px auto 10px auto;
                background-color: #a00;
                padding: 10px; }
        #interactioncontainer {
                box-sizing: border-box;
                line-height: 1.5; }
            #header {
                    display: flex;
                    justify-content: flex-start;
                    flex-direction: row-reverse;
                    overflow: hidden;
                    flex-wrap: wrap;
                    font-size: 0;
                    width: {$width};
                    margin: 0 auto 10px auto; }
                #playlisttitle, #breadcrumbs, #passwordrequest {
                        font-size: medium;
                        margin-top: 10px;
                        flex-grow: 1;
                        color: #333;
                        background-color: {$menubg}; }
                    #playlisttitle {
                            font-weight: bold;
                            padding: 10px; }
                    #passwordrequest {
                            display: flex;
                            padding: 10px; }
                    #passwordrequest form {
                            display: flex;
                            flex-grow: 1; }
                        #passwordrequest #passwordinput {
                                margin: 0 10px;
                                flex-grow: 1; }
                    .breadcrumb, #breadcrumbactive {
                            display: inline-block;
                            padding: 10px; }
                    .breadcrumb:hover {
                            cursor: pointer;
                            background-color: {$menushadow}; }
                    #breadcrumbactive {
                            font-weight: bold; }
                .buttons {
                        display: flex;
                        font-size: medium;
                        margin-left: 10px;
                        margin-top: 10px; }
                    .button {
                            padding: 10px;
                            background-color: {$menubg};  }
                        .button:hover {
                                cursor: pointer;
                                background-color: {$menushadow}; }
                        .border {
                            border-right: 1px solid {$menushadow}; }
                        .active {
                                font-weight: bold;  }
                            .active span {
                                    border-bottom: 2px solid {$accentbg}; }
                .separator {
                        color: #bbb;
                        padding: 0 5px; }
            .list div {
                    width: {$width};
                    box-sizing: border-box;
                    margin: 0 auto;
                    padding: 5px 10px;
                    color: #333;
                    background-color: {$menubg};
                    border-bottom: 1px solid {$menushadow}; }
                .list div:last-child {
                        margin-bottom: 10px;
                        border: 0; }
                .list .dir:hover, .list .file:hover {
                        cursor: pointer;
                        background-color: {$menushadow};
                        font-weight: bold; }
                .list .nowplaying {
                        background-color: {$accentbg};
                        font-weight: bold; }
                    .nowplaying > div {
                            background-color: {$accentbg}; }
                    .nowplaying:hover > div {
                            background-color: {$menubg}; }
                .list .file {
                        display: flex;
                        flex-wrap: nowrap;
                        justify-content: flex-start; }
                .list .file a {
                        display: block;
                        flex-grow: 1;
                        color: #333;
                        word-break: break-all;
                        text-decoration: none; }
                .list .nowplaying a {
                        color: {$accentfg}; }
                .list .file a:active {
                        display: block;
                        color: #fff;
                        text-decoration: none; }
                .list .file .filebutton {
                        border-radius: 100%;
                        border: 0;
                        width: 25px;
                        min-width: 25px;
                        height: 25px;
                        min-height: 25px;
                        color: {$filebuttonfg};
                        text-align: center;
                        font-weight: normal;
                        margin: 0;
                        font-size: medium;
                        padding: 0;
                        display: block; }
                    .list .file .filebutton:hover {
                            color: {$accentfg};
                            background-color: {$accentbg}; }
                .list .file .playlistdirectory {
                        width: 100%;
                        font-size: x-small; }
        @media screen and (max-width: 900px) and (orientation:portrait) {
                #player, #error, #header, .list div { width: 95%; }
                #albumart { width: 24vw; height: 24vw; }
                #songinfo div { height: 5vw; font-size: 4vw; }
                #player audio { height: 5vw; }
                #playlisttitle, #breadcrumbs, #passwordrequest, .buttons, .list { font-size: small; }
        }
        @media screen and (max-width: 900px) and (orientation:landscape) {
                #stickycontainer { position: static; }
                #player, #error, #header, .list div { width: 80%; }
                #albumart { width: 12vw; height: 12vw; }
                #songinfo div { height: 2.5vw; font-size: 2vw; }
                #player audio { height: 2.5vw; }
                #playlisttitle, #breadcrumbs, #passwordrequest, .buttons, .list { font-size: small; }
        }
    </style>
</head>
<body>
<div id="stickycontainer">
    <div id="playercontainer">
        <div id="player">
            <div id="albumart"></div>
            <div id="song">
                <div id="songinfo">
                    <div id="songTitle"><b>{$songtitle}</b></div>
                    <div id="artist">{$artist}</div>
                    <div id="album">{$album}<span id="year">{$year}</span></div>
                </div>
                <div id="audiocontainer">
                    <audio id="audio" autoplay controls{$songsrc}></audio>
                </div>
            </div>
        </div>
    </div>
    <div id="divider"></div>
</div>
<div id="error">{$error}</div>
<div id="interactioncontainer"></div>
</body>
</html>
HTML;
}
?>
