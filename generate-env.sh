#!/bin/bash
# Get host IP bash command
HOST_IP=$(hostname -I | awk '{print $1}')

cp example.env .env

if [ -s .env ] && [ "$(tail -c1 .env | wc -l)" -eq 0 ]; then
  echo >> .env
fi

echo "HOST=http://$HOST_IP" >> .env
echo ".env generated based on example.env с HOST=$HOST_IP"
