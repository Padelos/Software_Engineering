from django.contrib.auth.models import User, Group, Permission
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.contenttypes.models import ContentType

from .models import Reservation,ParkingSpot

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        token['is_staff']= user.is_staff
        token['is_superuser'] = user.is_superuser
        # ...
        return token

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    first_name = serializers.CharField(required=True, write_only=True)
    last_name = serializers.CharField(required=True, write_only=True)
    class Meta:
        model = User
        fields = ('username', 'password', 'password2', 'first_name','last_name')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        

        user.set_password(validated_data['password'])
        user.save()

        return user






class ContentTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContentType
        fields = ('app_label','name',)


class TaggedObjectRelatedField(serializers.RelatedField):
    """
    A custom field to use for the `tagged_object` generic relationship.
    """

    def to_representation(self, value):
        """
        Serialize tagged objects to a simple textual representation.
        """
        if isinstance(value, ContentType):
            serializer = ContentTypeSerializer(value)
        else:
            raise Exception('Unexpected type of tagged object')
        return serializer.data

class PermissionsSerializer(serializers.ModelSerializer):
    content_type = TaggedObjectRelatedField(read_only = True)
    class Meta:
        model = Permission
        fields = ('name','codename','content_type',)


class GroupSerializer(serializers.ModelSerializer):
    permissions = PermissionsSerializer(read_only=True,many=True)
    class Meta:
        model = Group
        fields = ('id','name','permissions')


class UsersSerializer(serializers.ModelSerializer):
    groups = GroupSerializer(read_only=True,many=True)
    user_permissions = PermissionsSerializer(read_only=True,many=True)
    class Meta:
        model = User
        fields = ('id','username','first_name','last_name','email','groups','user_permissions','is_staff','is_active','is_superuser','last_login','date_joined',)
        

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
