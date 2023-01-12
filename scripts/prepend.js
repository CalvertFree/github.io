import { readFileSync, openSync, writeFileSync, writeSync, close } from 'node:fs';
import { format } from 'node:util';
import { ensureFile } from 'fs-extra';
import testFirstLine from './testFirstLine.js';
import { getFirst, readFirstLine } from './getFirstLine.js';
import { DateTime } from 'luxon';

function formatDate(date, formatStr) {
 const map = {
  mm: ('' + date.getMonth() + 1).padStart(2, "0"),
  dd: ('' + date.getDate()).padStart(2, "0"),
  y2: date.getFullYear().toString().slice(-2),
  yyyy: date.getFullYear()
 }

 return formatStr.replace(/mm|dd|y2|yyyy/gi, matched => map[matched])
}

const fileNameBase = 'message';
const today = new Date();
const fileDate = formatDate(today, 'yyyy_mm_dd');
const fileName = format(`%s_${fileNameBase}.markdown`, fileDate);

writeFileSync(fileName, '', 'utf8', 'a');
async function ensureFileElf(fileName) {
 try {
  await ensureFile(fileName)
  console.log('Await Success!')
 } catch (err) {
  console.error(err)
 }
}
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

const firstLine = await getFirst(fileName);

if (firstLine != '---') {
 const data = readFileSync(fileName)
 const fd = openSync(fileName, 'w+')
 const insert = Buffer.from(frontMatter);
 writeSync(fd, insert, 0, insert.length, 0)
 writeSync(fd, data, 0, data.length, insert.length)
 close(fd, (err) => {
  if (err) throw err;
 });
}

