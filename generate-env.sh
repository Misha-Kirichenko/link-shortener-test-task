#!/bin/bash

# Get host IP bash command
HOST_IP=$(hostname -I | awk '{print $1}')
cp example.env .env
echo "HOST=http://$HOST_IP" >> .env
echo ".env generated based on example.env с HOST=$HOST_IP"
