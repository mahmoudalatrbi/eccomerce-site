# products/api_urls.py
from django.urls import path
from . import api_views

urlpatterns = [
    path('', api_views.ProductListView.as_view(), name='product-list'),
    path('categories/', api_views.CategoryListView.as_view(), name='category-list'),
    path('featured/', api_views.featured_products, name='featured-products'),
    path('<slug:slug>/', api_views.ProductDetailView.as_view(), name='product-detail'),
]