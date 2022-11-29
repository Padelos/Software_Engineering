from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import Reservation,ParkingSpot

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        # ...
        return token

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username']
        )

        user.set_password(validated_data['password'])
        user.save()

        return user


class CurrentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'id','first_name','last_name',)

class ParkingSpotSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParkingSpot
        fields = ('id','occupied','parkingSpotType')



class ReservationSerializer(serializers.ModelSerializer):
    parkingSpot = ParkingSpotSerializer(read_only=True)
    user = CurrentUserSerializer(read_only = True)
    class Meta:
        model = Reservation
        fields = ('id','reservationDate','durationMinutes','endDate','totalCost','parkingSpot','user')

class ReservationSerializerNoSpots(serializers.ModelSerializer):
    user = CurrentUserSerializer(read_only = True)
    class Meta:
        model = Reservation
        fields = ('reservationDate','durationMinutes','endDate','totalCost','user')

class ParkingSpotReservationsSerializer(serializers.ModelSerializer):
    reservations = ReservationSerializerNoSpots(read_only=True,many=True)
    class Meta:
        model = ParkingSpot
        fields = ('id','occupied','reservations','parkingSpotType')
