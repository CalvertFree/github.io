import { readFileSync, openSync, writeFileSync, writeSync, close, copyFileSync } from 'node:fs';
// import testFirstLine from './testFirstLine.js';
import { readOneDirectory } from 'walk-directories';
import { getFirst, readFirstLine } from './getFirstLine.js';
import { createPostDateFileName } from './constants.js';


async function createFileTest() {
    const { fileName, frontMatter } = await createPostDateFileName('message02', true);

    console.log('fileName', fileName);

    writeFileSync(fileName, '', 'utf8', 'a');
    const firstLine = await getFirst(fileName);
    return { fileName, firstLine, frontMatter }
}

const { fileName, firstLine, frontMatter } = await createFileTest();

function insertFrontMatter(fileName, frontMatter) {
    const data = readFileSync(fileName);
    const fd = openSync(fileName, 'w+');
    const insert = Buffer.from(frontMatter);
    writeSync(fd, insert, 0, insert.length, 0);
    writeSync(fd, data, 0, data.length, insert.length);
    close(fd, (err) => {
        if (err)
            throw err;
    });
}

if (firstLine != '---') {
    insertFrontMatter(fileName, frontMatter);

    async function runIsit322() {
        const isit322Path = `${process.env.HOME}/Git/github.io/Isit322/`;

        var dir = await readOneDirectory(isit322Path);

        for (let file of dir) {
            if (file.endsWith('.md') && file != 'Summary.md' && file != 'master-list.md') {

                console.log(file);
                const { fileName, frontMatter } = await createPostDateFileName(file, false);
                const src = isit322Path + file;
                const dest = `${process.env.HOME}/Git/github.io/_posts/isit322/` + fileName;
                copyFileSync(src, dest);
                insertFrontMatter(dest, frontMatter);
            }
        }
    }

    runIsit322();
}



