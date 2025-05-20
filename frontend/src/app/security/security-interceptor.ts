import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { SecurityStore } from "./security-store";

export const securityInterceptor: HttpInterceptorFn = (req, next) => {
    
  const securityStore = inject(SecurityStore);
  
  const bearer = securityStore.user()?.bearer;
  console.log("in the interceptor ", securityStore.user());
  console.log("in the interceptor loadedUser ", securityStore.loadedUser());
  console.log("in the interceptor signedin ", securityStore.signedIn());

  if (!bearer) {
    return next(req);
  }
  
  return next(
    req.clone({
      headers: req.headers.set("Authorization", `Bearer ${bearer}`),
    })
  );
};