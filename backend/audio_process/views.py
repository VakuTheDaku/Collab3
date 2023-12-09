from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from django.http import FileResponse
import librosa
import numpy as np
import IPython.display as ipd
import soundfile as sf
from .utils import compute_spectrogram, split_and_fingerprint

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
    def post(self, request):
        pass


class ProcessAudioAPI(ListAPIView):
    def post(self, request):
        audio = request.data['audio']
        fingerprints = split_and_fingerprint(audio)
        data = {
            'fingerprints': fingerprints
        }
        
        return Response(data)