1. `npm install`
2. `npm start`

**note that on raspberry pi the installation might need to be done with `--unsafe-perm` flags and with `sudo`**

**also note that on raspberry pi zero w the application has to be run with `sudo` otherwise noble will not be able to power on**

***

`.env` example:

```
BEACONS_TO_TRACK=beacon1,beacon2
GRACE_PERIOD=10000
CHECK_INTERVAL=5000
ON_ARRIVAL_URL=https://example.com/todos/1
ON_LEAVE_URL=https://example.com/todos/1
```

`BEACONS_TO_TRACK`: used for identifying beacons by name: `peripheral.advertisement.localName`

`GRACE_PERIOD`: the amount of time after presence is set to away in milliseconds

`CHECK_INTERVAL`: interval for presence checking

`ON_ARRIVAL_URL`: optional, url to call when beacon arrives

`ON_LEAVE_URL`: optional, url to call when beacon leaves
