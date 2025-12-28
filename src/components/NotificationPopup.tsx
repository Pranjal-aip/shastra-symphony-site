import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

interface NotificationPopupProps {
  currentPath?: string;
}

const NotificationPopup: React.FC<NotificationPopupProps> = ({ currentPath = '/' }) => {
  const { notificationPopup } = useAdmin();
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!notificationPopup?.isEnabled) return;

    // Create a unique dismissal key based on popup id and content
    const dismissalKey = `notification-popup-${notificationPopup.id}`;
    const dismissed = sessionStorage.getItem(dismissalKey);
    if (dismissed) return;

    // Check date range
    const now = new Date();
    if (notificationPopup.startDate && new Date(notificationPopup.startDate) > now) return;
    if (notificationPopup.endDate && new Date(notificationPopup.endDate) < now) return;

    // Check if should show on current page
    if (!notificationPopup.showOnAllPages && currentPath !== '/') return;

    // Show popup after a short delay
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [notificationPopup, currentPath]);

  const handleClose = () => {
    setIsOpen(false);
    if (notificationPopup?.id) {
      sessionStorage.setItem(`notification-popup-${notificationPopup.id}`, 'true');
    }
  };

  if (!notificationPopup?.isEnabled) return null;

  const title = t(notificationPopup.title);
  const message = t(notificationPopup.message);

  // Don't show if no content
  if (!title && !message && !notificationPopup.imageUrl) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden bg-card border-2 border-primary/20">
        <DialogTitle className="sr-only">Notification</DialogTitle>
        <button
          onClick={handleClose}
          className="absolute right-3 top-3 z-10 rounded-full bg-background/80 p-1.5 hover:bg-background transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {notificationPopup.imageUrl && (
          <div className="w-full aspect-video overflow-hidden">
            <img
              src={notificationPopup.imageUrl}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="p-6 space-y-4 text-center">
          {title && (
            <h3 className="font-heading text-2xl font-bold text-foreground">
              {title}
            </h3>
          )}
          {message && (
            <p className="font-body text-muted-foreground">
              {message}
            </p>
          )}
          <Button variant="saffron" onClick={handleClose} className="w-full">
            Got it!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationPopup;
