// Basic grayscale methods

// Methods to partition a grayscale image for processing.

function partitionImage(numberOfChunks, imageData) {
	// If 1 or 0 chunks, return original image
	if (numberOfChunks == 1 || numberOfChunks == 0) {
		return imageData.data;
	}
	
	// We treat the outer 1 pixel border differently than the rest of the image. Remove it from the height and width.
	var imageWidth = imageData.width - 2;
	var imageHeight = imageData.height - 2;
	
	console.log("Image Width: " + imageWidth);
	console.log("Image Height: " + imageHeight);
	
	// If the borderless image is 0 pixels or less high OR wide, just return the original image data.
	if (imageWidth <= 0 || imageHeight <= 0) {
		return imageData.data;
	}
	
	// Compute the maximum number of chunks possible
	var validatedNumberOfChunks = 0;
	
	for (var i = numberOfChunks; i > 0; i--) {
		// Starting with numberOfChunks, check that both x and y dimension can be chunked i times. Break if both can.
		if (~~(imageWidth/i) != 0 && ~~(imageHeight/i) != 0) {
			validatedNumberOfChunks = i;
			break;
		}
	}
	
	console.log(validatedNumberOfChunks);
	
	// Compute the chunk width and height
	var chunkWidth = ~~(imageWidth/validatedNumberOfChunks);
	var chunkHeight = ~~(imageHeight/validatedNumberOfChunks);
	
	// Partition the image into chunks
	var chunks = new Array();
	
	for (var i = 0; i < validatedNumberOfChunks; i++) {
		
	}
}

// Array conversion methods

function grayscaleImageDataToArray(imageData) {
	var imageArray = new Array();
	
	var imageDataIndex = 0;
	for (var i = 0; i < imageData.height; i++) {
		imageArray[i] = new Array();
		
		for (var j = 0; j < imageData.width; j++) {
			imageArray[i][j] = imageData.data[imageDataIndex];
			
			imageDataIndex = imageDataIndex + 4;
		}
	}
	
	return imageArray;
}

function grayscaleImageArrayToImageData(context, imageArray) {
	// Get the array height and width
	height = imageArray.length;
	width = imageArray[0].length;
	
	imageData = context.createImageData(width, height);
	
	var imageDataIndex = 0;
	for (var i = 0; i < height; i++) {
		for (var j = 0; j < width; j++) {
			imageData.data[imageDataIndex] = imageArray[i][j];
			imageData.data[imageDataIndex + 1] = imageArray[i][j];
			imageData.data[imageDataIndex + 2] = imageArray[i][j];
			imageData.data[imageDataIndex + 3] = 255;
			
			imageDataIndex = imageDataIndex + 4;
		}
	}
	
	return imageData;
}