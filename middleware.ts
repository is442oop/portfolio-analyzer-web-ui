import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });
    const { data, error } = await supabase.auth.getSession();
    if (error || !data.session?.user) {
        const url = req.nextUrl.clone();
        url.pathname = "/auth";
        return NextResponse.redirect(url);
    }
    return res;
}

export const config = {
    matcher: [
        // Match all request paths except for the ones starting with:
        // - auth (authentication routes)
        // - api (API routes)
        // - _next/static (static files)
        // - _next/image (image optimization files)
        // - favicon.ico (favicon file)
        "/((?!api|_next/static|_next/image|favicon.ico|auth/*).*)",
    ],
};
