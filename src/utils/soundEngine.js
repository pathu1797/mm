/**
 * Subtle original Web Audio API sound synthesizer.
 * Disabled by default; never autoplays. Only plays when user enables sound.
 */

class SoundEngine {
  constructor() {
    this.enabled = false;
    this.ctx = null;
  }

  setEnabled(value) {
    this.enabled = Boolean(value);
    if (this.enabled) {
      this._ensureContext();
    }
  }

  isEnabled() {
    return this.enabled;
  }

  _ensureContext() {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  _playTone({ freq = 520, endFreq = null, duration = 0.14, type = 'sine', volume = 0.08, delay = 0 }) {
    if (!this.enabled) return;
    const ctx = this._ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    if (endFreq) {
      osc.frequency.exponentialRampToValueAtTime(endFreq, now + duration);
    }

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(volume, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration + 0.02);
  }

  playPop(combo = 1) {
    const base = 380 + Math.min(combo, 8) * 55;
    this._playTone({ freq: base, endFreq: base * 1.6, duration: 0.11, type: 'sine', volume: 0.09 });
    this._playTone({ freq: base * 1.4, endFreq: base * 2.0, duration: 0.08, type: 'triangle', volume: 0.05, delay: 0.03 });
  }

  playBloom() {
    // Soft golden harp chord
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
      this._playTone({
        freq,
        duration: 0.32,
        type: 'sine',
        volume: 0.055,
        delay: idx * 0.06,
      });
    });
  }

  playCatChirp() {
    // Cute playful upward meow-chirp
    this._playTone({ freq: 620, endFreq: 960, duration: 0.14, type: 'triangle', volume: 0.065 });
    this._playTone({ freq: 880, endFreq: 740, duration: 0.12, type: 'sine', volume: 0.05, delay: 0.1 });
  }

  playPowerUp() {
    [440, 554.37, 659.25, 880, 1108.73].forEach((freq, idx) => {
      this._playTone({
        freq,
        duration: 0.2,
        type: 'triangle',
        volume: 0.065,
        delay: idx * 0.045,
      });
    });
  }

  playCelebration() {
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5, 1567.98];
    notes.forEach((freq, idx) => {
      this._playTone({
        freq,
        duration: 0.35,
        type: 'triangle',
        volume: 0.06,
        delay: idx * 0.075,
      });
    });
  }

  playEnvelope() {
    this._playTone({ freq: 392, endFreq: 523.25, duration: 0.18, type: 'sine', volume: 0.06 });
    this._playTone({ freq: 523.25, endFreq: 659.25, duration: 0.22, type: 'sine', volume: 0.06, delay: 0.12 });
  }

  playSoftClick() {
    this._playTone({ freq: 480, endFreq: 560, duration: 0.07, type: 'sine', volume: 0.045 });
  }
}

export const soundEngine = new SoundEngine();
