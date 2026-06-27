from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Approval
from .serializers import ApprovalSerializer


@api_view(["GET"])
def level1(request):
    approvals = Approval.objects.filter(
        level=1,
        status="Pending"
    )
    serializer = ApprovalSerializer(approvals, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def level2(request):
    approvals = Approval.objects.filter(
        level=2,
        status="Pending"
    )
    serializer = ApprovalSerializer(approvals, many=True)
    return Response(serializer.data)


@api_view(["PUT"])
def approve(request, approval_id):
    try:
        approval = Approval.objects.get(id=approval_id)
    except Approval.DoesNotExist:
        return Response({"error": "Approval not found"}, status=404)

    status_value = request.data.get("status")

    if status_value not in ["Approved", "Rejected"]:
        return Response({"error": "Invalid status"}, status=400)

    approval.status = status_value
    approval.remarks = request.data.get("remarks", "")
    approval.save()

    return Response({
        "message": "Approval updated successfully"
    })


@api_view(["GET"])
def history(request, ticket_id):
    approvals = Approval.objects.filter(ticket_id=ticket_id)
    serializer = ApprovalSerializer(approvals, many=True)
    return Response(serializer.data)