#!/bin/sh

echo "Cron process starting"
cron -f -l 2
echo "Cron process ending"
