from django.urls import path

from .views import (
    create_ticket,
    view_tickets,
    update_ticket
)

urlpatterns = [

    path(
        'tickets/create/',
        create_ticket
    ),

    path(
        'tickets/',
        view_tickets
    ),

    path(
        'tickets/update/<int:ticket_id>/',
        update_ticket
    ),
]