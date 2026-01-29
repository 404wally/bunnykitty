import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const AUTH_COOKIE_NAME = 'bunnykitty-auth';
const SITE_PASSWORD = 'REALLYrilla2026'; // Hardcoded for now

export function middleware(request: NextRequest) {
  const sitePassword = SITE_PASSWORD;

  // Skip password protection if no password is set
  if (!sitePassword) {
    return NextResponse.next();
  }

  // Check for auth cookie
  const authCookie = request.cookies.get(AUTH_COOKIE_NAME);
  if (authCookie?.value === 'authenticated') {
    return NextResponse.next();
  }

  // Handle POST request (form submission)
  if (request.method === 'POST') {
    return NextResponse.next();
  }

  // Check URL for password parameter (from form redirect)
  const url = new URL(request.url);
  const submittedPassword = url.searchParams.get('_pw');

  if (submittedPassword === sitePassword) {
    // Password correct - set cookie and redirect to clean URL
    url.searchParams.delete('_pw');
    const response = NextResponse.redirect(url);
    response.cookies.set(AUTH_COOKIE_NAME, 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
    return response;
  }

  // Show error if wrong password was submitted
  const showError = url.searchParams.has('_pw');

  // Return password prompt page
  const loginPageHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>BunnyKitty - Enter Password</title>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800&display=swap" rel="stylesheet">
      <style>
        :root {
          --pop-yellow: #FFE135;
          --pop-pink: #FF6EB4;
          --pop-red: #FF3B3B;
          --black: #1A1A1A;
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: 'Nunito', system-ui, sans-serif;
          background: var(--pop-yellow);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .container {
          background: white;
          border: 4px solid var(--black);
          box-shadow: 8px 8px 0 var(--black);
          padding: 3rem;
          max-width: 400px;
          width: 100%;
          text-align: center;
        }
        h1 {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: -1px;
        }
        .subtitle {
          color: #666;
          margin-bottom: 2rem;
          font-size: 1.1rem;
        }
        input[type="password"] {
          width: 100%;
          padding: 1rem;
          font-size: 1.1rem;
          border: 3px solid var(--black);
          margin-bottom: 1rem;
          text-align: center;
          font-family: inherit;
        }
        input[type="password"]:focus {
          outline: none;
          border-color: var(--pop-pink);
        }
        button {
          width: 100%;
          padding: 1rem 2rem;
          font-size: 1.1rem;
          font-weight: 800;
          text-transform: uppercase;
          background: var(--pop-pink);
          color: var(--black);
          border: 3px solid var(--black);
          box-shadow: 4px 4px 0 var(--black);
          cursor: pointer;
          transition: all 0.2s;
          font-family: inherit;
        }
        button:hover {
          transform: translate(-2px, -2px);
          box-shadow: 6px 6px 0 var(--black);
        }
        button:active {
          transform: translate(2px, 2px);
          box-shadow: 2px 2px 0 var(--black);
        }
        .error {
          color: var(--pop-red);
          margin-bottom: 1rem;
          font-weight: 700;
          display: ${showError ? 'block' : 'none'};
        }
        .bunny {
          font-size: 4rem;
          margin-bottom: 1rem;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="bunny">🐰</div>
        <h1>BunnyKitty</h1>
        <p class="subtitle">This site is password protected</p>
        <p class="error">Incorrect password, try again</p>
        <form method="GET" action="${url.pathname}">
          <input type="password" name="_pw" placeholder="Enter password" required autofocus />
          <button type="submit">Enter Site</button>
        </form>
      </div>
    </body>
    </html>
  `;

  return new NextResponse(loginPageHtml, {
    status: 401,
    headers: {
      'Content-Type': 'text/html',
    },
  });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc)
     */
    '/((?!_next/static|_next/image|favicon.ico|images/).*)',
  ],
};
