from django.db import models
from django.contrib.auth.models import User # new
# Create your models here.

class ParkingSpot(models.Model):
    ECONOMY = 'ECO'
    BUSINESS = 'BUS'
    PREMIUM = 'PREM'
    
    SPOT_TYPE_CHOICES = [
        (ECONOMY, 'Economy'),
        (BUSINESS, 'Business'),
        (PREMIUM, 'Premium'),
        
    ]
    parkingSpotType = models.CharField(
        max_length=4,
        choices=SPOT_TYPE_CHOICES,
        default=ECONOMY,
    )
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

