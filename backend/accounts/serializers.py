from djoser.serializers import UserCreateSerializer,UserSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'email','name','password')

        
class CurrentUserSerializer(UserSerializer):
    class Meta:
        model = User
        fields = ('id', 'email','name', 'is_staff')

