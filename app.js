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

const onUpdate = name => {
  if (typeof name !== 'string') return;
  const beacon = beacons.find(beacon => name.includes(beacon.name));
  if (!beacon) return;
  beacon.lastSeen = Date.now();
};

const onArrival = async name => {
  console.log(`${name} has arrived home`);
  if (!process.env.ON_ARRIVAL_URL) return;
  const response = await axios.get(process.env.ON_ARRIVAL_URL);
  console.log(response.data);
};

const onLeave = async name => {
  console.log(`${name} has left home`);
  if (!process.env.ON_LEAVE_URL) return;
  const response = await axios.get(process.env.ON_LEAVE_URL);
  console.log(response.data);
};

const beacons = generateBeacons();

noble.on('discover', function(peripheral) {
  onUpdate(peripheral.advertisement.localName);
});

noble.startScanning([], true);

setInterval(() => {
  beacons.forEach(beacon => {
    if (beacon.lastSeen <= Date.now() - gracePeriod && beacon.isPresent) {
      beacon.isPresent = false;
      onLeave(beacon.name);
    } else if (beacon.lastSeen >= Date.now() - gracePeriod && !beacon.isPresent) {
        beacon.isPresent = true;
        onArrival(beacon.name);
      }
  })
}, process.env.CHECK_INTERVAL || 5000);
