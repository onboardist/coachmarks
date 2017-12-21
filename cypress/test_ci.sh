#!/usr/bin/env bash

DEV=1 npm run build &
PID=$!
wait-on http://localhost:10002
npm run test
kill $PID
