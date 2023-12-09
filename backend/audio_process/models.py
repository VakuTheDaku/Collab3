from django.db import models

class SpectrogramModel(models.Model):
    spectrogram = models.FileField(upload_to='spectrogram/', null=True, blank=True)