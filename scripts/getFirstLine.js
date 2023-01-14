import { createReadStream } from "fs";
import { createInterface } from "readline";

async function readFirstLine(path) {
    const inputStream = createReadStream(path);
    try {
        for await (const line of createInterface(inputStream)) {
            // console.log('the line', line);
            return line;
        }
        return ''; // If the file is empty.
    }
    finally {
        inputStream.destroy(); // Destroy file stream.
    }
}

// const firstLine = await readFirstLine(path);
async function getFirst(fileName) {
    // console.log('get first is called');
    const fl = await readFirstLine(fileName);
    return (fl);
}

export { readFirstLine, getFirst };