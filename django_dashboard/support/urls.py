from django.urls import path
from .views import support_dashboard, create_ticket, statistics, report_csv

urlpatterns = [
    path('', support_dashboard, name='support_dashboard'),
    path('create/', create_ticket, name='create_ticket'),
    path('stats/', statistics, name='statistics'),
    path('report/csv/', report_csv, name='report_csv'),
]
