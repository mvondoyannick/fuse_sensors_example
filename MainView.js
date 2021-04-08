var Observable = require('FuseJS/Observable');
var Sensor = require('FuseJS/Sensor'); 
var Alerts = require('FuseJS/Alerts'); 
var LocalNotify = require("FuseJS/LocalNotifications");
var network = Observable();
var battery = Observable();
var batteryState = Observable();
var bgColor = Observable('#FFF');
var txtColor = Observable('#000');
var isNight = Observable(false);

LocalNotify.on("receivedMessage", function(payload) {
  console.log("Received Local Notification: " + payload);
  router.push('payLoad', payload);
  LocalNotify.clearAllNotifications();
});

Sensor.on('changed', function(data) {
  switch (data.type) {
    case Sensor.BATTERY:
      console.log("Battery level : " + data.level);
      battery.value = data.level;
      batteryState.value = data.state;
      if (battery.value  <= 34 ){
      	bgColor.value = "#000";
      	txtColor.value = "#FFF";
      	isNight.value = true;
      }
      console.log("Battery state : " + data.state); // possible values : charging, unplug, full, not charging, unknown
      LocalNotify.later(4, "Battery status!", "Battery state : "+data.state, "hmm?", true);
      break;
  case Sensor.CONNECTION_STATE:
      console.log("connection state : " + data.state); // boolan value : true connected, false disconnected
      network.value = data.stateString;
      console.log("connection state string : " + data.stateString); // possible values : 'connected' or 'disconnected'
      LocalNotify.later(4, "Battery status!", "Battery state : "+data.stateString, "hmm?", true);
      break;
    }
});

function startMonitoringState() {
  /*Alerts.alert('Sensor activation','Activation des sensors mobiles', 'confirmer');*/
  Sensor.startListening(Sensor.BATTERY);
  Sensor.startListening(Sensor.CONNECTION_STATE);
}

function stopLMenitoringState() {
	/*Alerts.alert('Sensor desactivation','Désactivation des sensors mobiles', 'Désactiver');*/
    Sensor.stopListening(Sensor.BATTERY);
    Sensor.stopListening(Sensor.CONNECTION_STATE);
}

startMonitoringState();

module.exports = {
	startMonitoringState: startMonitoringState,
	stopLMenitoringState: stopLMenitoringState,
	battery: battery,
	network: network,
	bgColor: bgColor,
	txtColor: txtColor,
	isNight: isNight,
	batteryState: batteryState
};
