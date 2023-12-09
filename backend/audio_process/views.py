from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from django.http import FileResponse
import librosa
import numpy as np
import IPython.display as ipd
import soundfile as sf
from .utils import compute_spectrogram, split_and_fingerprint, compare_all_pairs_spectrograms
import base64
from .models import SpectrogramModel
import pickle

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
   
        


class ProcessAudioAPI(ListAPIView):
    def post(self, request):
        audio = request.data['audio']
        fingerprints = pickle.dumps(split_and_fingerprint(audio))

        spectrogram = np.array(compute_spectrogram(audio))
        
        
        spectrogram_data = SpectrogramModel.objects.all()
        max_id = 0
        for spec in spectrogram_data:
            max_id = max(max_id, spec.id)
            with open(spec.spectrogram.path, 'rb') as f:
                spec_data = np.load(f)
                similarity = compare_all_pairs_spectrograms(spec_data, spectrogram)

                if similarity > 0.5:
                    data = {
                        'status': True,
                        'hasPlagiarism': True,
                    }
                    return Response(data)
        with open(f'./spectrogram/spectrogram_{max_id}.npy', 'wb') as f:
            np.save(f, spectrogram)
        spectrogram_model = SpectrogramModel.objects.create(
            spectrogram=f'./spectrogram/spectrogram_{max_id}.npy'
        )
        spectrogram_model.save()

       
        data = {
            'status': True,
            'hasPlagiarism': False,
            'fingerprints': base64.b64encode(fingerprints),
            'spectrogram': base64.b64encode(spectrogram),

        }
        
        return Response(data)