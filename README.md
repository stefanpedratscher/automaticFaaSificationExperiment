# automaticFaaSificationExperiment (X2Faas)

This is the hybrid app produced by X2Faas. 

### Setup

```sh
cd automaticFaaSificationExperiment
npm install # make sure to run this
```

##### Deploy Lambda

Deploy `lambdas/fraction` with the name `fraction`. (Just zip the folder and upload it)

##### Set region in monolith

If your region isn't `us-east-2`, go into `nqueens.js` and change that line.

### Run

Everything works like with the normal monolith:

```
./workflow.sh NUMQUEENS NUMWORKERS PATHTOENTRY
```

### Example

```
$ ./workflow 9 4 ./nqueens.js

Starting worker 0 (from=0, to=96855122)... (INVOKES LAMBDA)
Starting worker 1 (from=96855122, to=193710244)... (INVOKES LAMBDA)
Starting worker 2 (from=193710244, to=290565366)... (INVOKES LAMBDA)
Starting worker 3 (from=290565366, to=387420489)... (INVOKES LAMBDA)
Waiting for all workers...
Found solutions: 352
```
