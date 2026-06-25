from django import forms
from .models import SupportTicket


class SupportTicketForm(forms.ModelForm):
    class Meta:
        model = SupportTicket
        fields = ['title', 'requester', 'status', 'priority']
        widgets = {
            'title': forms.TextInput(attrs={'class': 'input-field'}),
            'requester': forms.TextInput(attrs={'class': 'input-field'}),
            'status': forms.Select(attrs={'class': 'input-field'}),
            'priority': forms.Select(attrs={'class': 'input-field'}),
        }
