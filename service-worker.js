self.addEventListener('fetch', function (event) {
    const url = new URL(event.request.url);
    if (url.pathname === '/share') {
        const responsePromise = event.request.formData().then((formData) => {
            console.log('Title: ' + formData.get('title'));
            console.log('Text: ' + formData.get('text'));
            console.log('File: ' + formData.get('file'));

            return Response.redirect('/');
        });
        event.respondWith(responsePromise);
    }
});
