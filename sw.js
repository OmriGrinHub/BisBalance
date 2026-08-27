self.addEventListener('notificationclick', (event) => {
  const targetUrl = event.notification?.data?.url || self.registration.scope;

  event.notification.close();

  event.waitUntil(
    (async () => {
      const windowClients = await clients.matchAll({ type: 'window', includeUncontrolled: true });

      for (const client of windowClients) {
        if ('focus' in client) {
          await client.focus();
          if ('navigate' in client && targetUrl && client.url !== targetUrl) {
            try {
              await client.navigate(targetUrl);
            } catch (error) {
              // Ignore navigation errors and keep the focused app open.
            }
          }
          return;
        }
      }

      if (clients.openWindow) {
        await clients.openWindow(targetUrl);
      }
    })()
  );
});

