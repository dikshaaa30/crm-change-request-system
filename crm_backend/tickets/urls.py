from django.urls import path

from .views import (
    create_ticket,
    view_tickets,
    update_ticket
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
]