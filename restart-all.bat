@echo off
echo Stopping any running Node.js processes...
taskkill /f /im node.exe

echo Starting frontend development server...
start cmd /k "cd %~dp0 && npm run dev"

echo Starting backend server...
start cmd /k "cd %~dp0 && npm run server"

echo All servers started!
