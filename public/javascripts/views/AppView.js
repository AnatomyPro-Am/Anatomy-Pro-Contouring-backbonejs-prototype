AppView = Backbone.View.extend({
	el: $("body"),
	initialize: function () {
		this.friends = new Friends( null, { view: this });
		this.socket = new io.Socket('localhost', { port: 3000 });
		this.socket.connect();
	},
	events: {
		"click #add-friend": "addFriend",
		"click #get-friend": "getFriend"
	},
	addFriend: function () {
		var friend = new Friend({
			name: $('#name').attr('value')
		});
		this.friends.add(friend);
		this.socket.send({
			event: 'addFriend',
			data: friend
		});
	},
	getFriend: function() {
		this.socket.send({
			event: 'getFriend'
		});
	},
	addFriendToView: function (model) {
		$("#friends-list").append(ich.friend(model.toJSON()));
	},
	showError: function(model, error) {
		// not working
		console.log(error);
	}
});
