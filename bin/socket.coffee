io = require('socket.io')
_ = require('underscore')._
redis = require('redis')

exports.bootSOCKET = (app) ->
	socket = io.listen app
	socket.on 'connection', (client) =>
		rd = redis.createClient()
		client.on 'message', (data) =>
			try
				if not _.isString data
					obj = data
				else
					obj = JSON.parse data
			catch error
				console.log error
			if not _.isUndefined obj
				switch obj.event
					when "set"
						rd.set 'dvanleeuwen15:image1', obj.data.name, redis.print
					
		client.on 'disconnect', () =>
			rd.quit();
			## do something