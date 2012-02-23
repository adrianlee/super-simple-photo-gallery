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
      src: 'http://placekitten.com/200/300',
      view: 0,
      fav: false
    },

   //  initialize: function(){
    // console.log('this model has been initialized');
   //    this.bind("change:src", function(){
   //      var src = this.get("src"); 
   //      console.log('Image source updated to ' + src);
   //    });
   //    this.bind("error", function(model, error){
   //      console.log(error);
   //    });
   //  },
    
   //  changeSrc: function( source ){
   //    this.set({ src: source });
   //  },

   //  incView: function() {
   //    var i = this.get('view') + 1;
   //    this.set({ view: i });
   //  },

   //  toggleFav: function() {
   //    var o = !this.get('fav');
   //    this.set({ view: i });
   //  }
  });

///////////////////////////////////////////////////////////////
//  Collection
///////////////////////////////////////////////////////////////
  var PhotoCollection = Backbone.Collection.extend({
    model: Photo,
    localStorage: new Store("photos")
  });
  
  var Photos = new PhotoCollection;

///////////////////////////////////////////////////////////////
//  Photo View
///////////////////////////////////////////////////////////////
  var PhotoView = Backbone.View.extend({
    tagName:  "li",

    // className: "box",
    
    template: _.template($('#photo-template').html()),
    
    events: {
      "click a" : "open"
    },
    
    initialize: function() {
      this.model.bind('change', this.render, this);
      //this.model.bind('destroy', this.remove, this);
    },
    
    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      this.setText();
      return this;
    },

    setText: function() {
      console.log('set text');
    },
    
    remove: function() {
      console.log('remove');
    },
    
    open: function() {
      console.log('Hello World');
    }
  });
  
///////////////////////////////////////////////////////////////
//  App View
///////////////////////////////////////////////////////////////
  var AppView = Backbone.View.extend({
    el: $("#container"),

    // statsTemplate: _.template($('#stats-template').html()),

    events: {
    
    },
    
    initialize: function() {
      //this.input = this.$("#new-todo");

      Photos.bind('add',   this.addOne, this);
      Photos.bind('reset', this.addAll, this);
      Photos.bind('all',   this.render, this);

      Photos.fetch();
    },

    render: function() {
      // this.$('#stats').html(this.statsTemplate({
      //   collection: Photos.length,
      //   storage: localStorage.length
      // }));
    },

    addOne: function(photo) {
      console.log('addOne: ' + JSON.stringify(photo));
      //Photos.add(todo);
      var view = new PhotoView({model: photo});
      $("#photo-list").append(view.render().el);
    },

    addAll: function() {
      // Photos.each(this.addOne);
    }
  });
///////////////////////////////////////////////////////////////
//  Init
///////////////////////////////////////////////////////////////
  //Photos.add(list);
  _.each(list, function(x) {
    //
    // If Photo found already, dont create!
    //
    //Photos.create(x);
  });

  var App = new AppView;

  console.log('Photos.length ' + Photos.length);
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

});