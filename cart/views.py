# cart/views.py
from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse
from django.contrib import messages
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
from products.models import Product
from .models import Cart, CartItem

def get_or_create_cart(request):
    """إنشاء أو استرجاع سلة التسوق"""
    if request.user.is_authenticated:
        cart, created = Cart.objects.get_or_create(user=request.user)
    else:
        session_key = request.session.session_key
        if not session_key:
            request.session.create()
            session_key = request.session.session_key
        cart, created = Cart.objects.get_or_create(session_key=session_key)
    return cart

def cart_add(request, product_id):
    """إضافة منتج إلى السلة"""
    product = get_object_or_404(Product, id=product_id)
    cart = get_or_create_cart(request)
    
    if not product.available:
        messages.error(request, f'عذراً، المنتج "{product.name}" غير متوفر حالياً.')
        return redirect('products:product_detail', id=product.id, slug=product.slug)
    
    if product.stock <= 0:
        messages.error(request, f'عذراً، المنتج "{product.name}" نفدت كميته.')
        return redirect('products:product_detail', id=product.id, slug=product.slug)
    
    cart_item, created = CartItem.objects.get_or_create(
        cart=cart,
        product=product,
        defaults={'quantity': 1}
    )
    
    if not created:
        if cart_item.quantity < product.stock:
            cart_item.quantity += 1
            cart_item.save()
            messages.success(request, f'تم زيادة كمية "{product.name}" في السلة.')
        else:
            messages.warning(request, f'عذراً، الكمية المتاحة من "{product.name}" هي {product.stock} فقط.')
    else:
        messages.success(request, f'تم إضافة "{product.name}" إلى السلة بنجاح.')
    
    return redirect('cart:cart_detail')

def cart_remove(request, product_id):
    """إزالة منتج من السلة"""
    cart = get_or_create_cart(request)
    product = get_object_or_404(Product, id=product_id)
    
    try:
        cart_item = CartItem.objects.get(cart=cart, product=product)
        product_name = cart_item.product.name
        cart_item.delete()
        messages.success(request, f'تم حذف "{product_name}" من السلة.')
    except CartItem.DoesNotExist:
        messages.error(request, 'المنتج غير موجود في السلة.')
    
    return redirect('cart:cart_detail')

def cart_detail(request):
    """عرض تفاصيل السلة"""
    cart = get_or_create_cart(request)
    return render(request, 'cart/cart_detail.html', {'cart': cart})

@require_POST
def update_cart(request, product_id):
    """تحديث كمية المنتج في السلة"""
    cart = get_or_create_cart(request)
    product = get_object_or_404(Product, id=product_id)
    
    try:
        cart_item = CartItem.objects.get(cart=cart, product=product)
        quantity = int(request.POST.get('quantity', 1))
        
        if quantity > 0:
            if quantity <= product.stock:
                cart_item.quantity = quantity
                cart_item.save()
                messages.success(request, f'تم تحديث كمية "{product.name}" إلى {quantity}.')
            else:
                messages.error(request, f'عذراً، الكمية المتاحة من "{product.name}" هي {product.stock} فقط.')
        else:
            product_name = cart_item.product.name
            cart_item.delete()
            messages.success(request, f'تم حذف "{product_name}" من السلة.')
            
    except CartItem.DoesNotExist:
        messages.error(request, 'المنتج غير موجود في السلة.')
    
    return redirect('cart:cart_detail')

@require_POST
def clear_cart(request):
    """إفراغ السلة بالكامل"""
    cart = get_or_create_cart(request)
    items_count = cart.items.count()
    cart.items.all().delete()
    
    messages.success(request, f'تم حذف {items_count} منتج من السلة.')
    return JsonResponse({'success': True, 'message': 'تم إفراغ السلة بنجاح'})

def cart_count(request):
    """إرجاع عدد العناصر في السلة"""
    cart = get_or_create_cart(request)
    count = sum(item.quantity for item in cart.items.all())
    return JsonResponse({'count': count})