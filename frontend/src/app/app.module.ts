import { HttpClientModule } from "@angular/common/http";
import { NgModule, ErrorHandler } from "@angular/core";
import { AuthButtonsComponent } from "./components/auth-buttons/auth-buttons.component";

@NgModule({
    imports: [
      HttpClientModule,
    ],
    providers: [
      {
        provide: ErrorHandler,
      },
    ],
    declarations: [
      AuthButtonsComponent
    ],
    exports: []
  })
  export class AppModule {}
  