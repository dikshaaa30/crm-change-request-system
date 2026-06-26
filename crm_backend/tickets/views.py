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