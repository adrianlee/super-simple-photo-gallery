(function ($) {
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


  var Item = Backbone.Model.extend({
    defaults: {
      src: '',
      path: '',
	  favourite: false,
	  views: 0
    }
  });
  
  var List = Backbone.Collection.extend({
    model: Item,
	//localStorage: new Store("items")
	addItem: function(src) {
	  // Check if item already exists
	  this.find(function(x) {
	    if (x.get('src') == src) {
          console.log('Exists');
		} else {
		  console.log('Doesn\'t Exist');
	    }
	  });
	}
  });

  var ListView = Backbone.View.extend({
    el: $('#container'),
	// The DOM events specific to an item
	events: {
      
    },
	// Listens for changes to its model, re-rendering.
    initialize: function () {
      _.bindAll(this, 'render', 'appendItem');
	  
	  this.collection = new List();
	  
	  // Event
	  this.collection.bind('add', this.appendItem);
	  
	  // Get current list if images from BB and check if exists. If image doesn't exist, then make model and add to collection
	  _.each(list, function(x) {
	    console.log('Adding ' + x + ' to collection');
	    this.collection.addItem(x);
	  });
	  
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
      $('ul', this.el).append("<li>"+"<img class='box col' src='"+item.get('src')+"' /></li>");
    }
  });
  
  var listView = new ListView();
})(jQuery);