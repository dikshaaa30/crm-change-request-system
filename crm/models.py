from django.db import models


class Ticket(models.Model):

    STATUS_CHOICES = [
        ('Open', 'Open'),
        ('Pending', 'Pending'),
        ('Approved', 'Approved'),
        ('Assigned', 'Assigned'),
        ('Closed', 'Closed'),
    ]

    employee_name = models.CharField(
        max_length=100
    )

    employee_id = models.CharField(
        max_length=20
    )

    project_name = models.CharField(
        max_length=100
    )

    description = models.TextField()

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='Open'
    )

    assigned_developer = models.CharField(
        max_length=100,
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.project_name
