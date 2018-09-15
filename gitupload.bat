@echo off

python updateloc.py U

git add .
git commit -m %1
git push origin v3

python updateloc.py L