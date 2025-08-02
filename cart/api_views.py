# cart/api_views.py
from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Cart, CartItem
from .serializers import CartSerializer
from products.models import Product

@api_view(['GET', 'POST'])
def cart_detail(request):
    cart, created = Cart.objects.get_or_create(
        session_key=request.session.session_key or request.session.create()
    )
    
    if request.method == 'GET':
        serializer = CartSerializer(cart)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        product_id = request.data.get('product_id')
        quantity = int(request.data.get('quantity', 1))
        
        try:
            product = Product.objects.get(id=product_id, available=True)
            cart_item, created = CartItem.objects.get_or_create(
                cart=cart,
                product=product,
                defaults={'quantity': quantity}
            )
            
            if not created:
                cart_item.quantity += quantity
                cart_item.save()
            
            serializer = CartSerializer(cart)
            return Response(serializer.data)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['PUT', 'DELETE'])
def cart_item_detail(request, item_id):
    try:
        cart_item = CartItem.objects.get(id=item_id)
        
        if request.method == 'PUT':
            quantity = int(request.data.get('quantity', 1))
            cart_item.quantity = quantity
            cart_item.save()
            
            serializer = CartSerializer(cart_item.cart)
            return Response(serializer.data)
            
        elif request.method == 'DELETE':
            cart = cart_item.cart
            cart_item.delete()
            
            serializer = CartSerializer(cart)
            return Response(serializer.data)
            
    except CartItem.DoesNotExist:
        return Response({'error': 'Cart item not found'}, status=status.HTTP_404_NOT_FOUND)