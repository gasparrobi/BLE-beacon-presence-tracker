1. `npm install`
2. `npm start`

***

`.env` example:

```
BEACONS_TO_TRACK=beacon1,beacon2
GRACE_PERIOD=10000
CHECK_INTERVAL=5000
```

`BEACONS_TO_TRACK`: used for identifying beacons by name: `peripheral.advertisement.localName`

`GRACE_PERIOD`: the amount of time after presence is set to away in milliseconds

`CHECK_INTERVAL`: interval for presence checking
