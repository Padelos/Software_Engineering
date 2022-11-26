from django.db import models
from django.contrib.auth.models import User # new
# Create your models here.

class ParkingSpot(models.Model):
    reservations = models.ManyToManyField(
        'Reservation',
        blank=True,
    )
    occupied = models.BooleanField(
        default=False
    )
    def __str__(self):
        return "ParkingSpot "+str(self.id)

class Reservation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    reservationDate = models.DateField()
    durationMinutes = models.IntegerField()
    endDate = models.DateField()
    totalCost = models.FloatField()
    parkingSpot = models.ForeignKey(
        ParkingSpot,
        on_delete=models.CASCADE
    )

