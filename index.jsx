import React, { useState } from 'react';
import { ShoppingCart, Star, Heart, ChevronLeft, X, Check, Zap, Gift } from 'lucide-react';

export default function ProductApp() {
  const [showUpsell, setShowUpsell] = useState(false);
  const [liked, setLiked] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const product = {
    name: "",
    price: 149.99,
    originalPrice: 199.99,
    rating: 4.8,
    reviews: 2847,
    images: [
      "https://motorkote.com.co/wp-content/uploads/2022/08/shutterstock_447424972-min-e1661983265874.jpg"
    ],
    features: ["Acero inoxidable", "Mejor duración", "Gran calidad"]
  };

  const upsellProduct = {
    name: "Liquido frenos + Liquido refrigerante",
    price: 49.99,
    originalPrice: 79.99,
    savings: 30,
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=300&h=300&fit=crop",
    features: ["Protección premium", "Carga inalámbrica rápida", "Compatible con tu producto"]
  };

  const handleBuyNow = () => {
    setShowUpsell(true);
  };

  const handleAcceptUpsell = () => {
    setAddedToCart(true);
    setTimeout(() => {
      setShowUpsell(false);
      setAddedToCart(false);
    }, 2000);
  };

  const handleDeclineUpsell = () => {
    setAddedToCart(true);
    setTimeout(() => {
      setShowUpsell(false);
      setAddedToCart(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="flex items-center justify-between p-4">
          <ChevronLeft className="w-6 h-6 text-gray-600" />
          <h1 className="text-lg font-semibold text-gray-900">Producto</h1>
          <ShoppingCart className="w-6 h-6 text-gray-600" />
        </div>
      </div>

      {/* Product Images */}
      <div className="bg-white">
        <div className="relative">
          <img 
            src={product.images[selectedImage]} 
            alt={product.name}
            className="w-full h-80 object-cover"
          />
          <button 
            onClick={() => setLiked(!liked)}
            className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg"
          >
            <Heart className={`w-5 h-5 ${liked ? 'fill-red-500 text-red-500' : 'text-gray-400'} transition-colors`} />
          </button>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {product.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === selectedImage ? 'bg-white w-6' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="bg-white p-6 space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h2>
          <div className="flex items-center space-x-3 mb-3">
            <div className="flex items-center">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 text-lg font-semibold">{product.rating}</span>
            </div>
            <span className="text-gray-500">({product.reviews} reseñas)</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-3xl font-bold text-gray-900">${product.price}</span>
            <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-semibold">
              -25%
            </span>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-900">Características:</h3>
          {product.features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-500" />
              <span className="text-gray-600">{feature}</span>
            </div>
          ))}
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center space-x-4">
          <span className="font-semibold">Cantidad:</span>
          <div className="flex items-center border rounded-lg">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-2 text-gray-600 hover:bg-gray-50"
            >
              -
            </button>
            <span className="px-4 py-2 font-semibold">{quantity}</span>
            <button 
              onClick={() => setQuantity(quantity + 1)}
              className="px-3 py-2 text-gray-600 hover:bg-gray-50"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-white p-6 border-t">
        <div className="space-y-3">
          <button 
            onClick={handleBuyNow}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Comprar Ahora
          </button>
          <button className="w-full border-2 border-gray-300 text-gray-700 font-semibold py-4 rounded-xl hover:bg-gray-50 transition-colors">
            Agregar al Carrito
          </button>
        </div>
      </div>

      {/* Upsell Modal */}
      {showUpsell && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full transform scale-95 animate-pulse shadow-2xl">
            {addedToCart ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">¡Agregado al carrito!</h3>
                <p className="text-gray-600">Productos añadidos exitosamente</p>
              </div>
            ) : (
              <>
                <div className="relative p-6">
                  <button 
                    onClick={() => setShowUpsell(false)}
                    className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                  
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full mb-3">
                      <Gift className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">¡Oferta Especial!</h3>
                    <p className="text-gray-600 text-sm">Completa tu compra con este combo</p>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-4 mb-6">
                    <div className="flex items-center space-x-3 mb-3">
                      <img 
                        src={upsellProduct.image} 
                        alt={upsellProduct.name}
                        className="w-16 h-16 rounded-xl object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{upsellProduct.name}</h4>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-lg text-gray-900">${upsellProduct.price}</span>
                          <span className="text-sm text-gray-500 line-through">${upsellProduct.originalPrice}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-1 mb-3">
                      {upsellProduct.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Zap className="w-3 h-3 text-blue-600" />
                          <span className="text-xs text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white text-center py-2 rounded-lg">
                      <span className="font-bold text-sm">Ahorra ${upsellProduct.savings} más</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button 
                      onClick={handleAcceptUpsell}
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-4 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      ¡Sí, agregar combo! 🎉
                    </button>
                    <button 
                      onClick={handleDeclineUpsell}
                      className="w-full bg-gray-100 text-gray-700 font-medium py-3 rounded-xl hover:bg-gray-200 transition-colors"
                    >
                      No gracias, solo el producto
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}