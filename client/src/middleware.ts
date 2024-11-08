//Redirecting if the requested url is entered.
export function middleware(req){

    console.log(`Middleware ran from src.The path ${req.url} is accessed.`);
    // const token = req.cookies.get('access_token');
    
    // try {
        
    //     if (req.nextUrl.pathname === '/backlogin') {
           
    //         return NextResponse.redirect(new URL('/dashboard', req.url));
    //     }

    //      else if (req.nextUrl.pathname === '/') {
    //         return NextResponse.redirect(new URL('/portal', req.url));
    //     }

    //     return NextResponse.next();
    // } 
    // catch {
    //     console.log("Invalid token");
       
    //     // return NextResponse.redirect(new URL('/backlogin', req.url));
    //     // Invalid token, redirect to login
    
    // }
}

// export const config = {
//     matcher: ['/dashboard/:path*','/portal/:path*'], 
//     // Apply to all dashboard routes
// };
