const fs = require('fs')
const path = require('path')
const { Duplex } = require('stream')


class MyDuplex extends Duplex {
    constructor() {
        super()
    }

    _write(chunk, encoding, callback) {
        this.push(chunk.toString().toUpperCase())
        callback()
    }
    _read(size) {
        this.push(null)
    }
}


const myDuplex = new MyDuplex()

myDuplex.on('data', chunk => {
    console.log(chunk.toString())
})

myDuplex.write('hello');
myDuplex.write('world');
myDuplex.end();