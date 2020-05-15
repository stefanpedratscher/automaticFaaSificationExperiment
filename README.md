# FaaSification of a Monolithic Application (nqueens)

### Structure

```
.
├── hybrid                      # hybrid approach using FaaS and local execution
│   ├── n2f                     # node2FaaS
│   │   ├── lambdas             # generated by n2f and manual adapted lambdas
│   │   ├── monolith            # monolithic application
│   │   │   ├── nqueensMod.js   # modified nqueens to port fraction with n2f
│   │   │   └── ...
│   │   ├── n2f.log             # execution logs of n2f              
│   │   └── ...
│   └── x2f                     # x2FaaS
│   │   ├── lambdas             # generated lambda by x2f 
│   │   ├── monolith            # monolithic application
│   │   └── ...
├── monolith                    # local execution
│   ├── experiments.sh          # to run the experiment for X workers
│   ├── external.js             # contains an external function
│   ├── nqueens.js              # implementation of nqueens fraction
│   ├── workflow.sh             # to run the workflow (nqueens)
│   └── ...
├── results                     # all experimental results
└── ...
```

### Setup

```sh
cd automaticFaaSificationExperiment
npm install
```

### Usage

```
./workflow.sh NUMQUEENS NUMWORKERS PATHTOENTRY
```

### Example

```
$ ./workflow 9 4 ./nqueens.js

Starting worker 0 (from=0, to=96855122)...
Starting worker 1 (from=96855122, to=193710244)...
Starting worker 2 (from=193710244, to=290565366)...
Starting worker 3 (from=290565366, to=387420489)...
Waiting for all workers...
Found solutions: 352
```

## Experimental results

All experimental results are in the **/results** folder.

- **AWS region:** eu-central-1
- **Lambda memory assignment:** 256MB
- **Local execution:** AWS ec2 t2.micro instance
- [n2f.log](hybrid/n2f/n2f.log) shows that fractionMod and acceptable is ported to Faas, while fraction is not eligible for conversion according to n2f. 

<!--  
In order to make ``acceptable`` work after porting to FaaS from n2f, we had to change as follows:
- Introduce a ``result`` variable.
- Remove other return values (n2f only removes first return statement) by setting ``result`` accordingly.
- Upload the lodash module manually and ``require`` it
-->
-----------------

After porting ``fractionMod`` with ``node2Faas``, the following runtime errors are produced:

- due to missing ``const _ = require("lodash")`` package:  
````
{
       "errorType": "ReferenceError",
       "errorMessage": "_ is not defined",
       "trace": [
         "ReferenceError: _ is not defined",
         "    at Runtime.exports.fractionMod [as handler] (/var/task/fractionMod.js:9:25)",
         "    at Runtime.handleOnce (/var/runtime/Runtime.js:66:25)"
   ]
 }
 ````
 and after adding ``const _ = require("lodash")``:
 ````
 {
   "errorType": "Runtime.ImportModuleError",
   "errorMessage": "Error: Cannot find module 'lodash'",
   "trace": [
     "Runtime.ImportModuleError: Error: Cannot find module 'lodash'",
     "    at _loadUserApp (/var/runtime/UserFunction.js:100:13)",
     "    at Object.module.exports.load (/var/runtime/UserFunction.js:140:17)",
     "    at Object.<anonymous> (/var/runtime/index.js:45:30)",
     "    at Module._compile (internal/modules/cjs/loader.js:778:30)",
     "    at Object.Module._extensions..js (internal/modules/cjs/loader.js:789:10)",
     "    at Module.load (internal/modules/cjs/loader.js:653:32)",
     "    at tryModuleLoad (internal/modules/cjs/loader.js:593:12)",
     "    at Function.Module._load (internal/modules/cjs/loader.js:585:3)",
     "    at Function.Module.runMain (internal/modules/cjs/loader.js:831:12)",
     "    at startup (internal/bootstrap/node.js:283:19)"
   ]
 }
 ````
 
 - due to missing ``const external = require("./external.js")``
 ````
 {
   "errorType": "ReferenceError",
   "errorMessage": "external is not defined",
   "trace": [
     "ReferenceError: external is not defined",
     "    at Runtime.exports.fractionMod [as handler] (/var/task/fractionMod.js:14:3)",
     "    at Runtime.handleOnce (/var/runtime/Runtime.js:66:25)"
   ]
 }
 ````
 and after adding ``const external = require("./external.js")``: 
 ````
 {
   "errorType": "Runtime.ImportModuleError",
   "errorMessage": "Error: Cannot find module './external.js'",
   "trace": [
     "Runtime.ImportModuleError: Error: Cannot find module './external.js'",
     "    at _loadUserApp (/var/runtime/UserFunction.js:100:13)",
     "    at Object.module.exports.load (/var/runtime/UserFunction.js:140:17)",
     "    at Object.<anonymous> (/var/runtime/index.js:45:30)",
     "    at Module._compile (internal/modules/cjs/loader.js:778:30)",
     "    at Object.Module._extensions..js (internal/modules/cjs/loader.js:789:10)",
     "    at Module.load (internal/modules/cjs/loader.js:653:32)",
     "    at tryModuleLoad (internal/modules/cjs/loader.js:593:12)",
     "    at Function.Module._load (internal/modules/cjs/loader.js:585:3)",
     "    at Function.Module.runMain (internal/modules/cjs/loader.js:831:12)",
     "    at startup (internal/bootstrap/node.js:283:19)"
   ]
 }
 ````
 
- due to missing ``result``:
````
{
  "errorType": "ReferenceError",
  "errorMessage": "result is not defined",
  "trace": [
    "ReferenceError: result is not defined",
    "    at Runtime.exports.fractionMod [as handler] (/var/task/fractionMod.js:47:13)",
    "    at Runtime.handleOnce (/var/runtime/Runtime.js:66:25)"
  ]
}
````