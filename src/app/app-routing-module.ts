import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BookmarksComponent } from "./bookmarks/bookmarks.component";
import { FinderComponent } from "./finder/finder.component";
import { ProfileComponent } from "./profile/profile.component";
import { AuthGuard } from "./services/auth.guard";


const routes: Routes = [
  { path: 'bookmarks', component: BookmarksComponent, canActivate: [AuthGuard] },
  { path: 'finder', component: FinderComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '', redirectTo: 'finder', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
