from django.db.models import Count
from approvals.models import Approval
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import ChangeRequest
from .serializers import ChangeRequestSerializer


# ----------------------------
# Create Ticket API
# ----------------------------
@api_view(['POST'])
def create_ticket(request):

    serializer = ChangeRequestSerializer(data=request.data)

    if serializer.is_valid():
        ticket= serializer.save()
        Approval.objects.create(
    ticket=ticket,
    level=1
)
        Approval.objects.create(
            ticket=ticket,
            level=2
            )
        return Response({
            "message": "Ticket Created Successfully",
            "data": serializer.data
        })

    return Response(serializer.errors)


# ----------------------------
# View All Tickets API
# ----------------------------
@api_view(['GET'])
def view_tickets(request):

    tickets = ChangeRequest.objects.all().order_by('-created_at')

    serializer = ChangeRequestSerializer(
        tickets,
        many=True
    )

    return Response(serializer.data)


# ----------------------------
# Update Ticket API
# ----------------------------
@api_view(['PUT'])
def update_ticket(request, ticket_id):

    try:
        ticket = ChangeRequest.objects.get(id=ticket_id)

    except ChangeRequest.DoesNotExist:
        return Response({
            "error": "Ticket Not Found"
        })

    serializer = ChangeRequestSerializer(
        ticket,
        data=request.data,
        partial=True
    )

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors)
# ----------------------------
# Dashboard Summary API
# ----------------------------
@api_view(['GET'])
def summary(request):

    total = ChangeRequest.objects.count()
    open_count = ChangeRequest.objects.filter(status="Open").count()
    in_progress = ChangeRequest.objects.filter(status="In Progress").count()
    closed = ChangeRequest.objects.filter(status="Closed").count()

    recent = ChangeRequest.objects.order_by("-created_at")[:5]

    recent_data = []

    for ticket in recent:
        recent_data.append({
            "id": ticket.ticket_number,
            "title": ticket.project_name,
            "status": ticket.status,
            "requester": ticket.employee_name,
        })

    return Response({
        "summary": {
            "total": total,
            "open": open_count,
            "in_progress": in_progress,
            "resolved": 0,
            "closed": closed
        },
        "recent_tickets": recent_data
    })