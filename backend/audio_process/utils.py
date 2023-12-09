import acoustid
from pydub import AudioSegment
import os
import librosa
import numpy as np
import itertools

def split_and_fingerprint(input_file, segment_duration_ms=10000):
    # Load the audio file
    audio = AudioSegment.from_file(input_file.temporary_file_path())

    # Calculate the number of segments
    num_segments = len(audio) // segment_duration_ms

    # Create a directory to store the segmented files
    output_dir = '/tmp/segments/'
    os.makedirs(output_dir, exist_ok=True)

    signatues = []

   
    for i in range(num_segments):
        start_time = i * segment_duration_ms
        end_time = (i + 1) * segment_duration_ms

        # Extract the segment
        segment = audio[start_time:end_time]

        # Save the segment as a new audio file
        segment_file = os.path.join(output_dir, f'segment_{i}.mp3')
        segment.export(segment_file, format='mp3')

        # Create a fingerprint for the segment
        res = acoustid.fingerprint_file(segment_file)
        signatues.append(res)

      
      
        os.remove(segment_file)
    
    os.removedirs(output_dir)

    return signatues


def compute_spectrogram(audio_file, segment_duration_ms=10000):
    y, sr = librosa.load(audio_file)
    num_segments = len(y) // (sr * segment_duration_ms // 1000)

    spectrograms = []
    
    for i in range(num_segments):
        start_sample = i * sr * segment_duration_ms // 1000
        end_sample = (i + 1) * sr * segment_duration_ms // 1000
        segment = y[start_sample:end_sample]
        S = librosa.feature.melspectrogram(y=segment, sr=sr)
        spectrograms.append(S)

    return spectrograms

def compare_all_pairs_spectrograms(spec1, spec2):

    similarity = 0

    # Compare all possible pairs of spectrograms
    for i, j in itertools.product(range(len(spec1)), range(len(spec2))):
        similarity = compare_spectrograms(spec1[i], spec2[j])
        if similarity > 0.6:
            return similarity

    return similarity

# Your existing compare_spectrograms function
def compare_spectrograms(spec1, spec2):
    flat_spec1 = spec1.flatten()
    flat_spec2 = spec2.flatten()
    similarity = np.dot(flat_spec1, flat_spec2) / (np.linalg.norm(flat_spec1) * np.linalg.norm(flat_spec2))
    return similarity