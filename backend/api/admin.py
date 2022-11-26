from django.contrib import admin

# Register your models here.
from .models import *
class ParkingSpotAdmin(admin.ModelAdmin):
    readonly_fields = ('id',)

class ReservationAdmin(admin.ModelAdmin):
    readonly_fields = ('id',)

admin.site.register(Reservation,ReservationAdmin)
admin.site.register(ParkingSpot,ParkingSpotAdmin)