# fuse_sensors_example
## adding some fuse features like sensors on devices
```javascript
var Sensor = require("FuseJS/Sensor")
Sensor.on('changed', function(data) {
    switch (data.type) {
        case Sensor.BATTERY:
            console.log("Battery level : " + data.level);
            console.log("Battery state : " + data.state); // possible values : charging, unplug, full, not charging, unknown
            break;
        case Sensor.CONNECTION_STATE:
            console.log("connection state : " + data.state); // boolan value : true connected, false disconnected
            console.log("connection state string : " + data.stateString); // possible values : 'connected' or 'disconnected'
            break;
    }
});

function startMonitoringState() {
    Sensor.startListening(Sensor.BATTERY);
    Sensor.startListening(Sensor.CONNECTION_STATE);
}

function stopLMenitoringState() {
    Sensor.stopListening(Sensor.BATTERY);
    Sensor.stopListening(Sensor.CONNECTION_STATE);
}
```
