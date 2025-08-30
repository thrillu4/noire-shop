import { verifySession } from "@/lib/sessions";
import { ROUTES } from "@/routes";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = [ROUTES.PROFILE];
const publicRoutes = [ROUTES.SIGNIN, ROUTES.SIGNUP];

export const middleware = async (req: NextRequest) => {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const session = await verifySession();

  if (isProtectedRoute && !session.isAuth) {
    return NextResponse.redirect(new URL(ROUTES.SIGNIN, req.nextUrl));
  }

  if (isPublicRoute && session.isAuth) {
    return NextResponse.redirect(new URL(ROUTES.PROFILE, req.nextUrl));
  }

  return NextResponse.next();
};
