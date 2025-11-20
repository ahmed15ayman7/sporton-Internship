import videojs from 'video.js';

declare module 'video.js' {
  export interface Player {
    hlsQualitySelector?: (options?: any) => void;
  }
}
