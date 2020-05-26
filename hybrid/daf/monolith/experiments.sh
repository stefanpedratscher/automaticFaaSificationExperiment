echo "$1 workers"
{ time ./workflow.sh 9 $1 nqueens.js; } &> ../../../results/hybrid/x2f/$1_workers_0.log
{ time ./workflow.sh 9 $1 nqueens.js; } &> ../../../results/hybrid/x2f/$1_workers_1.log
{ time ./workflow.sh 9 $1 nqueens.js; } &> ../../../results/hybrid/x2f/$1_workers_2.log
{ time ./workflow.sh 9 $1 nqueens.js; } &> ../../../results/hybrid/x2f/$1_workers_3.log
{ time ./workflow.sh 9 $1 nqueens.js; } &> ../../../results/hybrid/x2f/$1_workers_4.log
{ time ./workflow.sh 9 $1 nqueens.js; } &> ../../../results/hybrid/x2f/$1_workers_5.log
