#!/bin/bash

# Check if the first argument is provided, otherwise default to "react-project"
PROJECT_NAME=${1:-react-project}

# Clone the repository to the current directory
git clone https://github.com/camc8/React-TS-Tailwind-Vite-template

# Rename the cloned repository folder to the project name
mv React-TS-Tailwind-Vite-template $PROJECT_NAME

# Change directory into the new project folder
cd $PROJECT_NAME

# Install dependencies
npm install

# Run the development server in the background and capture the PID
npm run dev &
DEV_PID=$!

# Function to check if localhost:5173 is up
function check_server {
  until $(curl --output /dev/null --silent --head --fail http://localhost:5173); do
    printf '.'
    sleep 1
  done
}

# Check if the server is up and running
echo "Waiting for the server to start..."
check_server

# Once the server is running, open the default web browser
open http://localhost:5173

# Open VSCode in the current directory
code .
code ./src/App.tsx -r

# Optionally, wait for user input to stop the development server
read -p "Press Enter to stop the development server..."

# Kill the background npm run dev process and any child processes
kill $DEV_PID

# If the process is still running, use killall as a backup
if ps -p $DEV_PID > /dev/null
then
   killall -9 node
fi
