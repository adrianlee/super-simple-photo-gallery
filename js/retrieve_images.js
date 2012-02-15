var dirList = [];
var imageDirList = [];

var JPG_EXTENSION = ".jpg";
var PNG_EXTENSION = ".png";
var GIF_EXTENSION = ".gif";
var APPWORLD_FOLDER = "appworld/"

function getAllDirectories() {
	var ind = 0,
		rootDirectories = blackberry.io.dir.getRootDirs();
		
	for (ind = 0; ind < rootDirectories.length; ind++) {
		checkImgDir(rootDirectories[ind]);
		getDirectories(rootDirectories[ind]);
	}
}

function getDirectories(dir) {
	var dirs = blackberry.io.dir.listDirectories(dir),
		ind = 0;
		
	for (ind = 0; ind < dirs.length; ind++) {
		if (dirs[ind] !== APPWORLD_FOLDER) { 
			checkImgDir(dir.concat(dirs[ind]));
			getDirectories(dir.concat(dirs[ind]));
		}
	}
}

function checkImgDir(dir) {
	var filesList = blackberry.io.dir.listFiles(dir),
		ind = 0;
		
	for (ind = 0; ind < filesList.length; ind++) {
		if (filesList[ind].indexOf(JPG_EXTENSION) != -1 || 
				filesList[ind].indexOf(PNG_EXTENSION) != -1 ||
					filesList[ind].indexOf(GIF_EXTENSION) != -1) {
			dirList.push(dir.concat(filesList[ind]));
			alert(dir.concat(filesList[ind]));
		}	
	}
}