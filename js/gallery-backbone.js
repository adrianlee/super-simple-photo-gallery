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
    return this.get('fav');
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
var tempPhotoItem;

var PhotoItemView = Backbone.View.extend({
  tagName: "div",

  className: "box col",

  initialize: function () {
    this.template = _.template($('#photo-template').html());
    _.bindAll(this, "render");
    // this.model.bind("change:fav", this.toggleFav);
  },

  events: {
    "click a.open" : "open",
    "click a.fav" : "fav" 
  },

  render: function() {
    var content = this.template(this.model.toJSON());
    $(this.el).html(content);
    return this;
  },

  open: function() {

    if ($(this.el).hasClass('opened')) {
      $(this.el).removeClass('opened');
      this.minimize($(this.el));
      $('#container').masonry('reload');
    } else {
      // Minimize previously opened images
      if (tempPhotoItem) {
        tempPhotoItem.removeClass('opened')
        this.minimize(tempPhotoItem);
      }

      // Maximize image
      $(this.el).addClass('opened');
      if (this.model.get('width')/this.model.get('height') <= 1.33) {
        // IF image height > width THEN append class col2
        $(this.el).removeClass('col').addClass('col2');
      } else {
        // IF image height < width THEN append class col3
        $(this.el).removeClass('col').addClass('col3');
      }
      
      tempPhotoItem = $(this.el);
      
      // Show image menu
      this.setFavIcon();
      $(this.el).children('.imgmenu').show()

      // Reload position
      $('#container').masonry('reload');

      // Scoll image to top
      var targetOffset = $(this.el).offset().top-42;
      $('html,body').animate({scrollTop: targetOffset}, 300);

      // Increment view counter
      this.model.incrView();
      $(this.el).children('.imgmenu').children('.view').text(this.model.get('view') + ' Views');
    }
  },

  minimize: function(el){
    el.opened = false;
    if (el.hasClass('col2')) {
      el.removeClass('col2').addClass('col');
    }
    if (el.hasClass('col3')) {
      el.removeClass('col3').addClass('col');
    }
    el.children(".imgmenu").hide()
  },

  fav: function() {
    if (!this.model.toggleFav()) {
      // hide item if in favourites view
      if (currentView == 'favourite'){
        $(this.el).remove();
      }
    }
    this.setFavIcon();
  },

  setFavIcon: function() {
    if (this.model.get('fav')) {
      $(this.el).children('.imgmenu').children('.fav').addClass('btn-success');
    } else {
      $(this.el).children('.imgmenu').children('.fav').removeClass('btn-success');
    }
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
    // "click a": "say"
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
    currentView = 'index';
    photoListView.render();
    $('#container').masonry('reload');
  },

  mostViewed: function() {
    console.log('View: Most Viewed');
    currentView = 'mostViewed';
    mostViewedView.render();
    $('#container').masonry('reload');
  },

  favouriteView: function() {
    console.log('View: Favourite');
    currentView = 'favourite';
    favouriteView.render();
    $('#container').masonry('reload');
  }
});


///////////////////////////////////////////////////////////////
//  Init
///////////////////////////////////////////////////////////////
var currentView;

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

  var $container = $('#container'),
      something;

  $(".box").hide();

  $(".box > a > img").hide()
  // .one("ready", function() {
  //   console.log($(this).height());
  //   $(this).parent().parent().css('height', $(this).height());
  // })
  .one("load", function () {
    $(this).parent().parent().fadeIn();
    $(this).fadeIn();

    // get image dimensions and save into db
    var image = gallery.get($(this).parent().children('.id').text());
    image.set('width', $(this).width());
    image.set('height', $(this).height());
    image.save();
  })
  .one("error", function() {
    var image = gallery.get($(this).parent().children('.id').text());
    image.destroy();
  });
  

  $container.masonry({
    isAnimated: false,
    itemSelector : '.box',
    columnWidth: function( containerWidth ) {
      $('.col').css('width', (containerWidth / 5)-4);
      $('div.col > a > img').css('width', (containerWidth / 5)-4);
      $('.col2').css('width', (containerWidth / 5)*2-4);
      $('div.col2 > a > img').css('width', (containerWidth / 5)*2-4);
      $('.col3').css('width', (containerWidth / 5)*3-4);
      $('div.col3 > a > img').css('width', (containerWidth / 5)*3-4);
      return containerWidth / 5;
    }
  });

  $container.imagesLoaded( function(){
    $container.masonry({
      isAnimated: false,
      itemSelector : '.box',
      columnWidth: function( containerWidth ) {
        $('.col').css('width', (containerWidth / 5)-4);
        $('div.col > a > img').css('width', (containerWidth / 5)-4);
        $('.col2').css('width', (containerWidth / 5)*2-4);
        $('div.col2 > a > img').css('width', (containerWidth / 5)*2-4);
        $('.col3').css('width', (containerWidth / 5)*3-4);
        $('div.col3 > a > img').css('width', (containerWidth / 5)*3-4);
        return containerWidth / 5;
      }
    });
  });

});