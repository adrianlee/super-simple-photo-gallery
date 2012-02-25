///////////////////////////////////////////////////////////////
//  Model
///////////////////////////////////////////////////////////////
var Photo = Backbone.Model.extend({
  defaults: {
    src: 'http://placekitten.com/200/300',
    view: 0,
    fav: false
  },

  toggleFav: function() {
    var toggle = !this.get('fav');
    this.set('fav', toggle);
    console.log(this.get('fav'));
    this.save();
  },

  incrView: function() {
    var i = this.get('view') + 1;
    this.set('view', i);
    console.log(this.get('view'));
    this.save();
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
  tagName: "div",

  className: "box col",

  initialize: function () {
    this.template = _.template($('#photo-template').html());
    _.bindAll(this, "render");
    // this.model.bind("change:fav", this.toggleFav);
  },

  events: {
    "click a" : "open",
    "dblclick a" : "fav" 
  },

  render: function() {
    var content = this.template(this.model.toJSON());
    $(this.el).html(content);
    return this;
  },

  open: function() {
    console.log($(this.el).removeClass('col').addClass('col2'));
    $('#container').masonry('reload');
    this.model.incrView();
  },

  fav: function() {
    this.model.toggleFav();
  }
});

///////////////////////////////////////////////////////////////
//  Photo List View
///////////////////////////////////////////////////////////////
var PhotoListView = Backbone.View.extend({
  el: '#container',

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
    //console.log(els);
    return this;
  }
});

///////////////////////////////////////////////////////////////
//  Photo Most Viewed List View
///////////////////////////////////////////////////////////////
var MostViewedView = Backbone.View.extend({
  el: '#container',

  initialize: function() {
    _.bindAll(this, "render");
    this.collection.bind("add", this.render);
    this.collection.bind("remove", this.render);
  },
  
  render: function() {
    $(this.el).empty(); // Clear existing list in el.

    var els = [];

    var sortedList = this.collection.sortBy(function(model) {
      return model.get('view');
    });

    _.each(sortedList.reverse(), function(model) {
      var view = new PhotoItemView({model: model});
      els.push(view.render().el);
    });

    $(this.el).append(els);
    //console.log(els);
    return this;
  }
});

///////////////////////////////////////////////////////////////
//  Photo Favourite List View
///////////////////////////////////////////////////////////////
var FavouriteView = Backbone.View.extend({
  el: '#container',

  events: {
    "click a": "say"
  },

  initialize: function() {
    _.bindAll(this, "render");
    this.collection.bind("add", this.render);
    this.collection.bind("remove", this.render);
  },
  
  render: function() {
    $(this.el).empty(); // Clear existing list in el.

    var els = [];

    var favList = this.collection.filter(function(model) {
      return model.get('fav');
    });

    _.each(favList, function(model) {
      var view = new PhotoItemView({model: model});
      els.push(view.render().el);
    });

    $(this.el).append(els);
    //console.log(els);
    return this;
  },

  say: function(e) {
    console.log(e);
  }
});


///////////////////////////////////////////////////////////////
//  Router
///////////////////////////////////////////////////////////////
var PhotoList = Backbone.Router.extend({
  initialize : function(){
    gallery.fetch();

    _.each(list, function(x) {
      var exist = gallery.any(function (model) {
        return model.get('src') == x.src;
      });

      if (!exist) {
        console.log('Adding to collection: ' + x.src);
        gallery.create(x);
      }
    });

    photoListView = new PhotoListView({collection: gallery});
    mostViewedView = new MostViewedView({collection: gallery});
    favouriteView = new FavouriteView({collection: gallery});

  },

  routes : {
    "" : "index",
    "most" : "mostViewed",
    "fav" : "favouriteView"
  },

  index : function(){
    console.log('View: Index');
    photoListView.render();
    $('#container').masonry('reload');
  },

  mostViewed: function() {
    console.log('View: Most Viewed');
    mostViewedView.render();
    $('#container').masonry('reload');
  },

  favouriteView: function() {
    console.log('View: Favourite');
    favouriteView.render();
    $('#container').masonry('reload');
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
  Backbone.history.start();
  console.log('gallery.length ' + gallery.length);
  console.log('localStorage.length ' + localStorage.length);

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
    isAnimated: true,
    itemSelector : '.box',
    columnWidth: function( containerWidth ) {
      $('.col').css('width', (containerWidth / 5)-4);
      $('div.col > img').css('width', (containerWidth / 5)-4);
      $('.col2').css('width', (containerWidth / 5)*2-4);
      $('div.col2 > a > img').css('width', (containerWidth / 5)*2-4);
      return containerWidth / 5;
    }
  });

  $container.imagesLoaded( function(){
    $container.masonry({
      isAnimated: true,
      itemSelector : '.box',
      columnWidth: function( containerWidth ) {
        $('.col').css('width', (containerWidth / 5)-4);
        $('div.col > img').css('width', (containerWidth / 5)-4);
        $('.col2').css('width', (containerWidth / 5)*2-4);
        $('div.col2 > a > img').css('width', (containerWidth / 5)*2-4);
        return containerWidth / 5;
      }
    });
  });

});