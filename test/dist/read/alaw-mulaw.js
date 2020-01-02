
const assert = require('assert');
const fs = require("fs");
const WaveFile = require("../../../test/loader.js");
const path = "./test/files/";

describe('8-bit mu-Law to 16-bit (mu-Law encoded with WaveFile)', function() {
    let wav = new WaveFile(
        fs.readFileSync(path + "/8bit-mulaw-8kHz-noBext-mono-encoded.wav"));
});

describe('8-bit a-law to 8-bit mu-Law (a-law encoded with WaveFile)',
function() {
    let wav = new WaveFile(
        fs.readFileSync(path + "/8bit-alaw-8kHz-noBext-mono-encoded.wav"));
});
