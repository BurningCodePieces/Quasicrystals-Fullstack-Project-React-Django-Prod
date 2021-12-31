from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.decorators import api_view,permission_classes
from . models import *
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from . serializers import *
from .models import Quasicrystal
from rest_framework import status
    
@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_quasicrystals(request):
    try:
        structures = Quasicrystal.objects.filter(is_valid=True)
        serializer = QuasicrystalSerializer(structures,many=True)
        return Response(serializer.data)
    except Exception as err:
        return Response(str(err), status=400)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_unverified_quasicrystals(request):
    try:
        unverified_structures = Quasicrystal.objects.filter(is_valid=False)
        serializer = QuasicrystalSerializer(unverified_structures,many=True)
        return Response(serializer.data)
    except Exception as err:
        return Response(str(err), status=400)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_quasicrystals_for_user(request, user_id):
    try:
        user_structures = Quasicrystal.objects.filter(created_by = user_id)
        serializer = QuasicrystalSerializer(user_structures,many=True)
        return Response(serializer.data)
    except Exception as err:
        return Response(str(err), status=400)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_quasicrystal_by_id(request,pk):
    try:
        structure = Quasicrystal.objects.get(id=pk)
        serializer = QuasicrystalSerializer(structure,many=False)
        return Response(serializer.data)
    except Exception as err:
        return Response(str(err), status=400)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_new_quasicrystal(request):
    try:
        context = {'request': request} 
        serializer = QuasicrystalPostSerializer(data=request.data, context=context)
        if serializer.is_valid():
            obj = serializer.save()
            obj.crystal_id = str(obj.id)+"_"+str(obj.crystal_id)
            obj.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as err:
        return Response(str(err), status=400)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def change_quasicrystal_validity(request, pk):
    try:
        structure = Quasicrystal.objects.get(id=pk)
        structure.is_valid = not structure.is_valid
        structure.save()
        serializer = QuasicrystalSerializer(structure)
        return Response(serializer.data)
    except Exception as err:
        return Response(str(err), status=400)
        

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_quasicrystal_by_id(request, pk):
    try: 
        serializer = QuasicrystalSerializer(data=request.data)
        structure = Quasicrystal.objects.get(id=pk)
        structure.delete()
        return Response(status=204)
    except Exception as err:
        return Response(str(err), status=400)