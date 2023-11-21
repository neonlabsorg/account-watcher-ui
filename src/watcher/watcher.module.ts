import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WatcherPageComponent } from './pages/watcher-page/watcher-page.component';
import { WatcherService } from './services/watcher.service';

const routes: Routes = [{ path: '', component: WatcherPageComponent }];

@NgModule({
  declarations: [WatcherPageComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  providers: [WatcherService]
})
export class WatcherModule {
}
