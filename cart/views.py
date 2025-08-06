# cart/views.py
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.middleware.csrf import get_token
from django.views.decorators.csrf import ensure_csrf_cookie
import json
from .cart import Cart
from products.models import Product

@ensure_csrf_cookie
@require_http_methods(["GET"])
def cart_detail(request):
    """عرض تفاصيل السلة"""
    try:
        cart = Cart(request)
        
        cart_data = {
            'items': [],
            'total_price': float(cart.get_total_price()),
            'items_count': len(cart)
        }
        
        for item in cart:
            cart_data['items'].append({
                'id': item['product'].id,
                'product': {
                    'id': item['product'].id,
                    'name': item['product'].name,
                    'price': float(item['product'].price),
                    'image': request.build_absolute_uri(item['product'].image.url) if item['product'].image else None,
                    'stock': item['product'].stock,
                    'category': {
                        'name': item['product'].category.name if item['product'].category else ''
                    }
                },
                'quantity': item['quantity'],
                'total_price': float(item['total_price'])
            })
        
        return JsonResponse({
            'success': True,
            'data': cart_data
        })
        
    except Exception as e:
        print(f"Cart detail error: {str(e)}")  # للتشخيص
        return JsonResponse({
            'success': False,
            'message': f'Error: {str(e)}'
        }, status=500)

@csrf_exempt
@require_http_methods(["POST"])
def cart_add(request, product_id):
    """إضافة منتج للسلة"""
    try:
        # قراءة البيانات
        if request.content_type == 'application/json':
            data = json.loads(request.body) if request.body else {}
        else:
            data = request.POST
            
        quantity = int(data.get('quantity', 1))
        
        # التحقق من المنتج
        product = get_object_or_404(Product, id=product_id)
        
        # التحقق من المخزون
        if product.stock < quantity:
            return JsonResponse({
                'success': False,
                'message': 'Not enough stock available'
            }, status=400)
        
        # إضافة للسلة
        cart = Cart(request)
        cart.add(product=product, quantity=quantity)
        
        # إرجاع بيانات السلة المحدثة
        cart_data = {
            'items': [],
            'total_price': float(cart.get_total_price()),
            'items_count': len(cart)
        }
        
        for item in cart:
            cart_data['items'].append({
                'id': item['product'].id,
                'product': {
                    'id': item['product'].id,
                    'name': item['product'].name,
                    'price': float(item['product'].price),
                    'image': request.build_absolute_uri(item['product'].image.url) if item['product'].image else None,
                    'stock': item['product'].stock,
                    'category': {
                        'name': item['product'].category.name if item['product'].category else ''
                    }
                },
                'quantity': item['quantity'],
                'total_price': float(item['total_price'])
            })
        
        return JsonResponse({
            'success': True,
            'message': 'Product added to cart successfully',
            'data': cart_data
        })
        
    except Product.DoesNotExist:
        return JsonResponse({
            'success': False,
            'message': 'Product not found'
        }, status=404)
    except Exception as e:
        print(f"Add to cart error: {str(e)}")  # للتشخيص
        return JsonResponse({
            'success': False,
            'message': f'Error: {str(e)}'
        }, status=500)

@csrf_exempt
@require_http_methods(["PUT", "PATCH"])
def update_cart(request, product_id):
    """تحديث كمية منتج في السلة"""
    try:
        data = json.loads(request.body)
        quantity = int(data.get('quantity', 1))
        
        if quantity <= 0:
            return JsonResponse({
                'success': False,
                'message': 'Quantity must be greater than 0'
            }, status=400)
        
        product = get_object_or_404(Product, id=product_id)
        
        if product.stock < quantity:
            return JsonResponse({
                'success': False,
                'message': 'Not enough stock available'
            }, status=400)
        
        cart = Cart(request)
        cart.add(product=product, quantity=quantity, update_quantity=True)
        
        # إرجاع بيانات السلة المحدثة
        cart_data = {
            'items': [],
            'total_price': float(cart.get_total_price()),
            'items_count': len(cart)
        }
        
        for item in cart:
            cart_data['items'].append({
                'id': item['product'].id,
                'product': {
                    'id': item['product'].id,
                    'name': item['product'].name,
                    'price': float(item['product'].price),
                    'image': request.build_absolute_uri(item['product'].image.url) if item['product'].image else None,
                    'stock': item['product'].stock,
                    'category': {
                        'name': item['product'].category.name if item['product'].category else ''
                    }
                },
                'quantity': item['quantity'],
                'total_price': float(item['total_price'])
            })
        
        return JsonResponse({
            'success': True,
            'message': 'Cart updated successfully',
            'data': cart_data
        })
        
    except Exception as e:
        print(f"Update cart error: {str(e)}")
        return JsonResponse({
            'success': False,
            'message': f'Error: {str(e)}'
        }, status=500)

@csrf_exempt
@require_http_methods(["DELETE"])
def cart_remove(request, product_id):
    """حذف منتج من السلة"""
    try:
        product = get_object_or_404(Product, id=product_id)
        cart = Cart(request)
        cart.remove(product)
        
        # إرجاع بيانات السلة المحدثة
        cart_data = {
            'items': [],
            'total_price': float(cart.get_total_price()),
            'items_count': len(cart)
        }
        
        for item in cart:
            cart_data['items'].append({
                'id': item['product'].id,
                'product': {
                    'id': item['product'].id,
                    'name': item['product'].name,
                    'price': float(item['product'].price),
                    'image': request.build_absolute_uri(item['product'].image.url) if item['product'].image else None,
                    'stock': item['product'].stock,
                    'category': {
                        'name': item['product'].category.name if item['product'].category else ''
                    }
                },
                'quantity': item['quantity'],
                'total_price': float(item['total_price'])
            })
        
        return JsonResponse({
            'success': True,
            'message': 'Product removed from cart',
            'data': cart_data
        })
        
    except Exception as e:
        print(f"Remove from cart error: {str(e)}")
        return JsonResponse({
            'success': False,
            'message': f'Error: {str(e)}'
        }, status=500)

@require_http_methods(["GET"])
def cart_count(request):
    """عدد العناصر في السلة"""
    try:
        cart = Cart(request)
        return JsonResponse({
            'count': len(cart),
            'total': float(cart.get_total_price())
        })
    except Exception as e:
        return JsonResponse({
            'count': 0,
            'total': 0.0
        })

@csrf_exempt
@require_http_methods(["POST"])
def clear_cart(request):
    """مسح جميع عناصر السلة"""
    try:
        cart = Cart(request)
        cart.clear()
        
        return JsonResponse({
            'success': True,
            'message': 'Cart cleared successfully',
            'data': {
                'items': [],
                'total_price': 0.0,
                'items_count': 0
            }
        })
    except Exception as e:
        return JsonResponse({
            'success': False,
            'message': f'Error: {str(e)}'
        }, status=500)