from django.urls import path

from .views import (
    create_ticket,
    view_tickets,
    update_ticket,
    assign_developer,
    update_status,
    developer_dashboard,
)

urlpatterns = [

    path(
        'create/',
        create_ticket
    ),

    path(
        '',
        view_tickets
    ),

    path(
        'update/<int:ticket_id>/',
        update_ticket
    ),
    
    path(
    "assign/",
    assign_developer
),

path(
    "status/<int:assignment_id>/",
    update_status
),

path(
    "developer/<int:developer_id>/",
    developer_dashboard
),
    
]