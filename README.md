## cw google sheet
+ url
  + https://docs.google.com/spreadsheets/d/1FCsRfXOJR61vmQydx2HEwCuuHeLH5u2DcJMWGlH-lyw/edit?usp=sharing
+ api-key
  + AIzaSyDxHVlYojwDk-Ge8Rf6TbyLoNsTgd43_jE

## for cw testing
```
npm run build:test
rm -rf temp/testing && mkdir -p temp/testing
cp -r dist ./temp/testing/2024newtaipeiriver
cd temp/testing && zip -r 2024newtaipeiriver.zip 2024newtaipeiriver/*
```

## for cw production
```
npm run build:production
rm -rf temp/production && mkdir -p temp/production
cp -r dist ./temp/production/2024newtaipeiriver
cd temp/production && zip -r 2024newtaipeiriver.zip 2024newtaipeiriver/*
```