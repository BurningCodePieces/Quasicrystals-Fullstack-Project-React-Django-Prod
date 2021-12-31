from django.contrib import admin
from django.urls import path, include, re_path
from django.conf.urls import url
from django.views.generic import TemplateView
from crystalstructure.views import get_unverified_quasicrystals, get_quasicrystals_for_user, change_quasicrystal_validity, get_all_quasicrystals, get_quasicrystal_by_id, add_new_quasicrystal, delete_quasicrystal_by_id
from accounts.views import update_user_role_by_email
urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('get_all_quasicrystals', get_all_quasicrystals),
    path('get_unverified_quasicrystals', get_unverified_quasicrystals),
    path('get_quasicrystals_for_user/<str:user_id>', get_quasicrystals_for_user),
    path('get_quasicrystal_by_id/<str:pk>', get_quasicrystal_by_id),
    path('add_new_quasicrystal', add_new_quasicrystal),
    path('delete_quasicrystal_by_id/<str:pk>', delete_quasicrystal_by_id),
    path('update_user_role_by_email/<str:email>', update_user_role_by_email),
    path('change_quasicrystal_validity/<str:pk>', change_quasicrystal_validity)

]

urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]

