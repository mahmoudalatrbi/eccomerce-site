# cart/urls.py
from django.urls import path
from . import views

app_name = 'cart'

urlpatterns = [
    path('', views.cart_detail, name='cart_detail'),  # GET /api/cart/
    path('add/<int:product_id>/', views.cart_add, name='cart_add'),  # POST /api/cart/add/1/
    path('remove/<int:product_id>/', views.cart_remove, name='cart_remove'),  # DELETE /api/cart/remove/1/
    path('update/<int:product_id>/', views.update_cart, name='update_cart'),  # PUT /api/cart/update/1/
    path('clear/', views.clear_cart, name='clear_cart'),  # POST /api/cart/clear/
    path('count/', views.cart_count, name='cart_count'),  # GET /api/cart/count/
]