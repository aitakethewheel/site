import React, { useEffect } from 'react';

export default function GiftShop() {
  useEffect(() => {
    // Immediately redirect to the external gift shop without rendering a page
    if (typeof window !== 'undefined') {
      window.location.replace('https://giftshop.aitakethewheel.com/');
    }
  }, []);

  return null;
}
