export const CHANNELS = 4;
export const SAMPLING_RATE = 256;
export const EPOCH_DURATION = 256;
export const EPOCH_INTERVAL = 100;
export const ORDER = 2;
export const NOTCH_BW = 0.5;
export const CHARACTERISTIC = "butterworth";
export const GAIN = 0;
export const PREGAIN = false;
export const FFT_BINS = 256;
export const DATA_PROP = "data";
export const USE_LOG = false;
export const FREQUENCY_BANDS = {
  delta: [0.1, 4],
  theta: [4, 7.5],
  alpha: [7.5, 12.5],
  beta: [12.5, 30],
  gamma: [30, 100]
};