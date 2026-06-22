@echo off
echo =========================================
echo Pushing DNA Alignment App to GitHub...
echo =========================================

cd /d "%~dp0"

echo 1. Initializing Git repository...
git init

echo 2. Adding files...
git add .

echo 3. Committing files...
git commit -m "Initial commit: DNA Alignment App"

echo 4. Renaming branch to main...
git branch -M main

echo 5. Setting remote origin...
git remote add origin https://github.com/bakhtiyarov1ch/agabek111.git

echo 6. Pushing to GitHub...
git push -u origin main

echo =========================================
echo Done! Press any key to exit.
echo =========================================
pause
