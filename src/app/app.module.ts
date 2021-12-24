import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { HeaderComponent } from './components/header/header.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { TestServiceComponent } from './components/tests/service.component';
import { ActionsCategoryComponent } from './components/categories/actions/actionscategory.component';
import { HomeCategoriesComponent } from './components/homecategories/homecategories.component';
import { ActionsHomeCategoryComponent } from './components/homecategories/actions/actionhomecategories.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { TagsComponent } from './components/tags/tags.component';
import { TopTearmsComponent } from './components/topteams/topteams.component';
import { UsersComponent } from './components/users/users.component';
import { AlbumsComponent } from './components/albums/albums.component';
import { VideosComponent } from './components/videos/videos.component';
import { ActionsVideosComponent } from './components/videos/actions/actionsvideos.component';
import { TVProgramsComponent } from './components/tvprograms/tvprograms.component';
import { ActionsArticleComponent } from './components/articles/actions/actionsarticle.component';
import { ActionsTagComponent } from './components/tags/actions/actionstag.component';
import { ActionsTopTeamComponent } from './components/topteams/actions/actionstopteam.component';
import { ActionsUserTeamComponent } from './components/users/actions/actionsuser.component';
import { ActionsAlbumComponent } from './components/albums/actions/actionsalbum.component';
import { AdsComponent } from './components/ads/ads.component';
import { ActionsAdsComponent } from './components/ads/actions/actionsads.component';
import { ClubsComponent } from './components/clubs/clubs.component';
import { ActionsClubsComponent } from './components/clubs/actions/actionsclubs.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { PlayersComponent } from './components/players/players.component';
import { ActionsPlayersComponent } from './components/players/actions/actionsplayers.component';

import { ChampionatsComponent } from './components/championats/championats.component';
import { ActionsChampionatsComponent } from './components/championats/actions/actionschampionats.component';

import { PollsComponent } from './components/polls/polls.component';
import { ActionsPollsComponent } from './components/polls/actions/actionspolls.component';

import { CommentsComponent } from './components/comments/comments.component';
import { ActionsCommentsComponent } from './components/comments/actions/actionscomments.component';

import { HTTPService } from './http.service';
import { AuthGuard } from './auth.guard';
import { CKEditorModule } from 'ngx-ckeditor';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DlDateTimePickerDateModule } from 'angular-bootstrap-datetimepicker';

import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import {ModalAutolinkComponent} from './components/articles/actions/modal-autolink.component';
import {ModalResultsComponent} from './components/articles/actions/modal-results.component';
import {ModalGoalscorersComponent} from './components/articles/actions/modal-goalscorers.component';
import {ModalStandingsComponent} from './components/articles/actions/modal-standings.component';
import {ModalUploadVideoComponent} from './components/articles/actions/modal-upload-video.component';
import {AutoLinkerComponent} from './components/auto-linkers/auto-linker.component';
import {ActionsAutolinkerComponent} from './components/auto-linkers/actions/actions-autolinker.component';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {PrerollsComponent} from './components/prerolls/prerolls.component';
import {ActionsPrerollsComponent} from './components/prerolls/actions/actions-prerolls.component';
import {TransferSeasonsComponent} from './components/transfer-seasons/transfer-seasons.component';
import {ActionsTransferSeasonsComponent} from './components/transfer-seasons/actions/actions-transfer-seasons.component';
import {TransfersComponent} from './components/transfers/transfers.component';
import {ActionsTransfersComponent} from './components/transfers/actions/actions-transfers.component';




