# Description
A simple handler for otherwise unhandled exceptions and signals in node

# Usage
### Install
```bash
npm i @bryandollery/errors-and-signals
```

### Import
```bash
import { errors-and-signals } from "@bryandollery/errors-and-signals";
```

### Configure
```javascript
const ctx = "myappname";

errorsAndSignals(async () => {
  await producer.disconnect();
}, ctx);
```

The first parameter is a handler for freeing resources, the second optional paramemter is a context used for logging. Output logs are json strings mostly at the INFO or ERROR levels.

# Notes
The errors and signals handled by this library are defined by:

```javascript
const errorTypes = ["unhandledRejection", "uncaughtException"];
const signalTraps = ["SIGTERM", "SIGINT", "SIGUSR2"];
```
