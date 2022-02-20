from django.contrib import admin
from django.urls import path, include, re_path
from django.conf.urls import url
from django.views.generic import TemplateView
from crystalstructure.views import get_unverified_quasicrystals, get_quasicrystals_for_user, change_quasicrystal_validity, get_all_quasicrystals, get_quasicrystal_by_id, add_new_quasicrystal, delete_quasicrystal_by_id
from accounts.views import update_user_role_by_email

from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
   openapi.Info(
      title="Snippets API",
      default_version='v1',
      description="Test description",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contact@snippets.local"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('get_all_quasicrystals', get_all_quasicrystals),
    path('get_unverified_quasicrystals', get_unverified_quasicrystals),
    path('get_quasicrystals_for_user/<str:user_id>', get_quasicrystals_for_user),
    path('get_quasicrystal_by_id/<str:pk>',
     get_quasicrystal_by_id),
    path('add_new_quasicrystal', add_new_quasicrystal),
    path('delete_quasicrystal_by_id/<str:pk>', delete_quasicrystal_by_id),
    path('update_user_role_by_email/<str:email>', update_user_role_by_email),
    path('change_quasicrystal_validity/<str:pk>', change_quasicrystal_validity),
    path('documentation', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
]

urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]

