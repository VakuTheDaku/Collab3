from django.urls import path
from .views import *

urlpatterns = [
    path('split_background/', SplitBackground.as_view(), name='splitBackground'),
    path('compare_song/', CompareSongs.as_view(), name='compareSongs'),
    path('process/', ProcessAudioAPI.as_view(), name="process-audio")
]
