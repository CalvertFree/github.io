import { ensureFile } from 'fs-extra';
import { DateTime } from 'luxon';
import { format } from 'node:util';

async function ensureFileElf(fileName) {
 try {
  await ensureFile(fileName)
  console.log('Await Success!')
 } catch (err) {
  console.error(err)
 }
}

function formatDate(date, formatStr) {
 const map = {
  mm: ('' + date.getMonth() + 1).padStart(2, "0"),
  dd: ('' + date.getDate()).padStart(2, "0"),
  y2: date.getFullYear().toString().slice(-2),
  yyyy: date.getFullYear()
 }

 return formatStr.replace(/mm|dd|y2|yyyy/gi, matched => map[matched])
}

const fileNameBase = 'message01';
const today = new Date();
const fileDate = formatDate(today, 'yyyy-mm-dd');
const fileName = format(`%s-${fileNameBase}.markdown`, fileDate);

ensureFileElf(fileName)

console.log('barDate:', fileName);

const dt = DateTime.now();
const placeHolder = format(`%s`,
 //dt.toLocaleString(DateTime.DATE_SHORT),
 //dt.toLocaleString(DateTime.TIME_24_WITH_SECONDS),
 dt.toFormat('yyyy-mm-dd hh:mm:ss ZZZ')
);


console.log(placeHolder);

const frontMatter = format(`---
layout: post
date: %s
title: %s
---
`, placeHolder, fileNameBase);

export { fileName, frontMatter };