+ To Contribute Songs
	+ Fork this repo, and then
	+ copy the link to your fork repo, most probably ```https://github.com/username/muSe.git```
	+ go to bash and execute
		```bash
		git clone --depth 1 --branch community --single-branch link-to-your-fork muSeshelf
		cd muSeshelf
		git checkout -b contribution-by-your-username-date
		```
	+ now freely add your songs, playlists, lyrics, whatever and then execute
		```bash
		git add .
		git commit -m "any message you have + your good name + anything u wanna mention"
	+ to get it on the web
		+ first  push your commits
			```bash
			git push origin contribution-by-your-username-date
			```
		+ this will show you a message such as this
			```bash
			remote: Create a pull request for 'contribution-by-your-username-date' on GitHub by visiting:
			remote:     	https://github.com/muugumuugu/muSe/pull/new/contribution-by-your-username-date
			```
		+ Visit your repo and Create a Pull request.
			+ ![]
			+ choose the base as muSe/community and
			+ write a message and confirm creating a pull request.
	+ to keep the shelf maintained i keep removing files from there into the music folder, so it would be advisable to add my repo as another remote, and to fetch from it time to time.
		+ git pull remote community
	+ you can create a new branch from here again, that's best git practice
		```
		git checkout community
		git checkout -b contribution-by-your-username-newdate
		git branch -d  contribution-by-your-username-olddate
		```
	+ or just continue to use your branch.
		+ i am as of yet not sure if this will cause any merge conflicts :(.



---------------
# snippets for me.

## contributions

```bash
git clone https://github.com/muugumuugu/muSe.git  --single-branch  --branch community --depth 1 community-temp
cd community-temp
```

## code

```bash
git add '/home/muku/Desktop/muSe/builds' '/home/muku/Desktop/muSe/community' '/home/muku/Desktop/muSe/bash' '/home/muku/Desktop/muSe/covers' '/home/muku/Desktop/muSe/css' '/home/muku/Desktop/muSe/dat' '/home/muku/Desktop/muSe/dump' '/home/muku/Desktop/muSe/ejs' '/home/muku/Desktop/muSe/go' '/home/muku/Desktop/muSe/html' '/home/muku/Desktop/muSe/js' '/home/muku/Desktop/muSe/lyrics' '/home/muku/Desktop/muSe/php' '/home/muku/Desktop/muSe/playlists' '/home/muku/Desktop/muSe/python' '/home/muku/Desktop/muSe/index.html' '/home/muku/Desktop/muSe/electron-app.js' '/home/muku/Desktop/muSe/package.json' '/home/muku/Desktop/muSe/package-lock.json' '/home/muku/Desktop/muSe/GUIDE.md' '/home/muku/Desktop/muSe/README.md' '/home/muku/Desktop/muSe/TODO.md' '/home/muku/Desktop/muSe/.gitignore' '/home/muku/Desktop/muSe/muse.png' '/home/muku/Desktop/muSe/_config.yml'
```

## dump adder

``` bash
git backup
```