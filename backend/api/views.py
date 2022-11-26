from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from api.serializer import MyTokenObtainPairSerializer, RegisterSerializer,ParkingSpotReservationsSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny, IsAuthenticated

from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

import datetime
from django.utils.timezone import make_aware
from .serializer import ReservationSerializer
# Create your views here.
from django.utils import timezone
from .models import *
from django.db.models import Q
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

def getDuration(then, now = timezone.now(), interval = "default"):

    # Returns a duration as specified by variable interval
    # Functions, except totalDuration, returns [quotient, remainder]

    duration = now - then # For build-in functions
    duration_in_s = duration.total_seconds() 
    
    def years():
      return divmod(duration_in_s, 31536000) # Seconds in a year=31536000.

    def days(seconds = None):
      return divmod(seconds if seconds != None else duration_in_s, 86400) # Seconds in a day = 86400

    def hours(seconds = None):
      return divmod(seconds if seconds != None else duration_in_s, 3600) # Seconds in an hour = 3600

    def minutes(seconds = None):
      return divmod(seconds if seconds != None else duration_in_s, 60) # Seconds in a minute = 60

    def seconds(seconds = None):
      if seconds != None:
        return divmod(seconds, 1)   
      return duration_in_s

    def totalDuration():
        y = years()
        d = days(y[1]) # Use remainder to calculate next variable
        h = hours(d[1])
        m = minutes(h[1])
        s = seconds(m[1])

        return "Time between dates: {} years, {} days, {} hours, {} minutes and {} seconds".format(int(y[0]), int(d[0]), int(h[0]), int(m[0]), int(s[0]))

    return {
        'years': int(years()[0]),
        'days': int(days()[0]),
        'hours': int(hours()[0]),
        'minutes': int(minutes()[0]),
        'seconds': int(seconds()),
        'default': totalDuration()
    }[interval]

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/'
    ]
    return Response(routes)



@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def testEndPoint(request):
    if request.method == 'GET':
        data = f"Congratulation {request.user}, your API just responded to GET request"
        return Response({'response': data}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        text = request.POST.get('text')
        data = f'Congratulation your API just responded to POST request with text: {text}'
        return Response({'response': data}, status=status.HTTP_200_OK)
    return Response({}, status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def printUser(request):
    print(request.user)
    data = f"Congratulation {request.user}, your API just responded to GET request"
    return Response({'response': data}, status=status.HTTP_200_OK)

'''
Returns all parking spots data
'''
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getParkingSpots(request):
    spots = ParkingSpot.objects.all()
    serializer = ParkingSpotReservationsSerializer(spots,many=True)
    #print(serializer.data)
    #queryset = Reservation.objects.all().values()
    #queryset = serializer.values()
    
    return JsonResponse({"response": list(serializer.data)})


'''
Returns reservations for user
'''
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserReservations(request):
    student = Reservation.objects.filter(user=request.user).all()
    serializer = ReservationSerializer(student,many=True)
    
    
    print(serializer.data)
    #queryset = Reservation.objects.all().values()
    #queryset = serializer.values()
    
    return JsonResponse({"response": list(serializer.data)})
    #return Response({'response': data}, status=status.HTTP_200_OK)

'''
THIS WORKS FOR TIMEZONES, BEWARE : NEED TO CHANGE THE DB AS WELL

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def bookReservation(request):
    today = timezone.now()
    
    parkingSpotId = request.data['parkingId']
    startDate = timezone.datetime.strptime(request.data.get("startDate"), '%d/%m/%Y')
    endDate = timezone.datetime.strptime(request.data.get("endDate"), '%d/%m/%Y')
    

    awareStart = timezone.make_aware(startDate,timezone.get_default_timezone())
    awareEnd = timezone.make_aware(endDate,timezone.get_default_timezone())
    if startDate > endDate:
        return JsonResponse({"error":"Invalid start and end date."})
    spots = Reservation.objects.filter(parkingSpot=parkingSpotId).filter(Q(endDate__gte=today)).all()
    print("LOOKING TO BOOK FROM "+str(awareStart) + " TILL " + str(awareEnd))
    for spot in spots:
        print(spot.reservationDate)
        reservationStart = timezone.localtime(spot.reservationDate)
        reservationEnd = timezone.localtime(spot.endDate)
        print("RESERVATION : "+ str(reservationStart) + " - " + str(reservationEnd))
        #spotDate =make_aware(spot.reservationDate)
        
        if (awareStart <= reservationEnd ) and (awareEnd >= reservationStart):
            #if the dates overlap in any way
            return JsonResponse({"error":"Parking Spot is not available"})
        
    
    return JsonResponse({"response": 'ok'})
'''



'''
Books reservation
'''
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def bookReservation(request):
    today = timezone.now()
    
    parkingSpotId = request.data['parkingId']
    try:
        startDate = timezone.datetime.strptime(request.data.get("startDate"), '%d/%m/%Y').date()
    
        endDate = timezone.datetime.strptime(request.data.get("endDate"), '%d/%m/%Y').date()
    except(ValueError, TypeError):
        return JsonResponse({"error":"Dates must be in format DD/MM/YYYY"})
    
    if startDate > endDate:
        return JsonResponse({"error":"Invalid start and end date."})
    reservations = Reservation.objects.filter(parkingSpot=parkingSpotId).filter(Q(endDate__gte=today)).all()
    for reservation in reservations:
        #Check to see if there is any reservation associated with parking spot whose dates overlap with new reservation date
        if (startDate <= reservation.endDate ) and (endDate >= reservation.reservationDate):
            #if the dates overlap in any way
            return JsonResponse({"error":"Parking Spot is not available"})
    ## If no reservation with overlapping dates is found

    pSpot = ParkingSpot.objects.get(id=parkingSpotId) # get parking spot object to associate with reservation
    
    resEnd = endDate

    reservation = Reservation.objects.create(user=request.user,reservationDate=startDate,durationMinutes=0,endDate=resEnd,totalCost=0,parkingSpot=pSpot)
    
    pSpot.reservations.add(reservation)
    return JsonResponse({"response": 'Reservation Booked'})

'''
Deletes reservation 
'''
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteReservation(request,reservationId):
    if not Reservation.objects.filter(id=reservationId,user=request.user).exists():
        return JsonResponse({"response": 'Error while processing the request'})
    query = Reservation.objects.get(id=reservationId,user=request.user)
    query.delete()
    return JsonResponse({"response": 'Reservation Deleted'})


'''
Returns reservations for specific parking spot
'''
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getReservationsForSpot(request,id):
    today = timezone.now()
    spots = Reservation.objects.filter(parkingSpot=id).filter(Q(endDate__gte=today)).all()
    serializer = ReservationSerializer(spots,many=True)
    #print("DATA IS ")
    #print(serializer.data)
    return JsonResponse({"response": list(serializer.data)})
