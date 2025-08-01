# cart/context_processors.py
from .models import Cart

def cart(request):
    """إضافة معلومات السلة لجميع الصفحات"""
    cart_obj = None
    
    if request.user.is_authenticated:
        try:
            cart_obj = Cart.objects.get(user=request.user)
        except Cart.DoesNotExist:
            pass
    else:
        session_key = request.session.session_key
        if session_key:
            try:
                cart_obj = Cart.objects.get(session_key=session_key)
            except Cart.DoesNotExist:
                pass
    
    return {'cart': cart_obj}