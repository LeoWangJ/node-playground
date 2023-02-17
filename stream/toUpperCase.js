const path = require('path')
const stream = require('stream')
const fs = require('fs')

function upperCaseStream() {
    let chunkCount = 0
    let totalSize = 0

    const writeStream = fs.createWriteStream(path.resolve(__dirname, 'output.txt'))
    const readStream = fs.createReadStream(path.resolve(__dirname, 'readme.txt'))
    stream.pipeline(
        readStream,
        stream.Transform({
            transform(chunk, encoding, callback) {
                console.log("chunk:", chunk.toString())
                chunkCount++
                totalSize += chunk.length
                callback(null, chunk.toString().toUpperCase())
            },
            flush(callback) {
                console.log(`flush chunk count:${chunkCount}, total size: ${totalSize}`)
            }
        }),
        writeStream,
        (err) => {
            console.log(err)
        }
    )
}

upperCaseStream()