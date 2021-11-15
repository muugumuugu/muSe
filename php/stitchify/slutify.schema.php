use slutify;
CREATE TABLE artists (
	id		varchar(500)
	name 	varchar(500)
);

CREATE TABLE albums
	 id           varchar(500),
	 title        varchar(100),
	 genre        varchar(100),
	 artist       varchar(100),
	 artworkPath  varchar(100)
 );

CREATE TABLE playlistSongs(
	playlistId     varchar(500),
	songId         varchar(5000),
	playlistOrder  int
);

CREATE TABLE playlists(
	id     varchar(100),
	name   varchar(100),
	owner  varchar(100)
);

CREATE TABLE songs(
	id        varchar(5000),
	title     varchar(5000),
	artist    varchar(500) ,
	album     varchar(100) ,
	genre     varchar(500) ,
	duration  varchar(100) ,
	path      varchar(5000)
);

CREATE TABLE users(
	username    varchar(100),
	password    varchar(100),
	signUpDate  varchar(100),
	profilePic  varchar(100)
);