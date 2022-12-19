
from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
    TokenRefreshView,
    
)

urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),
    path('', views.getRoutes),
    path('test/', views.testEndPoint, name='test'),
    path('testuser/',views.printUser,name="printUser"),
    
    path('allreservations/',views.getAllReservations, name='getAllReservations'),
    path('reservations/',views.getUserReservations,name='getUserReservations'),
    path('reservations/<int:id>/',views.getReservationsForSpot,name='getReservationsForSpot'),
    path('reservations/book/',views.bookReservation,name='bookReservation'),
    path('reservations/delete/<int:reservationId>',views.deleteReservation,name='deleteReservation'),
    path('reservations/modify',views.modifyReservation,name='modifyReservation'),
    path('admin/reservations/modify',views.adminModifyReservation, name='adminModifyReservation'),

    path('spots/',views.getParkingSpots,name='getParkingSpots'),

    path('users/',views.getUsers, name='getUsers'),
    path('groups/',views.getGroups,name="getGroups"),
    path('groups/add',views.assignGroup,name='assignGroup'),
    path('groups/remove',views.removeUserFromGroup,name='removeUserFromGroup'),
    
]