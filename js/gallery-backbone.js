$(function(){
  var list = [
    { src: 'http://farm5.static.flickr.com/4113/5013039951_3a47ccd509.jpg' },
    { src: 'http://farm5.static.flickr.com/4131/5013039885_0d16ac87bc.jpg' },
    { src: 'http://farm5.static.flickr.com/4086/5013039583_26717f6e89.jpg' },
    { src: 'http://farm5.static.flickr.com/4146/5013646070_f1f44b1939.jpg' },
    { src: 'http://farm5.static.flickr.com/4144/5013039541_17f2579e33.jpg' },
    { src: 'http://farm5.static.flickr.com/4153/5013039741_d860fb640b.jpg' },
    { src: 'http://farm5.static.flickr.com/4113/5013039697_a15e41fcd8.jpg' },
    { src: 'http://farm5.static.flickr.com/4124/5013646314_c7eaf84918.jpg' },
    { src: 'http://farm5.static.flickr.com/4089/5013040075_bac12ff74e.jpg' },
    { src: 'http://farm5.static.flickr.com/4113/5013039951_3a47ccd509.jpg' },
    { src: 'http://farm5.static.flickr.com/4131/5013039885_0d16ac87bc.jpg' },
    { src: 'http://farm5.static.flickr.com/4086/5013039583_26717f6e89.jpg' },
    { src: 'http://farm5.static.flickr.com/4146/5013646070_f1f44b1939.jpg' },
    { src: 'http://farm5.static.flickr.com/4144/5013039541_17f2579e33.jpg' },
    { src: 'http://farm5.static.flickr.com/4153/5013039741_d860fb640b.jpg' },
    { src: 'http://farm5.static.flickr.com/4113/5013039697_a15e41fcd8.jpg' },
    { src: 'http://farm5.static.flickr.com/4124/5013646314_c7eaf84918.jpg' },
    { src: 'http://farm5.static.flickr.com/4113/5013039951_3a47ccd509.jpg' },
    { src: 'http://farm5.static.flickr.com/4131/5013039885_0d16ac87bc.jpg' },
    { src: 'http://farm5.static.flickr.com/4086/5013039583_26717f6e89.jpg' },
    { src: 'http://farm5.static.flickr.com/4146/5013646070_f1f44b1939.jpg' },
    { src: 'http://farm5.static.flickr.com/4144/5013039541_17f2579e33.jpg' },
    { src: 'http://farm5.static.flickr.com/4153/5013039741_d860fb640b.jpg' },
    { src: 'http://farm5.static.flickr.com/4113/5013039697_a15e41fcd8.jpg' },
    { src: 'http://farm5.static.flickr.com/4124/5013646314_c7eaf84918.jpg' }
  ];

///////////////////////////////////////////////////////////////
//  Model
///////////////////////////////////////////////////////////////
  var Photo = Backbone.Model.extend({
    defaults: {
      src: 'placeholder.jpg',
      title: 'an image placeholder',
      view: 0,
      fav: false
    },

    initialize: function(){
      this.bind("change:src", function(){
        var src = this.get("src"); 
        console.log('Image source updated to ' + src);
      });
    },
    
    changeSrc: function( source ){
      this.set({ src: source });
    },
    
    initialize: function(){
      console.log('this model has been initialized');
      this.bind("error", function(model, error){
        console.log(error);
      });
    },

    addView: function() {
      var i = this.get('view') + 1;
      this.set({ view: i });
    },

    toggleFav: function() {
      var o = !this.get('fav');
      this.set({ view: i });
    }
  });

///////////////////////////////////////////////////////////////
//  Collection
///////////////////////////////////////////////////////////////
  var PhotoCollection = Backbone.Collection.extend({
      model: Photo,

      localStorage: new Store("photos")
  });

///////////////////////////////////////////////////////////////
//  View
///////////////////////////////////////////////////////////////
  var PhotoView = Backbone.View.extend({
    el: $('#container'),
    // Events
    events: { 
      'click a.view':  'view',
      'click a.fav': 'fav'
    },    
    // Listens for changes to its model, re-rendering.
    initialize: function () {
      _.bindAll(this, 'render', 'appendItem', 'view', 'fav');
    
      this.collection = new PhotoCollection(list);
      
      this.collection.bind('add', this.appendItem);

      this.render();
    },

    // Re-render the contents
    render: function () {
      var self = this;
      // $(this.el).append("<button id='add'>Add list item</button>");
        $(this.el).append("<ul></ul>");
      
      // Display what's in our collection
      _(this.collection.models).each(function(item){
        self.appendItem(item);
      }, this);
    },
    
    appendItem: function(item){
      $('ul', this.el).append("<li class='box col' style='height: auto'>"+"<a class='view' href='#'><img src='"+item.get('src')+"' /></li></a>");
    },

    view: function() {
      var i = this.model.get('view') + 1;
      this.model.set({ view: i });
    },

    fav: function() {
      //this.model.toggleFav();
    }
  });

///////////////////////////////////////////////////////////////
//  Init
///////////////////////////////////////////////////////////////
  //var photoCollection = new PhotoCollection();  
  var photoView = new PhotoView();

///////////////////////////////////////////////////////////////
//  Masonry
///////////////////////////////////////////////////////////////
  var $container = $('#container');

  $(".box").hide();
  $(".box > a > img").hide()
  .one("ready", function() {
    console.log($(this).height());
    $(this).parent().parent().css('height', $(this).height());
  })
  .one("load", function () {
    $(this).parent().parent().fadeIn();
    $(this).fadeIn(); 
  });

  $container.masonry({
    isAnimated: false,
    itemSelector : '.box',
    columnWidth: function( containerWidth ) {
      $('.col').css('width', (containerWidth / 5)-4);
      $('div.col > img').css('width', (containerWidth / 5)-4);
      return containerWidth / 5;
    }
  });

  $container.masonry( 'reload' );

  // var max_size = 200;
  // $("img").each(function(i) {
  //   if ($(this).height() > $(this).width()) {
  //     var h = max_size;
  //     var w = Math.ceil($(this).width() / $(this).height() * max_size);
  //   } else {
  //     var w = max_size;
  //     var h = Math.ceil($(this).height() / $(this).width() * max_size);
  //   }
  //   $(this).css({ height: h, width: w });
  // });


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