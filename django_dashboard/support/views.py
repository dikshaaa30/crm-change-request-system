from django.shortcuts import redirect, render
from django.urls import reverse
from .models import SupportTicket
from .forms import SupportTicketForm


def support_dashboard(request):
    if SupportTicket.objects.count() == 0:
        sample_tickets = [
            {
                'title': 'Cannot access account',
                'requester': 'Priya Patel',
                'status': 'OPEN',
                'priority': 'High',
            },
            {
                'title': 'Billing discrepancy on invoice',
                'requester': 'Rahul Singh',
                'status': 'IN_PROGRESS',
                'priority': 'Medium',
            },
            {
                'title': 'New user onboarding request',
                'requester': 'Sneha Sharma',
                'status': 'RESOLVED',
                'priority': 'Low',
            },
        ]
        for ticket_data in sample_tickets:
            SupportTicket.objects.create(**ticket_data)

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


def create_ticket(request):
    if request.method == 'POST':
        form = SupportTicketForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect(reverse('support_dashboard'))
    else:
        form = SupportTicketForm()

    return render(request, 'support/create_ticket.html', {'form': form})


from django.http import HttpResponse
import csv
from django.db.models import Count
from django.utils.timezone import now
from datetime import timedelta


def statistics(request):
    total = SupportTicket.objects.count()
    by_status_qs = SupportTicket.objects.values('status').annotate(count=Count('id'))
    by_priority_qs = SupportTicket.objects.values('priority').annotate(count=Count('id'))

    # Recent activity
    recent_week = SupportTicket.objects.filter(created_at__gte=now()-timedelta(days=7)).count()

    # Monthly counts (SQLite strftime)
    monthly_qs = (SupportTicket.objects
                  .extra({
                      'month': "strftime('%Y-%m', created_at)"
                  })
                  .values('month')
                  .annotate(count=Count('id'))
                  .order_by('month'))

    by_status = {item['status']: item['count'] for item in by_status_qs}
    by_priority = {item['priority']: item['count'] for item in by_priority_qs}
    monthly = list(monthly_qs)

    context = {
        'total': total,
        'by_status': by_status,
        'by_priority': by_priority,
        'recent_week': recent_week,
        'monthly': monthly,
    }
    return render(request, 'support/statistics.html', context)


def report_csv(request):
    # Return a CSV export of all support tickets
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="support_tickets.csv"'

    writer = csv.writer(response)
    writer.writerow(['ID', 'Title', 'Requester', 'Status', 'Priority', 'Created At', 'Updated At'])

    for t in SupportTicket.objects.order_by('-created_at'):
        writer.writerow([t.id, t.title, t.requester, t.status, t.priority, t.created_at.isoformat(), t.updated_at.isoformat()])

    return response
