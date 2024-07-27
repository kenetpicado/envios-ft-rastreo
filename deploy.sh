#!/usr/bin/env sh

set -e

git add .
git commit -m "update"
git push

npm run build

# copiar CNAME
cp CNAME dist/

cd dist

git add .
git commit -m 'deploy'

git push -f git@github.com:kenetpicado/tracker.git master:gh-pages

cd -