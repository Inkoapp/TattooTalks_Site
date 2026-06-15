import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware({
  locales: ['en', 'fr', 'es', 'pt'],
  defaultLocale: 'en',
  localePrefix: 'always'
});

export default function middleware(request: NextRequest) {
  // Exclure la page welcome (racine) - pas de redirection automatique
  if (request.nextUrl.pathname === '/') {
    return NextResponse.next();
  }
  
  // Exclure explicitement les routes admin - elles gèrent leur propre logique
  if (request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.next();
  }
  
  // Appliquer le middleware i18n pour toutes les autres routes
  return intlMiddleware(request);
}

export const config = {
  // Matcher pour inclure toutes les routes sauf api, _next, et fichiers statiques
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
