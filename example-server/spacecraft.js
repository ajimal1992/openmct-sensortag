/*
 Spacecraft.js simulates a small spacecraft generating telemetry.
*/
const randomFloat = require('random-float');

function Spacecraft() {
    this.state = {
        "prop.amb_temp": 0,
        "prop.barometer": 0,
        "prop.light": 0,
        "prop.ir_temp": 0,
        "prop.humidity": 0
    };
    this.history = {};
    this.listeners = [];
    Object.keys(this.state).forEach(function (k) {
        this.history[k] = [];
    }, this);


    var app = require('express')();
    var http = require('http').createServer(app);
    var io = require('socket.io')(http);

    http.listen(3000, function(){
        console.log('listening on *:3000');
    });

    io.on('connection', function(socket){
        console.log('a user connected');

        // sio.emit("amb_temp", sensor_data['temp'][0])
		// sio.emit("barometer", sensor_data['pressure'])
		// sio.emit("light", sensor_data['light'])
		// sio.emit("ir_temp", sensor_data['temp'][1])
        // sio.emit("humidity", sensor_data['humidity'][1])
        
        socket.on('test message', function(msg){
            console.log(msg);
        })

        socket.on('barometer' , function(msg){
            console.log(msg);
            this.state["prop.barometer"] = msg
        })
    });

    setInterval(function () {
        this.updateState();
        this.generateTelemetry();
    }.bind(this), 500);

    // console.log("Example spacecraft launched!");
    // console.log("Press Enter to toggle thruster state.");

    // process.stdin.on('data', function () {
    //     this.state['prop.thrusters'] =
    //         (this.state['prop.thrusters'] === "OFF") ? "ON" : "OFF";
    //     this.state['comms.recd'] += 32;
    //     console.log("Thrusters " + this.state["prop.thrusters"]);
    //     this.generateTelemetry();
    // }.bind(this));
};

Spacecraft.prototype.updateState = function () {
    this.state["prop.amb_temp"] = 30.0 + randomFloat(-8, 8);
    this.state["prop.light"] = 600 + randomFloat(-150, 150);
    this.state["prop.ir_temp"] = 30.0 + randomFloat(-8, 8);
    this.state["prop.barometer"] = 1013 + randomFloat(-2, 8);
    this.state["prop.humidity"] = 25 + randomFloat(-4, 4);
};

/**
 * Takes a measurement of spacecraft state, stores in history, and notifies 
 * listeners.
 */
Spacecraft.prototype.generateTelemetry = function () {
    var timestamp = Date.now(), sent = 0;
    Object.keys(this.state).forEach(function (id) {
        var state = { timestamp: timestamp, value: this.state[id], id: id};
        this.notify(state);
        this.history[id].push(state);
    }, this);
};

Spacecraft.prototype.notify = function (point) {
    this.listeners.forEach(function (l) {
        l(point);
    });
};

Spacecraft.prototype.listen = function (listener) {
    this.listeners.push(listener);
    return function () {
        this.listeners = this.listeners.filter(function (l) {
            return l !== listener;
        });
    }.bind(this);
};

module.exports = function () {
    return new Spacecraft()
};