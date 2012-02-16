var dirList = [];
var imageDirList = [];

var JPG_EXTENSION = ".jpg";
var PNG_EXTENSION = ".png";
var GIF_EXTENSION = ".gif";

var HOME_DIR = "home/";
var USER_DIR = "user/";
var CAMERA_IN_DIR = "camera";
var PICTURE_IN_DIR = "picture";
var PHOTO_IN_DIR = "photo";
var DOWNLOAD_IN_DIR = "download";

var PB_ROOT_DIR = "file:///accounts/1000/shared/";
var PB_CAMERA_DIR = "file:///accounts/1000/shared/camera/";
var PB_PHOTO_DIR = "file:///accounts/1000/shared/photos/";
var PB_DOWNLOADS_DIR = "file:///accounts/1000/shared/downloads/";

/*
 * This function obtains the root directory and then call helper function which
 * recurses through sub-directories to locate directories containing images.
 */
function getAllDirectories() {	
	try {
		if (blackberry.io.dir.exists(PB_ROOT_DIR)) {
			getDirectories(PB_CAMERA_DIR);
			getDirectories(PB_DOWNLOADS_DIR);
			getDirectories(PB_PHOTO_DIR);
		}
	} catch(e) {
		var rootDir = blackberry.io.dir.getRootDirs(),
			index = 0;
			
		for (index = 0; index < rootDir.length; index++) {
			getDirectories(rootDir[index]);
		}
	}
}

/*
 * Finds all the directories in the current directory. It will incoke an
 * helper function to check if the current directory contains any images.
 * Then it recurse into any containing sub-directories in the current
 * directory.
 */
function getDirectories(dir) {
	var dirs = blackberry.io.dir.listDirectories(dir),
		ind = 0;

	checkImgDir(dir);
	
	if (dir !== PB_DOWNLOADS_DIR) {
		for (ind = 0; ind < dirs.length; ind++) {
			if (dirs[ind] === HOME_DIR || dirs[ind] === USER_DIR || dirs[ind].toLowerCase().indexOf(CAMERA_IN_DIR) != -1 || 
					dirs[ind].toLowerCase().indexOf(PICTURE_IN_DIR) != -1 || dirs[ind].toLowerCase().indexOf(PHOTO_IN_DIR) != -1 ||
						dirs[ind].toLowerCase().indexOf(DOWNLOAD_IN_DIR) != -1) { 
				getDirectories(dir.concat(dirs[ind]));
			}
		}
	}
}

/*
 * Check if there are images in the specified directory and add
 * that directory into dirList. Also adds image directory into
 * imageDirList array.
 */
function checkImgDir(dir) {
	var filesList = blackberry.io.dir.listFiles(dir),
		ind = 0,
		added = false;
		
	for (ind = 0; ind < filesList.length; ind++) {
		if (filesList[ind].indexOf(JPG_EXTENSION) != -1 || 
				filesList[ind].indexOf(PNG_EXTENSION) != -1 ||
					filesList[ind].indexOf(GIF_EXTENSION) != -1) {
			if (!added) {
				dirList.push(dir);
				added = true;
			}
			imageDirList.push(dir.concat(filesList[ind]));
		}	
	}
}