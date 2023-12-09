from django.urls import path
from .views import *

urlpatterns = [
    path('splitBackground/', SplitBackground.as_view(), name='splitBackground'),
    path('compareSongs/', CompareSongs.as_view(), name='compareSongs'),
]
