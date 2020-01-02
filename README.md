# wavefile-creator
Copyright (c) 2019 Rafael da Silva Rocha.  
https://github.com/rochars/wavefile-creator

[![NPM version](https://img.shields.io/npm/v/wavefile-creator.svg?style=for-the-badge)](https://www.npmjs.com/package/wavefile-creator) [![Docs](https://img.shields.io/badge/API-docs-blue.svg?style=for-the-badge)](https://rochars.github.io/wavefile-creator/docs)  
[![Codecov](https://img.shields.io/codecov/c/github/rochars/wavefile-creator.svg?style=flat-square)](https://codecov.io/gh/rochars/wavefile-creator) [![Unix Build](https://img.shields.io/travis/rochars/wavefile-creator.svg?style=flat-square)](https://travis-ci.org/rochars/wavefile-creator) [![Windows Build](https://img.shields.io/appveyor/ci/rochars/wavefile-creator.svg?style=flat-square&logo=appveyor)](https://ci.appveyor.com/project/rochars/wavefile-creator) [![Scrutinizer](https://img.shields.io/scrutinizer/g/rochars/wavefile-creator.svg?style=flat-square&logo=scrutinizer)](https://scrutinizer-ci.com/g/rochars/wavefile-creator/)

Create, read and write wav files.

## Install
```
npm install wavefile-creator
```

## Use

### Node
```javascript
const wavefileCreator = require('wavefile-creator');
let wav = new wavefileCreator.WaveFileCreator();
```
or 
```javascript
const WaveFileCreator = require('wavefile-creator').WaveFileCreator;
let wav = new WaveFileCreator();
```
or
```javascript
import { WaveFileCreator } from 'wavefile-creator';
let wav = new WaveFileCreator();
```

#### Node.js Example
```javascript
const WaveFileCreator = require('wavefile-creator').WaveFileCreator;

// Load a wav file buffer as a WaveFileCreator object
let wav = new WaveFileCreator();
wav.fromBuffer(buffer);

// Check some of the file properties
console.log(wav.container);
console.log(wav.chunkSize);
console.log(wav.fmt.chunkId);

// toBuffer() return a wav file buffer
// ready to be written to disk...
let theFile = wav.toBuffer();

// ...or to be loaded by another WaveFileCreator object
let wav2 = new WaveFileCreator(theFile);
```

### Browser
Use the **wavefile-creator.js** file in the *dist* folder:
```html
<script src="wavefile-creator.js"></script>
<script>
  var wav = new wavefileCreator.WaveFileCreator();
</script>
```

Or load it from the [jsDelivr](https://cdn.jsdelivr.net/npm/wavefile-creator) CDN:
```html
<script src="https://cdn.jsdelivr.net/npm/wavefile-creator"></script>
```

Or load it from [unpkg](https://unpkg.com/wavefile-creator):
```html
<script src="https://unpkg.com/wavefile-creator"></script>
```


### Create wave files from scratch
Use the ```fromScratch(numChannels, sampleRate, bitDepth, samples)``` method.

#### Mono:
```javascript
let wav = new WaveFile();

// Create a mono wave file, 44.1 kHz, 32-bit and 4 samples
wav.fromScratch(1, 44100, '32', [0, -2147483, 2147483, 4]);
fs.writeFileSync(path, wav.toBuffer());
```

#### Stereo:
Samples can be informed interleaved or de-interleaved. If they are de-interleaved, WaveFile will interleave them. In this example they are de-interleaved.
```javascript
// Stereo, 48 kHz, 8-bit, de-interleaved samples
// WaveFile interleave the samples automatically
wav.fromScratch(2, 48000, '8', [
    [0, 2, 4, 3],
    [0, 1, 4, 3]
]);
fs.writeFileSync(path, wav.toBuffer());
```
Possible values for the bit depth are:  
"4" - 4-bit IMA-ADPCM  
"8" - 8-bit  
"8a" - 8-bit A-Law  
"8m" - 8-bit mu-Law  
"16" - 16-bit  
"24" - 24-bit  
"32" - 32-bit  
"32f" - 32-bit floating point  
"64" - 64-bit floating point

## API

### The WaveFileCreator methods
```javascript
/**
 * Set up the WaveFileCreator object from a byte buffer.
 * @param {!Uint8Array} bytes The buffer.
 * @param {boolean=} loadSamples True if the samples should be loaded.
 * @throws {Error} If container is not RIFF, RIFX or RF64.
 * @throws {Error} If no fmt  chunk is found.
 * @throws {Error} If no data chunk is found.
 */
WaveFileCreator.fromBuffer(bytes, loadSamples=true) {}

/**
 * Return a byte buffer representig the WaveFileCreator object as a .wav file.
 * The return value of this method can be written straight to disk.
 * @return {!Uint8Array} A wav file.
 */
WaveFileCreator.toBuffer() {}

/**
 * Set up the WaveFileCreator object based on the arguments passed.
 * Existing chunks are reset.
 * @param {number} numChannels The number of channels
 *    (Integer numbers: 1 for mono, 2 stereo and so on).
 * @param {number} sampleRate The sample rate.
 *    Integer numbers like 8000, 44100, 48000, 96000, 192000.
 * @param {string} bitDepthCode The audio bit depth code.
 *    One of '4', '8', '8a', '8m', '16', '24', '32', '32f', '64'
 *    or any value between '8' and '32' (like '12').
 * @param {!Array<number>|!Array<!Array<number>>|!TypedArray} samples
 *    The samples. Must be in the correct range according to the bit depth.
 * @param {?Object} options Optional. Used to force the container
 *    as RIFX with {'container': 'RIFX'}
 * @throws {Error} If any argument does not meet the criteria.
 */
fromScratch(numChannels, sampleRate, bitDepthCode, samples, options={}) {}
```

### The WaveFileCreator properties
```javascript
/**
 * The container identifier.
 * "RIFF", "RIFX" and "RF64" are supported.
 * @type {string}
 */
WaveFileCreator.container = '';
/**
 * @type {number}
 */
WaveFileCreator.chunkSize = 0;
/**
 * The format.
 * Always 'WAVE'.
 * @type {string}
 */
WaveFileCreator.format = '';
/**
 * The data of the "fmt" chunk.
 * @type {!Object<string, *>}
 */
WaveFileCreator.fmt = {
    /** @type {string} */
    chunkId: '',
    /** @type {number} */
    chunkSize: 0,
    /** @type {number} */
    audioFormat: 0,
    /** @type {number} */
    numChannels: 0,
    /** @type {number} */
    sampleRate: 0,
    /** @type {number} */
    byteRate: 0,
    /** @type {number} */
    blockAlign: 0,
    /** @type {number} */
    bitsPerSample: 0,
    /** @type {number} */
    cbSize: 0,
    /** @type {number} */
    validBitsPerSample: 0,
    /** @type {number} */
    dwChannelMask: 0,
    /**
     * 4 32-bit values representing a 128-bit ID
     * @type {!Array<number>}
     */
    subformat: []
};
/**
 * The data of the "fact" chunk.
 * @type {!Object<string, *>}
 */
WaveFileCreator.fact = {
    /** @type {string} */
    chunkId: '',
    /** @type {number} */
    chunkSize: 0,
    /** @type {number} */
    dwSampleLength: 0
};
/**
 * The data of the "cue " chunk.
 * @type {!Object<string, *>}
 */
WaveFileCreator.cue = {
    /** @type {string} */
    chunkId: '',
    /** @type {number} */
    chunkSize: 0,
    /** @type {number} */
    dwCuePoints: 0,
    /** @type {!Array<!Object>} */
    points: [],
};
/**
 * The data of the "smpl" chunk.
 * @type {!Object<string, *>}
 */
WaveFileCreator.smpl = {
    /** @type {string} */
    chunkId: '',
    /** @type {number} */
    chunkSize: 0,
    /** @type {number} */
    dwManufacturer: 0,
    /** @type {number} */
    dwProduct: 0,
    /** @type {number} */
    dwSamplePeriod: 0,
    /** @type {number} */
    dwMIDIUnityNote: 0,
    /** @type {number} */
    dwMIDIPitchFraction: 0,
    /** @type {number} */
    dwSMPTEFormat: 0,
    /** @type {number} */
    dwSMPTEOffset: 0,
    /** @type {number} */
    dwNumSampleLoops: 0,
    /** @type {number} */
    dwSamplerData: 0,
    /** @type {!Array<!Object>} */
    loops: [],
};
/**
 * The data of the "bext" chunk.
 * @type {!Object<string, *>}
 */
WaveFileCreator.bext = {
    /** @type {string} */
    chunkId: '',
    /** @type {number} */
    chunkSize: 0,
    /** @type {string} */
    description: '', //256
    /** @type {string} */
    originator: '', //32
    /** @type {string} */
    originatorReference: '', //32
    /** @type {string} */
    originationDate: '', //10
    /** @type {string} */
    originationTime: '', //8
    /**
     * 2 32-bit values, timeReference high and low
     * @type {!Array<number>}
     */
    timeReference: [0, 0],
    /** @type {number} */
    version: 0, //WORD
    /** @type {string} */
    UMID: '', // 64 chars
    /** @type {number} */
    loudnessValue: 0, //WORD
    /** @type {number} */
    loudnessRange: 0, //WORD
    /** @type {number} */
    maxTruePeakLevel: 0, //WORD
    /** @type {number} */
    maxMomentaryLoudness: 0, //WORD
    /** @type {number} */
    maxShortTermLoudness: 0, //WORD
    /** @type {string} */
    reserved: '', //180
    /** @type {string} */
    codingHistory: '' // string, unlimited
};
/**
 * The data of the "ds64" chunk.
 * Used only with RF64 files.
 * @type {!Object<string, *>}
 */
WaveFileCreator.ds64 = {
    /** @type {string} */
    chunkId: '',
    /** @type {number} */
    chunkSize: 0,
    /** @type {number} */
    riffSizeHigh: 0, // DWORD
    /** @type {number} */
    riffSizeLow: 0, // DWORD
    /** @type {number} */
    dataSizeHigh: 0, // DWORD
    /** @type {number} */
    dataSizeLow: 0, // DWORD
    /** @type {number} */
    originationTime: 0, // DWORD
    /** @type {number} */
    sampleCountHigh: 0, // DWORD
    /** @type {number} */
    sampleCountLow: 0, // DWORD
    /** @type {number} */
    //"tableLength": 0, // DWORD
    /** @type {!Array<number>} */
    //"table": []
};
/**
 * The data of the "data" chunk.
 * @type {!Object<string, *>}
 */
WaveFileCreator.data = {
    /** @type {string} */
    chunkId: '',
    /** @type {number} */
    chunkSize: 0,
    /** @type {!Uint8Array} */
    samples: new Uint8Array(0)
};
/**
 * The data of the "LIST" chunks.
 * Each item in this list look like this:
 *  {
 *      chunkId: '',
 *      chunkSize: 0,
 *      format: '',
 *      subChunks: []
 *   }
 * @type {!Array<!Object>}
 */
WaveFileCreator.LIST = [];
/**
 * The data of the "junk" chunk.
 * @type {!Object<string, *>}
 */
WaveFileCreator.junk = {
    /** @type {string} */
    chunkId: '',
    /** @type {number} */
    chunkSize: 0,
    /** @type {!Array<number>} */
    chunkData: []
};
/**
 * The bit depth code according to the samples.
 * @type {string}
 */
WaveFileCreator.bitDepth =  '';
```

#### Cue points
Items in *cue.points* are objects like this:
```javascript
{
    /** @type {number} */
    dwName: 0, // a cue point ID
    /** @type {number} */
    dwPosition: 0,
    /** @type {number} */
    fccChunk: 0,
    /** @type {number} */
    dwChunkStart: 0,
    /** @type {number} */
    dwBlockStart: 0,
    /** @type {number} */
    dwSampleOffset: 0
}
```

#### Sample loops
Items in *smpl.loops* are objects like this:
```javascript
{
    /** @type {string} */
    dwName: '', // a cue point ID
    /** @type {number} */
    dwType: 0,
    /** @type {number} */
    dwStart: 0,
    /** @type {number} */
    dwEnd: 0,
    /** @type {number} */
    dwFraction: 0,
    /** @type {number} */
    dwPlayCount: 0
}
```

#### LIST chunk
"LIST" chunk data is stored as follows:
```javascript
/**
 * An array of the "LIST" chunks present in the file.
 * @type {!Array<!Object>}
 */
WaveFileCreator.LIST = [];
```

Items in *WaveFileCreator.LIST* are objects like this:
```javascript
{
    /** @type {string} */
    chunkId: '', // always 'LIST'
    /** @type {number} */
    chunkSize: 0,
    /** @type {string} */
    format: '', // 'adtl' or 'INFO'
    /** @type {!Array<!Object>} */
    subChunks: []
};
```
Where "subChunks" are the subChunks of the "LIST" chunk. A single file may have many "LIST" chunks as long as their formats ("INFO", "adtl", etc) are not the same. **wavefile-creator** can read "LIST" chunks of format "INFO" and "adtl".

For "LIST" chunks with the "INFO" format, "subChunks" will be an array of objects like this:
```javascript
{
    /** @type {string} */
    chunkId: '', // some RIFF tag
    /** @type {number} */
    chunkSize 0,
    /** @type {string} */
    value: ''
}
```
Where "chunkId" may be any RIFF tag:  
https://sno.phy.queensu.ca/~phil/exiftool/TagNames/RIFF.html#Info

## Contributing to wavefile-creator
**wavefile-creator** welcomes all contributions from anyone willing to work in good faith with other contributors and the community. No contribution is too small and all contributions are valued.

See [CONTRIBUTING.md](https://github.com/rochars/wavefile-creator/blob/master/CONTRIBUTING.md) for details.

### Style guide
**wavefile-creator** code should follow the Google JavaScript Style Guide:  
https://google.github.io/styleguide/jsguide.html

### Code of conduct
This project is bound by a Code of Conduct: The [Contributor Covenant, version 1.4](https://github.com/rochars/wavefile-creator/blob/master/CODE_OF_CONDUCT.md), also available at https://www.contributor-covenant.org/version/1/4/code-of-conduct.html

## References

### Papers
https://tech.ebu.ch/docs/tech/tech3285.pdf  
https://tech.ebu.ch/docs/tech/tech3306-2009.pdf  
http://www-mmsp.ece.mcgill.ca/Documents/AudioFormats/WAVE/WAVE.html  
https://www.loc.gov/preservation/digital/formats/fdd/fdd000356.shtml  
http://www-mmsp.ece.mcgill.ca/Documents/AudioFormats/WAVE/Docs/riffmci.pdf  
https://sites.google.com/site/musicgapi/technical-documents/wav-file-format  
http://www.neurophys.wisc.edu/auditory/riff-format.txt  
https://sno.phy.queensu.ca/~phil/exiftool/TagNames/RIFF.html#Info

### Software
https://github.com/erikd/libsndfile  
https://gist.github.com/hackNightly/3776503  
https://github.com/chirlu/sox/blob/master/src/wav.c

### Other
https://developercertificate.org/  
https://www.contributor-covenant.org/version/1/4/code-of-conduct.html  
https://google.github.io/styleguide/jsguide.html

### LICENSE
Copyright (c) 2019 Rafael da Silva Rocha.

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
