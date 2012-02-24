///////////////////////////////////////////////////////////////
//  Model
///////////////////////////////////////////////////////////////
var Photo = Backbone.Model.extend({
  defaults: {
    src: 'http://placekitten.com/200/300',
    view: 0,
    fav: false
  }
});

///////////////////////////////////////////////////////////////
//  Collection
///////////////////////////////////////////////////////////////
var PhotoGallery = Backbone.Collection.extend({
  model: Photo,
  localStorage: new Store("photos")
});

var gallery = new PhotoGallery();


///////////////////////////////////////////////////////////////
//  Photo Item View
///////////////////////////////////////////////////////////////
var PhotoItemView = Backbone.View.extend({
  tagName: "li",

  initialize: function () {
    this.template = $('#photo-template');
    _.bindAll(this, "render");
    // this.model.bind("change:fav", this.toggleFav);
  },

  events: {
    // "click a" : "open"
  },

  render: function() {
    var content = this.template.tmpl(this.model.toJSON());
    $(this.el).html(content);
    return this;
  }
});

///////////////////////////////////////////////////////////////
//  Photo List View
///////////////////////////////////////////////////////////////
var PhotoListView = Backbone.View.extend({
  el: $('#container'),

  initialize: function() {
    _.bindAll(this, "render");
    this.collection.bind("add", this.render);
    this.collection.bind("remove", this.render);
  },
  
  render: function() {
    $(this.el).empty(); // Clear existing list in el.

    var els = [];

    this.collection.each(function(model) {
      var view = new PhotoItemView({model: model});
      els.push(view.render().el);
    });

    $(this.el).append(els);
    return this;
  }
});

///////////////////////////////////////////////////////////////
//  Router
///////////////////////////////////////////////////////////////
var PhotoList = Backbone.Router.extend({
  initialize : function(){
    photoListView = new PhotoListView({collection: gallery});
  },

  routes : {
    "" : "index"
  },

  index : function(){
    photoListView.render();
  }
});


///////////////////////////////////////////////////////////////
//  Init
///////////////////////////////////////////////////////////////
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

$(function(){
  var app = new PhotoList;

  console.log('gallery.length ' + gallery.length);
  console.log('localStorage.length ' + localStorage.length);

///////////////////////////////////////////////////////////////
//  Masonry
///////////////////////////////////////////////////////////////
/*
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
*/
});