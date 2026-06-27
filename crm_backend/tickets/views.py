from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import ChangeRequest, DeveloperAssignment
from .serializers import (
    ChangeRequestSerializer,
)
from django.contrib.auth.models import User


# ----------------------------
# Create Ticket API
# ----------------------------
@api_view(['POST'])
def create_ticket(request):

    serializer = ChangeRequestSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

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
# Assign Developer API
# ----------------------------
@api_view(['POST'])
def assign_developer(request):

    try:
        ticket = ChangeRequest.objects.get(
            id=request.data.get("change_request")
        )

        developer = User.objects.get(
            id=request.data.get("developer")
        )

    except (ChangeRequest.DoesNotExist, User.DoesNotExist):
        return Response({
            "error": "Invalid Ticket or Developer"
        }, status=404)

    assignment, created = DeveloperAssignment.objects.update_or_create(
        change_request=ticket,
        defaults={
            "developer": developer,
            "status": "Assigned"
        }
    )

    serializer = DeveloperAssignmentSerializer(assignment)

    return Response(serializer.data)

# ----------------------------
# Update Status API
# ----------------------------
@api_view(['PUT'])
def update_status(request, assignment_id):

    try:
        assignment = DeveloperAssignment.objects.get(id=assignment_id)

    except DeveloperAssignment.DoesNotExist:
        return Response({
            "error": "Assignment Not Found"
        }, status=404)

    assignment.status = request.data.get(
        "status",
        assignment.status
    )

    assignment.save()

    serializer = DeveloperAssignmentSerializer(assignment)

    return Response(serializer.data)

# ----------------------------
# Developer Dashboard API
# ----------------------------
@api_view(['GET'])
def developer_dashboard(request, developer_id):

    assignments = DeveloperAssignment.objects.filter(
        developer_id=developer_id
    )

    serializer = DeveloperAssignmentSerializer(
        assignments,
        many=True
    )

    return Response(serializer.data)