const appRoutes: Routes = [
    { path: '', component: LoginComponent },

    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },

    { path: 'categories', component: CategoriesComponent, canActivate: [AuthGuard] },
    { path: 'categories/:id', component: ActionsCategoryComponent, canActivate: [AuthGuard] },

    { path: 'home-categories', component: HomeCategoriesComponent, canActivate: [AuthGuard] },
    { path: 'home-categories/:id', component: ActionsHomeCategoryComponent, canActivate: [AuthGuard] },

    { path: 'articles', component: ArticlesComponent, canActivate: [AuthGuard] },
    { path: 'articles/:id', component: ActionsArticleComponent, canActivate: [AuthGuard] },

    { path: 'tags', component: TagsComponent, canActivate: [AuthGuard] },
    { path: 'tags/:id', component: ActionsTagComponent, canActivate: [AuthGuard] },

  { path: 'anchors', component: AutoLinkerComponent, canActivate: [AuthGuard] },
  { path: 'anchors/:id', component: ActionsAutolinkerComponent, canActivate: [AuthGuard] },

  { path: 'prerolls', component: PrerollsComponent, canActivate: [AuthGuard] },
  { path: 'prerolls/:id', component: ActionsPrerollsComponent, canActivate: [AuthGuard] },

    { path: 'top-teams', component: TopTearmsComponent, canActivate: [AuthGuard] },
    { path: 'top-teams/:id', component: ActionsTopTeamComponent, canActivate: [AuthGuard] },

    { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
    { path: 'users/:id', component: ActionsUserTeamComponent, canActivate: [AuthGuard] },

    { path: 'albums', component: AlbumsComponent, canActivate: [AuthGuard] },
    { path: 'albums/:id', component: ActionsAlbumComponent, canActivate: [AuthGuard] },

    { path: 'videos', component: VideosComponent, canActivate: [AuthGuard] },
    { path: 'videos/:id', component: ActionsVideosComponent, canActivate: [AuthGuard] },

    { path: 'tv-programs', component: TVProgramsComponent, canActivate: [AuthGuard] },

    { path: 'ads', component: AdsComponent, canActivate: [AuthGuard] },
    { path: 'ads/:id', component: ActionsAdsComponent, canActivate: [AuthGuard] },

    { path: 'polls', component: PollsComponent, canActivate: [AuthGuard] },
    { path: 'polls/:id', component: ActionsPollsComponent, canActivate: [AuthGuard] },

    { path: 'comments', component: CommentsComponent, canActivate: [AuthGuard] },
    { path: 'comments/:id', component: ActionsCommentsComponent, canActivate: [AuthGuard] },

  { path: 'clubs', component: ClubsComponent, canActivate: [AuthGuard] },
  { path: 'clubs/:id', component: ActionsClubsComponent, canActivate: [AuthGuard] },

  { path: 'transfer-seasons/:seasonId/transfers', component: TransfersComponent, canActivate: [AuthGuard] },
  { path: 'transfer-seasons/:seasonId/transfers/:id', component: ActionsTransfersComponent, canActivate: [AuthGuard] },
  { path: 'transfer-seasons', component: TransferSeasonsComponent, canActivate: [AuthGuard] },
  { path: 'transfer-seasons/:id', component: ActionsTransferSeasonsComponent, canActivate: [AuthGuard] },


    { path: 'players', component: PlayersComponent, canActivate: [AuthGuard] },
    { path: 'players/:id', component: ActionsPlayersComponent, canActivate: [AuthGuard] },

    { path: 'championats', component: ChampionatsComponent, canActivate: [AuthGuard] },
    { path: 'championats/:id', component: ActionsChampionatsComponent, canActivate: [AuthGuard] },

    { path: 'sidebar', component: SidebarComponent, canActivate: [AuthGuard] },

    { path: 'test-service', component: TestServiceComponent, canActivate: [AuthGuard] },
    { path: '**', component: NotfoundComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [BrowserModule, HttpModule,
         RouterModule.forRoot(appRoutes, { enableTracing: false }),
          CKEditorModule, NgMultiSelectDropDownModule.forRoot(), DlDateTimePickerDateModule,
          NgSelectModule, FormsModule, ModalModule.forRoot(),
          TagInputModule,
          BrowserAnimationsModule,
         ],
    declarations: [
        AppComponent, DashboardComponent,
        LoginComponent, NotfoundComponent, TestServiceComponent,
        MenuComponent, HeaderComponent,
        CategoriesComponent, ActionsCategoryComponent,
        HomeCategoriesComponent, ArticlesComponent, ModalAutolinkComponent, ModalResultsComponent, ModalGoalscorersComponent, ModalStandingsComponent, ModalUploadVideoComponent,
        TagsComponent, AutoLinkerComponent, ActionsAutolinkerComponent, TopTearmsComponent, PrerollsComponent, ActionsPrerollsComponent,
        UsersComponent, ActionsHomeCategoryComponent,
        AlbumsComponent, VideosComponent,
        TVProgramsComponent, ActionsArticleComponent,
        ActionsTagComponent, ActionsTopTeamComponent,
        ActionsUserTeamComponent, ActionsAlbumComponent,
        AdsComponent, ActionsAdsComponent , ClubsComponent,
        ActionsClubsComponent, PlayersComponent, ActionsPlayersComponent, ChampionatsComponent, ActionsChampionatsComponent,
        ActionsVideosComponent, PollsComponent, ActionsPollsComponent, CommentsComponent, ActionsCommentsComponent,
        SidebarComponent,
      TransferSeasonsComponent, ActionsTransferSeasonsComponent, TransfersComponent, ActionsTransfersComponent
    ],
  entryComponents: [
    ModalAutolinkComponent, ModalResultsComponent, ModalGoalscorersComponent, ModalStandingsComponent, ModalUploadVideoComponent
  ],
    providers: [HTTPService, AuthGuard],
    bootstrap: [ AppComponent ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    exports: [
        RouterModule
      ],
})

// bootstrap: [ AppComponent, MenuComponent, HeaderComponent ],

export class AppModule {
    ngOnInit() {

    }

}
