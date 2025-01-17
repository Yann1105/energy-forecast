

from django.contrib import admin
from django.urls import include, path, re_path
from django.conf import settings
from django.views.static import serve

urlpatterns = [
    #Auth
   # path("admin/", admin.site.urls),
    
    # API
    path("api/",include("main.urls"), name="main_app" ),
    
   
]
