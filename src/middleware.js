import { withMiddlewareAuthRequired } from '@auth0/nextjs-auth0/edge';

export default withMiddlewareAuthRequired();

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/projects/new',
    '/projects/:uuid/edit',
    '/api/projects/new',
    '/api/projects/:uuid',
  ],
};
