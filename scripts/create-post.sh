#/bin/bash

now=$(date +"%Y_%m_%d")

post_dir=../_posts/

fileName=${now}_backup_.markdown

echo ${post_dir}$fileName

touch ${post_dir}$fileName

if [ ! -d "$post_dir" ]; then
	mkdir $post_dir
fi

yearmonth=`date "+%Y/%m"`
postdate=`date "+%Y-%m-%d"`
jekylldate=`date "+%Y-%m-%d"`
read -p "Enter the post name: " post_variable;

cat <<EOF > /Users/TJ/Desktop/foobar.com/_posts/$yearmonth/$postdate-$post_variable.markdown
---
layout: post
date: $jekylldate
title: $post_variable
excerpt:
---
EOF