connect = require 'connect'
http = require 'http'
server = connect.createServer()

server.listen 3000
socket = require './socket'
socket.bootSOCKET server