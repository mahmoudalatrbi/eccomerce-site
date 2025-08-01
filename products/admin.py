# products/admin.py
from django.contrib import admin
from django.utils.html import format_html
from .models import Category, Product

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'products_count', 'created', 'updated']
    prepopulated_fields = {'slug': ('name',)}
    list_filter = ['created', 'updated']
    search_fields = ['name']
    
    def products_count(self, obj):
        return obj.products.count()
    products_count.short_description = 'عدد المنتجات'

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['image_preview', 'name', 'category', 'price', 'stock', 'available', 'created']
    list_filter = ['available', 'created', 'updated', 'category']
    list_editable = ['price', 'stock', 'available']
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ['name', 'description']
    ordering = ['name']
    
    def image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" width="50" height="50" style="object-fit: cover; border-radius: 5px;" />',
                obj.image.url
            )
        return "لا توجد صورة"
    image_preview.short_description = 'الصورة'