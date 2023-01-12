
console.time('Time');

console.log('asfasdf');

// const fileName = 'message.txt';
import { createReadStream } from 'node:fs';

// const fs = require('fs');
// const readline = require('readline');
// import { readline } from 'node:readline';
import * as readline from 'node:readline';

export default function testFirstLine(fileName) {
  const rl = readline.createInterface({
    input: createReadStream(fileName),
    // crlfDelay: Infinity,
  });

  let count = 0;
  rl.on('line', (line) => {
    console.log('line: ', line, count++);
    rl.close();
  });

  rl.on('close', function() {
     console.log('closed');
  });

  // await new Promise((res) => rl.once('close', res));

  console.log(`Used ${process.memoryUsage().heapUsed / 1024 / 1024} MB`);
  console.timeEnd('Time');
};