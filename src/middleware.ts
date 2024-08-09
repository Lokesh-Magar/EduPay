import { RouteMatcher } from "next/dist/server/future/route-matchers/route-matcher";
import { NextRequest, NextResponse } from "next/server"

//Redirecting if the requested url is entered.
export function middleware(request:NextRequest){

    console.log(`Middleware ran. The direct instance of ${request.url} was invoked.`);

  

    //  return NextResponse.redirect(new URL('/login',request.url));
//  if(request.nextUrl.pathname="/dashboard"){
  //  }

}
// export const config = {
//     // matcher:["/userlist/:path*"],
//     matcher:["/dashboard"],
// }   

