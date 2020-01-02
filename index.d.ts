// Type definitions for wavefile-creator 1.0
// Project: https://github.com/rochars/wavefile-creator
// Definitions by: Rafael da Silva Rocha <https://github.com/rochars>
// Definitions: https://github.com/rochars/wavefile-creator

export = wavefileCreator;

declare module wavefileCreator {

  class WaveFileCreator {
    
    /**
     * @param {?Uint8Array=} bytes A wave file buffer.
     * @throws {Error} If no 'RIFF' chunk is found.
     * @throws {Error} If no 'fmt ' chunk is found.
     * @throws {Error} If no 'data' chunk is found.
     */
    constructor(bytes?: Uint8Array);

    /**
     * The container identifier.
     * 'RIFF', 'RIFX' and 'RF64' are supported.
     * @type {string}
     */
    container: string;
    /**
     * @type {number}
     */
    chunkSize: number;
    /**
     * The format.
     * Always 'WAVE'.
     * @type {string}
     */
    format: string;
    /**
     * The data of the 'fmt' chunk.
     * @type {!Object<string, *>}
     */
    fmt: object;
    /**
     * The data of the 'fact' chunk.
     * @type {!Object<string, *>}
     */
    fact: object;
    /**
     * The data of the 'cue ' chunk.
     * @type {!Object<string, *>}
     */
    cue: object;
    /**
     * The data of the 'smpl' chunk.
     * @type {!Object<string, *>}
     */
    smpl: object;
    /**
     * The data of the 'bext' chunk.
     * @type {!Object<string, *>}
     */
    bext: object;
    /**
     * The data of the 'ds64' chunk.
     * Used only with RF64 files.
     * @type {!Object<string, *>}
     */
    ds64: object;
    /**
     * The data of the 'data' chunk.
     * @type {!Object<string, *>}
     */
    data: object;
    /**
     * The data of the 'LIST' chunks.
     * Each item in this list look like this:
     *  {
     *    chunkId: '',
     *    chunkSize: 0,
     *    format: '',
     *    subChunks: []
     *   }
     * @type {!Array<!Object>}
     */
    LIST: object[];
    /**
     * The data of the 'junk' chunk.
     * @type {!Object<string, *>}
     */
    junk: object;

    /**
     * Set up the WaveFileReader object from a byte buffer.
     * @param {!Uint8Array} bytes The buffer.
     * @param {boolean=} samples True if the samples should be loaded.
     * @throws {Error} If container is not RIFF, RIFX or RF64.
     * @throws {Error} If no 'fmt ' chunk is found.
     * @throws {Error} If no 'data' chunk is found.
     */
    fromBuffer(bytes: Uint8Array, samples?:boolean): void;

    /**
      * Return a byte buffer representig the WaveFileCreator object as a .wav file.
      * The return value of this method can be written straight to disk.
      * @return {!Uint8Array} A wav file.
      */
    toBuffer(): Uint8Array;

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
     * @param {!Array<number>|!Array<!Array<number>>|!ArrayBufferView} samples
     *    The samples. Must be in the correct range according to the bit depth.
     * @param {?Object} options Optional. Used to force the container
     *    as RIFX with {'container': 'RIFX'}
     * @throws {Error} If any argument does not meet the criteria.
     */
    fromScratch(
      numChannels: number,
      sampleRate: number,
      bitDepthCode: string,
      samples: Array<number>|Array<Array<number>>|ArrayBufferView,
      options?: object): void;
  }
}
