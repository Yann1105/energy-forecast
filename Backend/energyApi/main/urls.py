from django.urls import path
from .views import *

urlpatterns = [
    # Water quality detection
    path("predict/",EnergypredictionAPIView, name="predict_energy"),
]
