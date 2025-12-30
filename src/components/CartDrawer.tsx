import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, X, Trash2, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useLanguage, translations } from '@/contexts/LanguageContext';

const cartTranslations = {
  cart: { en: 'Cart', hi: 'कार्ट', sa: 'कार्टः' },
  yourCart: { en: 'Your Cart', hi: 'आपका कार्ट', sa: 'भवतः कार्टः' },
  emptyCart: { en: 'Your cart is empty', hi: 'आपका कार्ट खाली है', sa: 'भवतः कार्टः रिक्तः अस्ति' },
  browseCoures: { en: 'Browse Courses', hi: 'कोर्स देखें', sa: 'पाठ्यक्रमान् पश्यतु' },
  remove: { en: 'Remove', hi: 'हटाएं', sa: 'अपनयतु' },
  clearAll: { en: 'Clear All', hi: 'सब हटाएं', sa: 'सर्वम् अपनयतु' },
  proceedToEnroll: { en: 'Proceed to Enroll', hi: 'नामांकन करें', sa: 'नामाङ्कनं कुरुत' },
  coursesSelected: { en: 'courses selected', hi: 'कोर्स चयनित', sa: 'पाठ्यक्रमाः चयिताः' },
};

const CartDrawer: React.FC = () => {
  const { items, removeFromCart, clearCart, totalItems } = useCart();
  const { t, language } = useLanguage();

  const getTitle = (course: { title: { en: string; hi: string; sa: string } }) => {
    return course.title[language] || course.title.en;
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge 
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-primary text-primary-foreground text-xs"
            >
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            {t(cartTranslations.yourCart)}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
              <ShoppingCart className="h-10 w-10 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">{t(cartTranslations.emptyCart)}</p>
            <Link to="/courses">
              <Button variant="saffron">
                <BookOpen className="h-4 w-4 mr-2" />
                {t(cartTranslations.browseCoures)}
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-auto py-4 space-y-4">
              {items.map((item) => (
                <div
                  key={item.course.id}
                  className="flex gap-3 p-3 rounded-lg border border-border bg-card"
                >
                  <img
                    src={item.course.thumbnail || '/placeholder.svg'}
                    alt={getTitle(item.course)}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm line-clamp-2">
                      {getTitle(item.course)}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.course.duration}
                    </p>
                    {item.course.price && (
                      <p className="text-sm font-semibold text-primary mt-1">
                        {item.course.price}
                      </p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={() => removeFromCart(item.course.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 space-y-3">
              <p className="text-sm text-muted-foreground text-center">
                {totalItems} {t(cartTranslations.coursesSelected)}
              </p>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={clearCart}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  {t(cartTranslations.clearAll)}
                </Button>
                <Link to="/courses" className="flex-1">
                  <Button variant="saffron" size="sm" className="w-full">
                    {t(cartTranslations.proceedToEnroll)}
                  </Button>
                </Link>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
