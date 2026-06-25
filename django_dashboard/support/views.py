from django.shortcuts import render
from .models import SupportTicket


def support_dashboard(request):
    tickets = SupportTicket.objects.order_by('-created_at')[:6]
    summary = {
        'open': SupportTicket.objects.filter(status='OPEN').count(),
        'in_progress': SupportTicket.objects.filter(status='IN_PROGRESS').count(),
        'resolved': SupportTicket.objects.filter(status='RESOLVED').count(),
        'closed': SupportTicket.objects.filter(status='CLOSED').count(),
        'total': SupportTicket.objects.count(),
    }

    context = {
        'summary': summary,
        'tickets': tickets,
    }
    return render(request, 'support/dashboard.html', context)
