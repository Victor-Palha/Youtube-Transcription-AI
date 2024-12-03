#!/bin/bash

# Set the current working directory
SERVER="$PWD/server"
CLIENT="$PWD/client"

# Function to start the server
start_service() {
    local service_name="$1"
    local service_path="$2"
    local command="$3"

    echo "Starting $service_name..."
    osascript -e "tell application \"Terminal\" to do script \"cd '$service_path' && $command\""
}

# Initialize the server
start_service "Server" "$SERVER" "npm install && npm run start"

# Initialize the client
start_service "Client" "$CLIENT" "npm install && npm run build && npm run preview"

echo "All services are running in separate Terminal windows."