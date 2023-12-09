from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from django.http import FileResponse
import librosa
import numpy as np
import IPython.display as ipd
import soundfile as sf
from pydub import AudioSegment
from librosa import sequence
class SplitBackground(ListAPIView):

    def post(self, request):
        try:
            song = request.data['song']
            y, sr = librosa.load(song)
            ipd.Audio(data=y[90*sr:110*sr], rate=sr)
            S_full, phase = librosa.magphase(librosa.stft(y))
            S_filter = librosa.decompose.nn_filter(S_full, aggregate=np.median, metric='cosine', width=int(librosa.time_to_frames(2, sr=sr)))
            S_filter = np.minimum(S_full, S_filter)
            margin_i, margin_v = 3, 11
            power = 3

            mask_i = librosa.util.softmask(S_filter, margin_i * (S_full - S_filter), power=power)
            S_background = mask_i * S_full
        
            
            x_background = librosa.istft(S_background * phase)
            sf.write('/tmp/Background.wav', x_background, sr, subtype='PCM_24')   

            response = FileResponse(open('/tmp/Background.wav', 'rb'))
            response['Content-Disposition'] = 'attachment; filename="Background.wav"'

            return response
        except Exception as e:
            return Response({'status': False})
   
        
class CompareSongs(ListAPIView):

    def load_audio(self, audio_file):
        audio = AudioSegment.from_file(audio_file)
        return np.array(audio.get_array_of_samples(), dtype=np.float32) / 32768.0

    def extract_features(self, audio):
        chroma = librosa.feature.chroma_stft(y=audio, sr=44100)
        return chroma

    def calculate_similarity(self, features1, features2):
        # Use dynamic time warping for sequence alignment
        alignment, similarity_score = sequence.dtw(features1, features2)

        return similarity_score

    def post(self, request, *args, **kwargs):
        try:
            print(request.FILES)
            # Get the uploaded files
            song1_file = request.FILES.get('song1')
            song2_file = request.FILES.get('song2')

            # Load audio files
            audio1 = self.load_audio(song1_file)
            audio2 = self.load_audio(song2_file)

            # Extract features
            features1 = self.extract_features(audio1)
            features2 = self.extract_features(audio2)

            # Calculate similarity score using DTW
            similarity_score = self.calculate_similarity(features1, features2)

            # Define a threshold for plagiarism detection
            threshold = 10000  # Adjust this value based on your requirements

            # Check if the similarity score exceeds the threshold
            is_plagiarized = similarity_score < threshold

            is_plagiarized = np.count_nonzero(is_plagiarized) / len(is_plagiarized)

            return Response({
                'status': True,
                'is_plagiarized': is_plagiarized
            })
        except Exception as e:
            print(e)
            return Response({'status': False, 'error': str(e)})