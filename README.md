# automaticFaaSificationExperiment

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
