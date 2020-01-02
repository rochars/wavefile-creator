
const assert = require('assert');
const fs = require("fs");
const WaveFile = require("../../../test/loader.js");
const path = "./test/files/";

describe('8-bit mu-Law from scratch', function() {
    //fs.readFileSync(path + "/8bit-mulaw-8kHz-noBext-mono-encoded.wav")

    let wav = new WaveFile();
    wav.fromScratch(1, 8000, '4', []);
    
});