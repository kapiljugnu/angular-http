import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { HttpHandlerFn, HttpRequest, provideHttpClient, withInterceptors } from '@angular/common/http';

function addHeaders(request: HttpRequest<unknown>, next: HttpHandlerFn) {
    const req = request.clone({
        // headers: request.headers.set('X-DEBUG', 'Testing')
    })
    return next(req);
}

function loggingInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn) {
    console.log('Outgoing request');
    console.log(request)
    return next(request);
}

bootstrapApplication(AppComponent, {
    providers: [provideHttpClient(
        withInterceptors([addHeaders, loggingInterceptor])
    )]
}).catch((err) => console.error(err));
