from django.db import models
import uuid


class ChangeRequest(models.Model):

    STATUS_CHOICES = [
        ('Open', 'Open'),
        ('In Progress', 'In Progress'),
        ('Closed', 'Closed'),
    ]

    ticket_number = models.CharField(
        max_length=20,
        unique=True,
        editable=False
    )

    employee_name = models.CharField(
        max_length=100
    )

    project_name = models.CharField(
        max_length=100
    )

    description = models.TextField()

    attachment = models.FileField(
        upload_to='uploads/',
        blank=True,
        null=True
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='Open'
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def save(self, *args, **kwargs):
        if not self.ticket_number:
            self.ticket_number = "CR-" + str(uuid.uuid4())[:8]

        super().save(*args, **kwargs)

    def __str__(self):
        return self.ticket_number