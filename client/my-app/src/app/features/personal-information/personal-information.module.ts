import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Module
import { PostModule } from './../post/post.module';
import { ImageCropperModule } from 'ngx-image-cropper';
import { SharedModule } from 'src/app/shared/shared.module';
// Routing
import { PersonaInfomationRoutingModule } from './personal-information-routing.module';
// Mat
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatRadioModule } from '@angular/material/radio';
// Components
import { PersonalPageComponent } from './containers/personal-page/personal-page.component';
import { TimelineComponent } from './containers/timeline/timeline.component';
import { AboutComponent } from './containers/about/about.component';
import { FriendsComponent } from './containers/friends/friends.component';
import { PhotosComponent } from './containers/photos/photos.component';
import { InteractiveNumbersTabComponent } from './components/interactive-numbers-tab/interactive-numbers-tab.component';
import { AboutTabComponent } from './components/about-tab/about-tab.component';
import { PictureTabComponent } from './components/picture-tab/picture-tab.component';
import { SongTabComponent } from './components/song-tab/song-tab.component';
import { FriendTabComponent } from './components/friend-tab/friend-tab.component';
import { AboutFieldComponent } from './components/about-field/about-field.component';
import { AllPhotosComponent } from './containers/all-photos/all-photos.component';
import { AllVideosComponent } from './containers/all-videos/all-videos.component';
import { VideoComponent } from './containers/video/video.component';
import { DialogUploadAvatarComponent } from './components/dialog-upload-avatar/dialog-upload-avatar.component';
import { DialogUploadCoverComponent } from './components/dialog-upload-cover/dialog-upload-cover.component';
import { NameFieldComponent } from './components/name-field/name-field.component';
import { BirthDayFieldComponent } from './components/birth-day-field/birth-day-field.component';
import { PhoneFieldComponent } from './components/phone-field/phone-field.component';
import { StudyFieldComponent } from './components/study-field/study-field.component';
import { WorkFieldComponent } from './components/work-field/work-field.component';
import { RelationshipFieldComponent } from './components/relationship-field/relationship-field.component';
import { LiveFieldComponent } from './components/live-field/live-field.component';
import { OverviewAboutComponent } from './containers/overview-about/overview-about.component';
import { BasicAboutComponent } from './containers/basic-about/basic-about.component';
import { LiveAboutComponent } from './containers/live-about/live-about.component';
import { RelationshipAboutComponent } from './containers/relationship-about/relationship-about.component';
import { AllFriendComponent } from './containers/all-friend/all-friend.component';
import { RequestFriendComponent } from './containers/request-friend/request-friend.component';
import { SuggestFriendComponent } from './containers/suggest-friend/suggest-friend.component';
import { AlbumPhotoComponent } from './containers/album-photo/album-photo.component';
import { AlbumVideoComponent } from './containers/album-video/album-video.component';
import { LinkFieldComponent } from './components/link-field/link-field.component';
import { SocialAboutComponent } from './containers/social-about/social-about.component';
import { FriendFieldComponent } from './components/friend-field/friend-field.component';
import { DialogUploadPhotoComponent } from './components/dialog-upload-photo/dialog-upload-photo.component';
import { DialogUploadVideoComponent } from './components/dialog-upload-video/dialog-upload-video.component';
import { ProfileComponent } from './containers/profile/profile.component';
import { ProfileTimelineComponent } from './containers/profile-timeline/profile-timeline.component';
import { ProfileFeatureTabComponent } from './components/profile-feature-tab/profile-feature-tab.component';
import { ProfileAboutComponent } from './containers/profile-about/profile-about.component';
import { ProfileBasicAboutComponent } from './containers/profile-basic-about/profile-basic-about.component';
import { ProfileLiveAboutComponent } from './containers/profile-live-about/profile-live-about.component';
import { ProfileRelationAboutComponent } from './containers/profile-relation-about/profile-relation-about.component';
import { ProfileSocialAboutComponent } from './containers/profile-social-about/profile-social-about.component';
import { ProfileAllFriendComponent } from './containers/profile-all-friend/profile-all-friend.component';
import { ProfileFriendsComponent } from './containers/profile-friends/profile-friends.component';
import { ProfilePhotosComponent } from './containers/profile-photos/profile-photos.component';
import { ProfileVideoComponent } from './containers/profile-video/profile-video.component';
import { ProfileMutualFriendsComponent } from './containers/profile-mutual-friends/profile-mutual-friends.component';
import { BlockedFriendComponent } from './containers/blocked-friend/blocked-friend.component';
import { DialogUploadAlbumPhotoComponent } from './components/dialog-upload-album-photo/dialog-upload-album-photo.component';
import { DialogUploadAlbumVideoComponent } from './components/dialog-upload-album-video/dialog-upload-album-video.component';
import { PhotoDetailAlbumComponent } from './containers/photo-detail-album/photo-detail-album.component';
import { VideoDetailAlbumComponent } from './containers/video-detail-album/video-detail-album.component';
import { DialogDeletePhotoComponent } from './components/dialog-delete-photo/dialog-delete-photo.component';
import { DialogDeleteAlbumComponent } from './components/dialog-delete-album/dialog-delete-album.component';
import { ProfileAllPhotosComponent } from './containers/profile-all-photos/profile-all-photos.component';
import { ProfileAlbumPhotoComponent } from './containers/profile-album-photo/profile-album-photo.component';
import { ProfileAllVideosComponent } from './containers/profile-all-videos/profile-all-videos.component';
import { ProfileAlbumVideoComponent } from './containers/profile-album-video/profile-album-video.component';
import { ProfilePhotoDetailAlbumComponent } from './containers/profile-photo-detail-album/profile-photo-detail-album.component';
import { ProfileVideoDetailAlbumComponent } from './containers/profile-video-detail-album/profile-video-detail-album.component';
import { GenderFieldComponent } from './components/gender-field/gender-field.component';
import { WorkAboutComponent } from './containers/work-about/work-about.component';
import { StudyAboutComponent } from './containers/study-about/study-about.component';
import { ProfileWorkAboutComponent } from './containers/profile-work-about/profile-work-about.component';
import { ProfileStudyAboutComponent } from './containers/profile-study-about/profile-study-about.component';
// Store
import { EffectsModule } from '@ngrx/effects';
import { PersonalInformationEffects } from './state/personal-information.effects';

