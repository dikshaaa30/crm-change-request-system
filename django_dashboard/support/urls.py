from django.urls import path
from .views import support_dashboard

urlpatterns = [
    path('', support_dashboard, name='support_dashboard'),
]
