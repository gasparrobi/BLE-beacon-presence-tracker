const noble = require('@abandonware/noble');
const axios = require('axios');
require('dotenv').config();

const gracePeriod = process.env.GRACE_PERIOD || 10000;
const generateBeacons = () => {
  const beaconNames = process.env.BEACONS_TO_TRACK.split(',') || ['beacon2'];  
  
  return beaconNames.map(name => {
    return {
      name,
      lastSeen: Date.now(),
      isPresent: false
      };
  });
};

const beacons = generateBeacons();

noble.on('discover', function(peripheral) {
  onUpdate(peripheral.advertisement.localName);
});

noble.startScanning([], true);

const onUpdate = name => {
  if (typeof name !== 'string') return;
  const beacon = beacons.find(beacon => name.includes(beacon.name));
  if (!beacon) return;
  beacon.lastSeen = Date.now();
}

setInterval(() => {
  beacons.forEach(beacon => {
    if (beacon.lastSeen <= Date.now() - gracePeriod && beacon.isPresent) {
      console.log(`${beacon.name} has left home`);
      beacon.isPresent = false;
      console.log(beacon);
      // todo home-assistant api
    } else if (beacon.lastSeen >= Date.now() - gracePeriod && !beacon.isPresent) {
        console.log(`${beacon.name} has arrived home`);
        beacon.isPresent = true;
        console.log(beacon);
        // todo call home-assistant api
      }
  })
}, process.env.CHECK_INTERVAL || 5000);
