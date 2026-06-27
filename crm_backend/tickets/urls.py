from django.urls import path
from . import views

urlpatterns = [
    path('', views.view_tickets),

    path('create/', views.create_ticket),

    path('update/<int:ticket_id>/', views.update_ticket),

    path('summary/', views.summary),

    path('assign/', views.assign_developer),

    path('status/<int:assignment_id>/', views.update_status),

    path('developer/<int:developer_id>/', views.developer_dashboard),
]