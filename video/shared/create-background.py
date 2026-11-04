"""Synthesize an original, quiet 60-second instrumental bed using only Python stdlib."""
import math
import struct
import sys
import wave
from pathlib import Path

RATE = 24000
DURATION = 60
samples = [0.0] * (RATE * DURATION)
# Original arrangement: slow major-seventh pads and sparse descending bell notes.
chords = [(48, 55, 59, 64), (45, 52, 55, 60), (41, 48, 52, 57), (43, 50, 55, 59)]

def tone(midi, start, length, gain, bell=False):
    frequency = 440 * 2 ** ((midi - 69) / 12)
    for offset in range(int(length * RATE)):
        index = int(start * RATE) + offset
        if index >= len(samples):
            break
        t = offset / RATE
        attack = min(1, t / (0.015 if bell else 0.6))
        release = min(1, (length - t) / 0.7)
        decay = math.exp(-2.1 * t) if bell else 1
        signal = math.sin(2 * math.pi * frequency * t)
        signal += (0.18 if bell else 0.08) * math.sin(4 * math.pi * frequency * t)
        samples[index] += gain * attack * release * decay * signal

for bar in range(20):
    chord = chords[bar % 4]
    for note in chord:
        tone(note, bar * 3, 3.6, 0.016)
    for beat, degree in enumerate((3, 2, 1)):
        tone(chord[degree] + 12, bar * 3 + beat * 0.75, 2.2, 0.026, bell=True)

output = Path(sys.argv[1])
output.parent.mkdir(parents=True, exist_ok=True)
with wave.open(str(output), 'wb') as audio:
    audio.setparams((1, 2, RATE, 0, 'NONE', 'not compressed'))
    pcm = bytearray()
    for index, sample in enumerate(samples):
        t = index / RATE
        fade = min(1, t / 2, (DURATION - t) / 3)
        pcm.extend(struct.pack('<h', int(max(-1, min(1, sample * fade)) * 32767)))
    audio.writeframes(pcm)
print(output)
