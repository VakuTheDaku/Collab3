from django.contrib import admin
from .models import SpectrogramModel

@admin.register(SpectrogramModel)
class SpectrogramAdmin(admin.ModelAdmin):
    list_display = ('id', 'spectrogram')
    list_filter = ('id', 'spectrogram')
    search_fields = ('id', 'spectrogram')