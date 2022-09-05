#!/bin/bash
# A bash script help me to easily create folder/file/initialMessage for my personal website

echo "Note title is：$1";

title=$1
currentDate=$(date '+%Y-%m-%d')

filename="${title// /-}"
foldername="$currentDate-$filename"

echo "Folder name is: $foldername"
echo "File name is: $filename"

echo "Create folder"
mkdir "./trips/$foldername"

file="./trips/$foldername/index.md"

echo "Create index.md file"
touch $file

echo "Add title text in it"
echo "---
slug: '/trips/$filename'
start: '$currentDate'
end:
place: '$title'
level: 'City'
province:
country: 'United Kingdom'
lon:
lat:
type: 'Travel'
abstract: ''
---
" >>  $file