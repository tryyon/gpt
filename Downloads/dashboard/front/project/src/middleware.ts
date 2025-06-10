import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Only redirect from root to dashboard if the path is exactly '/' and the user is authenticated
  // We'll check for authentication in the future, for now we'll just let the landing page show
  return NextResponse.next();
}

export const config = {
  matcher: '/',
};