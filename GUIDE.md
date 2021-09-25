+ To Contribute Songs
	+ Fork this repo, and then
	+ copy the link to your fork repo, most probably ```https://github.com/username/muSe.git```
	+ go to bash and execute
		```bash
		git clone --depth 1 --branch shelvingarea --single-branch link-to-your-fork muSeshelf
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
			+ choose the base as muSe/shelvingarea and
			+ write a message and confirm creating a pull request.
	+ to keep the shelf maintained i keep removing files from there into the music folder, so it would be advisable to add my repo as another remote, and to fetch from it time to time.
		+ git pull remote shelvingarea
	+ you can create a new branch from here again, that's best git practice
		```
		git checkout shelvingarea
		git checkout -b contribution-by-your-username-newdate
		git branch -d  contribution-by-your-username-olddate
		```
	+ or just continue to use your branch.
		+ i am as of yet not sure if this will cause any merge conflicts :(.



---------------
# snippets for me.
```bash
git clone https://github.com/muugumuugu/muSe.git --branch shelvingarea --single-branch shelf --depth 1 shelf
cd shelf
```

```
git add .
git commit -m "msg"
git push
```
