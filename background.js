chrome.runtime.onInstalled.addListener(function (){
    chrome.contextMenus.create({
        title: "Edit with Gimp online",
        id: "gimpUpload",
        contexts: ["image"]
    });
});


chrome.contextMenus.onClicked.addListener(function(info, tab){
    if (info.menuItemId === "gimpUpload") {
        var imgUrl = info.srcUrl;
        gimpUpload(imgUrl);
    }
});



function gimpUpload(imgUrl) {      
     
  	 var filenamex = Math.floor(Math.random() * 2000000) + ".png";
  	
  	if ( (imgUrl.indexOf("http://") !=-1) || (imgUrl.indexOf("https://") !=-1)) {
  		//alert("vamos directos con url de imagen");
  		finalurl =  "http://www.offidocs.com/edit-gimp.php?fileurl="+ imgUrl+"&filename="+ filenamex ;
    	//alert(finalurl);
    	window.open(finalurl,'_blank');
  	}	
  	else {
  		//alert("hay que subir la imagen primero porque no es una url");
  		var urlsubir = "http://www.offidocs.com/uploadextensions.php?filename="+ filenamex;
  		var base64ImageContent = imgUrl.replace(/^data:image\/(png|jpg|jpeg|gif);base64,/, "");
		var blob = base64ToBlob(base64ImageContent, 'image/png'); 
		var formData = new FormData();
		formData.append('picture', blob);
		//alert("subir primero a la url con post " + urlsubir);

		$.ajax({
    		url: urlsubir, 
    		type: "POST", 
    		cache: false,
    		contentType: false,
    		processData: false,
    		data: formData})
        		.done(function(e){
            		finalurl =  "http://www.offidocs.com/edit-gimp.php?filename="+ filenamex + "&fileurl=post";
        			window.open(finalurl,'_blank');
        		})
        		.fail(function(xhr, err) {
    				finalurl =  "http://www.offidocs.com/edit-gimp.php?filename="+ filenamex + "&fileurl=post";
        			window.open(finalurl,'_blank');
				})
  				.always(function() {
  				});
  			}		

	
}


function base64ToBlob(base64, mime) 
{
    mime = mime || '';
    var sliceSize = 1024;
    var byteChars = window.atob(base64);
    var byteArrays = [];

    for (var offset = 0, len = byteChars.length; offset < len; offset += sliceSize) {
        var slice = byteChars.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, {type: mime});
}

