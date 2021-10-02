const fs = require("fs")
const path = require("path")
const express = require('express')
const app = express()
const port = 8080;
app.use(express.json({ limit: '1mb' }));
// Static Files
app.use(express.static('public'));
app.use(express.static('music'));
app.use(express.static('covers'));
app.use(express.static('.'));
// Specific folder example
app.use('/css', express.static(__dirname + './css'))
app.use('/js', express.static(__dirname + './js'))
app.use('/playlisticons', express.static(__dirname + 'covers/playlisticons'))
// Set View's
app.set('views', './ejs');
app.set('view engine', 'ejs');




const dir = './music';
const dirP='./covers/playlisticons';


const getAllFiles = function(dirPath, arrayOfFiles) {
  files = fs.readdirSync(dirPath)

  arrayOfFiles = arrayOfFiles || []

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
    } else {
      arrayOfFiles.push(path.join( dirPath, "/", file))
    }
  })

  return arrayOfFiles.filter(el => path.extname(el) === '.mp3')
}

const getAllPls = function(dirPath, arrayOfFiles) {
  files = fs.readdirSync(dirPath)

  arrayOfFiles = arrayOfFiles || []

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
    } else {
      arrayOfFiles.push(path.join( dirPath, "/", file))
    }
  })

  return arrayOfFiles.filter(el => path.extname(el) === '.webp')
}

listtxt=getAllFiles(dir)
pltxt=getAllPls(dirP)

// Navigation
app.get('/matter', (req, res) => {
    res.render('matter', { songs: listtxt , pls:pltxt })
})

app.get('/about', (req, res) => {
   res.sendFile(__dirname + '/views/about.html')
})

app.get('', (req, res) => {
    res.render('matter', { songs: listtxt , pls:pltxt })
})


/////
app.post("/addintopl", (req, res) => {
	data=req.body
	let m3utxt="#EXTINF: " + data.title
	m3utxt+="\n"+ data.link
	console.log(m3utxt)
	fs.appendFile(data.fn, m3utxt, (err) => {
		if (err) {
		    console.log(err)
		}
		else{
		console.log("File is updated.");
		}

	});
	res.json({"saved":m3utxt})


});
////////


app.listen(port, () => console.info(`App listening on port ${port}`))