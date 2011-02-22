AppView = Backbone.View.extend({
	el: $("body"),
	initialize: function () {
		this.user = new User( null, { view: this });
		
		this.scan = new Scan( null, { view: this });
		
		// setup websocket
		this.socket = new io.Socket('localhost', { port: 3000 });
		this.socket.connect();
		
		// setup drawing canvas
		this.canvas = $('#drawing').dom[0];
		this.context = this.canvas.getContext("2d");
		this.color = {
			r: this.randomNumber(255),
			g: this.randomNumber(255),
			b: this.randomNumber(255)
		};
	},
	events: {
		"mousedown #drawing": "startLine",
		"mousemove #drawing": "drawLine",
		"mouseup #drawing": "endLine"
	},
	startLine: function(event) {
		this.isDrawing = true;
		this.context.beginPath();
		this.context.strokeStyle = "rgba("+this.color.r+","+this.color.g+","+this.color.b+",1)";
		this.context.lineJoin = "round";
		this.context.lineWidth = 6;
		this.context.moveTo(event.clientX-this.canvas.offsetLeft, event.clientY-this.canvas.offsetTop);
	},
	drawLine: function(event) {
		if(this.isDrawing) {
			this.context.lineTo(event.clientX-this.canvas.offsetLeft, event.clientY-this.canvas.offsetTop);
			this.context.stroke();
		}
	},
	endLine: function() {
		this.isDrawing = false;
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
	randomNumber: function(num) {
		return Math.floor(Math.random() * num);
	}
});
