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
        dd: ('' + date.getDay()).padStart(2, "0"),
        y2: date.getFullYear().toString().slice(-2),
        yyyy: date.getFullYear()
    }

    return formatStr.replace(/mm|dd|y2|yyyy/gi, matched => map[matched])
}

async function createPostDateFileName(fileNameBase, ensure) {
    // const fileNameBase = 'message01';
    console.log('fileNameBase', fileNameBase);

    const today = new Date();
    const fileDate = formatDate(today, 'yyyy-mm-dd');
    const fileName = format(`%s-${fileNameBase}.markdown`, fileDate);

    if (ensure) {
        await ensureFileElf(fileName)
    }

    console.log('filename  in createPostDateFileName:', fileName);

    const dt = DateTime.now();
    const placeHolder = format(`%s`,
        //dt.toLocaleString(DateTime.DATE_SHORT),
        //dt.toLocaleString(DateTime.TIME_24_WITH_SECONDS),
        dt.toFormat('yyyy-MM-dd hh:mm:ss ZZZ')
    );


    console.log(placeHolder);

    const frontMatter = format(`---
layout: post
date: %s
title: %s
---
`, placeHolder, fileNameBase);

    return { fileName, frontMatter }
}

export { createPostDateFileName };