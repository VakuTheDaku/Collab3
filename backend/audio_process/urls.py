from django.urls import path
from .views import *

urlpatterns = [
    path('split_background/', SplitBackground.as_view(), name='splitBackground'),
    path('process/', ProcessAudioAPI.as_view(), name="process-audio"),
    path('overlay/', OverlayAudio.as_view(), name="overlay-audio")
]
