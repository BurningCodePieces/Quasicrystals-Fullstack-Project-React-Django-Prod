from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.decorators import api_view,permission_classes
from . models import *
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from . serializers import *
from .models import UserAccount
    
@api_view(['PUT'])
@permission_classes([IsAdminUser])
def update_user_role_by_email(request, email):
    try:
        user = UserAccount.objects.get(email=email)
        serializer = CurrentUserSerializer(user,many=False)
        user.is_staff = not user.is_staff
        user.save()
        return Response(serializer.data)
    except Exception as err:
        return Response(str(err), status=400)