from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import ChangeRequest
from .serializers import ChangeRequestSerializer
@api_view(['POST'])
def create_ticket(request):

    serializer = ChangeRequestSerializer(
        data=request.data
    )

    if serializer.is_valid():
        serializer.save()

        return Response({
            "message": "Ticket Created Successfully",
            "data": serializer.data
        })

    return Response(serializer.errors,status=400)
@api_view(['GET'])
def view_tickets(request):

    tickets = ChangeRequest.objects.all()

    serializer = ChangeRequestSerializer(
        tickets,
        many=True
    )

    return Response(serializer.data)
@api_view(['PUT'])
def update_ticket(request, ticket_id):

    try:
        ticket = ChangeRequest.objects.get(
            id=ticket_id
        )

    except ChangeRequest.DoesNotExist:

        return Response({
            "message": "Ticket Not Found"
        })

    serializer = ChangeRequestSerializer(
        ticket,
        data=request.data,
        partial=True
    )

    if serializer.is_valid():

        serializer.save()

        return Response({
            "message": "Ticket Updated",
            "data": serializer.data
        })

    return Response(serializer.errors,status=400)