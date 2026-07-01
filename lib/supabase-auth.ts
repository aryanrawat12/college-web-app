import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import type { Database } from "@/lib/database.types";

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** Cookie-aware Supabase client for Server Components / route handlers.
 * Returns null when Supabase isn't configured. Use to read the admin session
 * server-side (getUser). */
export async function getServerAuthClient() {
  if (!URL || !KEY) return null;
  const cookieStore = await cookies();
  return createServerClient<Database>(URL, KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(list) {
        // In a Server Component the cookie store is read-only; ignore.
        try {
          list.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          /* called from a Server Component — middleware refreshes instead */
        }
      },
    },
  });
}

/** Middleware session refresh + /admin guard. Redirects unauthenticated
 * users to /admin/login, and logged-in users away from the login page. */
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });
  if (!URL || !KEY) return response;

  const supabase = createServerClient<Database>(URL, KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(list) {
        list.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        list.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  // IMPORTANT: getUser() (not getSession) — validates the token with Supabase.
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const path = request.nextUrl.pathname;

  if (!user && path.startsWith("/admin") && path !== "/admin/login") {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }
  if (user && path === "/admin/login") {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  return response;
}
