@echo off

REM Récupérer la version indiqu"ée dans package.json à version=
for /f "tokens=2 delims=:" %%a in ('findstr /c:"\"version\":" package.json') do (
    set CURRENT_VERSION=%%a
    goto :next
)

REM essaye de push, si cela retourne comme quoi il n'y a pas de changement, alors on ne fait rien sinon ajoute 1 à la version
:next
git add .
git commit -m "update version to %CURRENT_VERSION%"
git push