@NgModule({
  declarations: [
    // Component
    PersonalPageComponent,
    TimelineComponent,
    AboutComponent,
    FriendsComponent,
    PhotosComponent,
    InteractiveNumbersTabComponent,
    AboutTabComponent,
    PictureTabComponent,
    SongTabComponent,
    FriendTabComponent,
    AboutFieldComponent,
    AllPhotosComponent,
    AllVideosComponent,
    VideoComponent,
    DialogUploadAvatarComponent,
    DialogUploadCoverComponent,
    NameFieldComponent,
    BirthDayFieldComponent,
    PhoneFieldComponent,
    StudyFieldComponent,
    WorkFieldComponent,
    RelationshipFieldComponent,
    LiveFieldComponent,
    OverviewAboutComponent,
    BasicAboutComponent,
    LiveAboutComponent,
    RelationshipAboutComponent,
    AllFriendComponent,
    RequestFriendComponent,
    SuggestFriendComponent,
    AlbumPhotoComponent,
    AlbumVideoComponent,
    LinkFieldComponent,
    SocialAboutComponent,
    FriendFieldComponent,
    DialogUploadPhotoComponent,
    DialogUploadVideoComponent,
    ProfileComponent,
    ProfileTimelineComponent,
    ProfileFeatureTabComponent,
    ProfileAboutComponent,
    ProfileBasicAboutComponent,
    ProfileLiveAboutComponent,
    ProfileRelationAboutComponent,
    ProfileSocialAboutComponent,
    ProfileAllFriendComponent,
    ProfileFriendsComponent,
    ProfilePhotosComponent,
    ProfileVideoComponent,
    ProfileMutualFriendsComponent,
    BlockedFriendComponent,
    DialogUploadAlbumPhotoComponent,
    DialogUploadAlbumVideoComponent,
    PhotoDetailAlbumComponent,
    VideoDetailAlbumComponent,
    DialogDeletePhotoComponent,
    DialogDeleteAlbumComponent,
    ProfileAllPhotosComponent,
    ProfileAlbumPhotoComponent,
    ProfileAllVideosComponent,
    ProfileAlbumVideoComponent,
    ProfilePhotoDetailAlbumComponent,
    ProfileVideoDetailAlbumComponent,
    GenderFieldComponent,
    WorkAboutComponent,
    StudyAboutComponent,
    ProfileWorkAboutComponent,
    ProfileStudyAboutComponent,
  ],
  imports: [
    CommonModule,
    // Router
    PersonaInfomationRoutingModule,
    // Module
    PostModule,
    SharedModule,
    ImageCropperModule,
    // Mat
    MatCheckboxModule,
    MatExpansionModule,
    MatDialogModule,
    MatGridListModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSelectModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatRadioModule,
    // Store
    EffectsModule.forFeature([PersonalInformationEffects])
  ],
  exports: [FriendFieldComponent]
})
export class PersonalInformationModule { }
