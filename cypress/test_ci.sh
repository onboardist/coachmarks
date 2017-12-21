#!/usr/bin/env bash

DEV=1 npm run build &
PID=$!
wait-on http://localhost:10002

if [ -z $CI ]
then
  npm run test:record
else
  npm run test
fi

kill $PID
