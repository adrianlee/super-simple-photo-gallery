var $container = $('#container');
var numColumns = 4;

function boxmaker (src) {
  return  '<div class="box col">' + 
          '<img src="' + src + '" onclick="expand()"/>' +
          '</div>';
}

function populate(list) {
  _.each(list, function (x) {
    var $boxes = $(boxmaker(x));
    $container.append( $boxes ).masonry( 'appended', $boxes );
  });
}


function expand() {
  console.log('asd');
}

$(function(){
  var $container = $('#container');
  
  $(window).resize(function() {
    $container.masonry( 'reload' );
  });

  var list = [
    'http://farm5.static.flickr.com/4113/5013039951_3a47ccd509.jpg',
    'http://farm5.static.flickr.com/4131/5013039885_0d16ac87bc.jpg',
    'http://farm5.static.flickr.com/4086/5013039583_26717f6e89.jpg',
    'http://farm5.static.flickr.com/4146/5013646070_f1f44b1939.jpg',
    'http://farm5.static.flickr.com/4144/5013039541_17f2579e33.jpg',
    'http://farm5.static.flickr.com/4153/5013039741_d860fb640b.jpg',
    'http://farm5.static.flickr.com/4113/5013039697_a15e41fcd8.jpg',
    'http://farm5.static.flickr.com/4124/5013646314_c7eaf84918.jpg',
    'http://farm5.static.flickr.com/4089/5013040075_bac12ff74e.jpg',
    'http://farm5.static.flickr.com/4113/5013039951_3a47ccd509.jpg',
    'http://farm5.static.flickr.com/4131/5013039885_0d16ac87bc.jpg',
    'http://farm5.static.flickr.com/4086/5013039583_26717f6e89.jpg',
    'http://farm5.static.flickr.com/4146/5013646070_f1f44b1939.jpg',
    'http://farm5.static.flickr.com/4144/5013039541_17f2579e33.jpg',
    'http://farm5.static.flickr.com/4153/5013039741_d860fb640b.jpg',
    'http://farm5.static.flickr.com/4113/5013039697_a15e41fcd8.jpg',
    'http://farm5.static.flickr.com/4124/5013646314_c7eaf84918.jpg',
    'http://farm5.static.flickr.com/4113/5013039951_3a47ccd509.jpg',
    'http://farm5.static.flickr.com/4131/5013039885_0d16ac87bc.jpg',
    'http://farm5.static.flickr.com/4086/5013039583_26717f6e89.jpg',
    'http://farm5.static.flickr.com/4146/5013646070_f1f44b1939.jpg',
    'http://farm5.static.flickr.com/4144/5013039541_17f2579e33.jpg',
    'http://farm5.static.flickr.com/4153/5013039741_d860fb640b.jpg',
    'http://farm5.static.flickr.com/4113/5013039697_a15e41fcd8.jpg',
    'http://farm5.static.flickr.com/4124/5013646314_c7eaf84918.jpg'
  ];

  //getAllDirectories();
  //populate(typeof imageDirList != 'undefined' || imageDirList != null ? imageDirList : list);
  //console.log(imageDirList);
  
  populate(list);

  $container.imagesLoaded( function(){
    $container.masonry({
      isAnimated: false,
      itemSelector : '.box',
	  columnWidth: function( containerWidth ) {
		$('.col').css('width', (containerWidth / 5)-4);
		$('div.col > img').css('width', (containerWidth / 5)-4);
		return containerWidth / 5;
	  }
    });
  });
});

$(window).resize(function() {
  // $container.masonry( 'reload' );
});
