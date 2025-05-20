import { computed, inject, Injectable, PLATFORM_ID, signal } from "@angular/core";
import { KeycloakService } from "./keycloak-service";
import { isPlatformServer } from "@angular/common";
import { ANONYMOUS_USER, User } from "./models";

@Injectable({ providedIn: "root" })
export class SecurityStore {

  loaded = signal(false);
  user = signal<User | undefined>(undefined);

  loadedUser = computed(() => (this.loaded() ? this.user() : undefined));
  signedIn = computed(() => this.loaded() && !this.user()?.anonymous);

  constructor(private keycloakService: KeycloakService) {
    console.log("in the constructor of SecurityStore ");
    this.onInit();
  }

 async onInit() {
    const isServer = isPlatformServer(inject(PLATFORM_ID));
    console.log("isServer ", isServer);
    
    if (isServer) {
      this.user.set(ANONYMOUS_USER);
      this.loaded.set(true);
      return;
    }

    console.log("NOT isServer ");
    const isLoggedIn = await this.keycloakService.init();
    console.log("isLoggedIn = ", isLoggedIn);
    console.log("this.keycloakService.profile = ", this.keycloakService.profile)
    if (isLoggedIn && this.keycloakService.profile) {
      const { sub, email, given_name, family_name, token } =
        this.keycloakService.profile;
      const user = {
        id: sub,
        email,
        name: `${given_name} ${family_name}`,
        anonymous: false,
        bearer: token,
      };
      this.user.set(user);
      this.loaded.set(true);
    } else {
      this.user.set(ANONYMOUS_USER);
      this.loaded.set(true);
    }
  }

  async signIn() {
    await this.keycloakService.login();
  }

  async signOut() {
    await this.keycloakService.logout();
  }
}