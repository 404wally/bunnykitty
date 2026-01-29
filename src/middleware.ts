import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Password protection for the site
// Set these in your environment variables on Vercel
const SITE_PASSWORD = process.env.SITE_PASSWORD || 'bunnykitty2026';
const AUTH_COOKIE_NAME = 'bunnykitty-auth';

export function middleware(request: NextRequest) {
  // Skip password protection if no password is set or in development
  if (!process.env.SITE_PASSWORD) {
    return NextResponse.next();
  }

  // Check for auth cookie
  const authCookie = request.cookies.get(AUTH_COOKIE_NAME);
  if (authCookie?.value === 'authenticated') {
    return NextResponse.next();
  }

  // Check for password in URL (for login form submission)
  const url = new URL(request.url);
  if (url.pathname === '/api/auth' && request.method === 'POST') {
    return NextResponse.next();
  }

  // Check for Basic Auth header
  const authHeader = request.headers.get('authorization');
  if (authHeader) {
    const [scheme, encoded] = authHeader.split(' ');
    if (scheme === 'Basic') {
      const decoded = atob(encoded);
      const [, password] = decoded.split(':');
      if (password === SITE_PASSWORD) {
        const response = NextResponse.next();
        response.cookies.set(AUTH_COOKIE_NAME, 'authenticated', {
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
          maxAge: 60 * 60 * 24 * 7, // 1 week
        });
        return response;
      }
    }
  }

  // Return password prompt page
  const loginPageHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>BunnyKitty - Enter Password</title>
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
          font-size: 2rem;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
        }
        .subtitle {
          color: #666;
          margin-bottom: 2rem;
        }
        input {
          width: 100%;
          padding: 1rem;
          font-size: 1rem;
          border: 3px solid var(--black);
          margin-bottom: 1rem;
          text-align: center;
        }
        button {
          width: 100%;
          padding: 1rem 2rem;
          font-size: 1rem;
          font-weight: 800;
          text-transform: uppercase;
          background: var(--pop-pink);
          border: 3px solid var(--black);
          box-shadow: 4px 4px 0 var(--black);
          cursor: pointer;
          transition: all 0.2s;
        }
        button:hover {
          transform: translate(-2px, -2px);
          box-shadow: 6px 6px 0 var(--black);
        }
        .error {
          color: var(--pop-red);
          margin-bottom: 1rem;
          display: none;
        }
        .error.show { display: block; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>BunnyKitty</h1>
        <p class="subtitle">This site is password protected</p>
        <p class="error" id="error">Incorrect password</p>
        <form id="authForm">
          <input type="password" id="password" placeholder="Enter password" required autofocus />
          <button type="submit">Enter</button>
        </form>
      </div>
      <script>
        document.getElementById('authForm').addEventListener('submit', async (e) => {
          e.preventDefault();
          const password = document.getElementById('password').value;
          const credentials = btoa(':' + password);

          const response = await fetch(window.location.href, {
            headers: { 'Authorization': 'Basic ' + credentials }
          });

          if (response.ok) {
            window.location.reload();
          } else {
            document.getElementById('error').classList.add('show');
            document.getElementById('password').value = '';
          }
        });
      </script>
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
