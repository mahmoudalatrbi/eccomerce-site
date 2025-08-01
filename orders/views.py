# orders/views.py
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
import json
from cart.models import Cart
from .models import Order, OrderItem
from .forms import OrderCreateForm

@login_required
def order_create(request):
    """إنشاء طلب جديد"""
    try:
        cart = Cart.objects.get(user=request.user)
    except Cart.DoesNotExist:
        messages.error(request, 'سلة التسوق فارغة')
        return redirect('cart:cart_detail')
    
    if not cart.items.exists():
        messages.error(request, 'سلة التسوق فارغة')
        return redirect('cart:cart_detail')
    
    if request.method == 'POST':
        form = OrderCreateForm(request.POST)
        if form.is_valid():
            order = form.save(commit=False)
            order.user = request.user
            order.total_amount = cart.get_total_price()
            order.save()
            
            # إنشاء عناصر الطلب
            for item in cart.items.all():
                OrderItem.objects.create(
                    order=order,
                    product=item.product,
                    price=item.product.price,
                    quantity=item.quantity
                )
                
                # تقليل المخزون
                item.product.stock -= item.quantity
                item.product.save()
            
            # حذف السلة
            cart.delete()
            
            messages.success(request, f'تم إنشاء الطلب رقم #{order.id} بنجاح!')
            return redirect('orders:order_detail', order_id=order.id)
    else:
        # ملء البيانات من ملف المستخدم
        initial_data = {
            'first_name': request.user.first_name,
            'last_name': request.user.last_name,
            'email': request.user.email,
        }
        form = OrderCreateForm(initial=initial_data)
    
    return render(request, 'orders/order_create.html', {
        'cart': cart,
        'form': form
    })

@login_required
def order_detail(request, order_id):
    """عرض تفاصيل الطلب"""
    order = get_object_or_404(Order, id=order_id, user=request.user)
    return render(request, 'orders/order_detail.html', {'order': order})

@login_required
def order_list(request):
    """عرض قائمة طلبات المستخدم"""
    orders = Order.objects.filter(user=request.user).order_by('-created')
    return render(request, 'orders/order_list.html', {'orders': orders})

@login_required
@require_POST
def cancel_order(request, order_id):
    """إلغاء الطلب"""
    order = get_object_or_404(Order, id=order_id, user=request.user)
    
    if order.status != 'pending':
        return JsonResponse({
            'success': False,
            'error': 'لا يمكن إلغاء هذا الطلب'
        })
    
    # إرجاع المخزون
    for item in order.items.all():
        item.product.stock += item.quantity
        item.product.save()
    
    # تغيير حالة الطلب
    order.status = 'cancelled'
    order.save()
    
    messages.success(request, f'تم إلغاء الطلب #{order.id} بنجاح')
    
    return JsonResponse({
        'success': True,
        'message': 'تم إلغاء الطلب بنجاح'
    })