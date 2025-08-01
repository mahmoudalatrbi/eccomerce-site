from django.core.management.base import BaseCommand
from products.models import Product

class Command(BaseCommand):
    help = 'عرض المنتجات التي تحتاج صور'

    def handle(self, *args, **options):
        self.stdout.write('قائمة المنتجات التي تحتاج صور:')
        
        products_without_images = Product.objects.filter(image='')
        
        if products_without_images.exists():
            for product in products_without_images:
                self.stdout.write(f'- {product.name} (ID: {product.id})')
            
            self.stdout.write(f'\nإجمالي المنتجات التي تحتاج صور: {products_without_images.count()}')
            self.stdout.write('يمكنك إضافة الصور من Admin Panel: http://127.0.0.1:8000/admin/products/product/')
        else:
            self.stdout.write('جميع المنتجات تحتوي على صور!')