import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Component
import { SocialAboutComponent } from './containers/social-about/social-about.component';
import { BasicAboutComponent } from './containers/basic-about/basic-about.component';
import { OverviewAboutComponent } from './containers/overview-about/overview-about.component';
import { PersonalPageComponent } from './containers/personal-page/personal-page.component';
import { TimelineComponent } from './containers/timeline/timeline.component';
import { AboutComponent } from './containers/about/about.component';
import { FriendsComponent } from './containers/friends/friends.component';
import { PhotosComponent } from './containers/photos/photos.component';
import { AllPhotosComponent } from './containers/all-photos/all-photos.component';
import { VideoComponent } from './containers/video/video.component';
import { AllVideosComponent } from './containers/all-videos/all-videos.component';
import { LiveAboutComponent } from './containers/live-about/live-about.component';
import { RelationshipAboutComponent } from './containers/relationship-about/relationship-about.component';
import { AlbumPhotoComponent } from './containers/album-photo/album-photo.component';
import { SuggestFriendComponent } from './containers/suggest-friend/suggest-friend.component';
import { RequestFriendComponent } from './containers/request-friend/request-friend.component';
import { AlbumVideoComponent } from './containers/album-video/album-video.component';
import { AllFriendComponent } from './containers/all-friend/all-friend.component';
import { ProfileComponent } from './containers/profile/profile.component';
import { ProfileAboutComponent } from './containers/profile-about/profile-about.component';
import { ProfileBasicAboutComponent } from './containers/profile-basic-about/profile-basic-about.component';
import { ProfileLiveAboutComponent } from './containers/profile-live-about/profile-live-about.component';
import { ProfileRelationAboutComponent } from './containers/profile-relation-about/profile-relation-about.component';
import { ProfileSocialAboutComponent } from './containers/profile-social-about/profile-social-about.component';
import { ProfileTimelineComponent } from './containers/profile-timeline/profile-timeline.component';
import { ProfileFriendsComponent } from './containers/profile-friends/profile-friends.component';
import { ProfileVideoComponent } from './containers/profile-video/profile-video.component';
import { ProfilePhotosComponent } from './containers/profile-photos/profile-photos.component';
import { ProfileAllFriendComponent } from './containers/profile-all-friend/profile-all-friend.component';
import { ProfileMutualFriendsComponent } from './containers/profile-mutual-friends/profile-mutual-friends.component';
import { BlockedFriendComponent } from './containers/blocked-friend/blocked-friend.component';
import { VideoDetailAlbumComponent } from './containers/video-detail-album/video-detail-album.component';
import { PhotoDetailAlbumComponent } from './containers/photo-detail-album/photo-detail-album.component';
import { ProfileWorkAboutComponent } from './containers/profile-work-about/profile-work-about.component';
import { ProfileStudyAboutComponent } from './containers/profile-study-about/profile-study-about.component';
import { StudyAboutComponent } from './containers/study-about/study-about.component';
import { WorkAboutComponent } from './containers/work-about/work-about.component';
import { ProfileVideoDetailAlbumComponent } from './containers/profile-video-detail-album/profile-video-detail-album.component';
import { ProfilePhotoDetailAlbumComponent } from './containers/profile-photo-detail-album/profile-photo-detail-album.component';
import { ProfileAlbumVideoComponent } from './containers/profile-album-video/profile-album-video.component';
import { ProfileAllVideosComponent } from './containers/profile-all-videos/profile-all-videos.component';
import { ProfileAlbumPhotoComponent } from './containers/profile-album-photo/profile-album-photo.component';
import { ProfileAllPhotosComponent } from './containers/profile-all-photos/profile-all-photos.component';

const routes: Routes = [
    { path: '', redirectTo: 'user', pathMatch: 'full' },
    {
        path: 'user', component: PersonalPageComponent, children: [
            { path: '', redirectTo: 'timeline', pathMatch: 'full' },
            { path: 'timeline', component: TimelineComponent },
            {
                path: 'about', component: AboutComponent, children: [
                    { path: '', redirectTo: 'overview', pathMatch: 'full' },
                    { path: 'overview', component: OverviewAboutComponent },
                    { path: 'basic', component: BasicAboutComponent },
                    { path: 'work', component: WorkAboutComponent },
                    { path: 'study', component: StudyAboutComponent },
                    { path: 'live', component: LiveAboutComponent },
                    { path: 'relation', component: RelationshipAboutComponent },
                    { path: 'social', component: SocialAboutComponent },
                ]
            },
            {
                path: 'friend', component: FriendsComponent, children: [
                    { path: '', redirectTo: 'all', pathMatch: 'full' },
                    { path: 'all', component: AllFriendComponent },
                    { path: 'request', component: RequestFriendComponent },
                    { path: 'suggest', component: SuggestFriendComponent },
                    { path: 'blocked', component: BlockedFriendComponent },
                ]
            },
            {
                path: 'photo', component: PhotosComponent, children: [
                    { path: '', redirectTo: 'all', pathMatch: 'full' },
                    { path: 'all', component: AllPhotosComponent },
                    { path: 'album', component: AlbumPhotoComponent },
                    { path: 'detail', component: PhotoDetailAlbumComponent },
                ]
            },
            {
                path: 'video', component: VideoComponent, children: [
                    { path: '', redirectTo: 'all', pathMatch: 'full' },
                    { path: 'all', component: AllVideosComponent },
                    { path: 'album', component: AlbumVideoComponent },
                    { path: 'detail', component: VideoDetailAlbumComponent },
                ]
            },
        ],
    },
    {
        path: 'profile/:id', component: ProfileComponent, children: [
            { path: '', redirectTo: 'timeline', pathMatch: 'full' },
            { path: 'timeline', component: ProfileTimelineComponent },
            {
                path: 'about', component: ProfileAboutComponent, children: [
                    { path: '', redirectTo: 'basic', pathMatch: 'full' },
                    { path: 'basic', component: ProfileBasicAboutComponent },
                    { path: 'work', component: ProfileWorkAboutComponent },
                    { path: 'study', component: ProfileStudyAboutComponent },
                    { path: 'live', component: ProfileLiveAboutComponent },
                    { path: 'relation', component: ProfileRelationAboutComponent },
                    { path: 'social', component: ProfileSocialAboutComponent },
                ]
            },
            {
                path: 'friend', component: ProfileFriendsComponent, children: [
                    { path: '', redirectTo: 'all', pathMatch: 'full' },
                    { path: 'all', component: ProfileAllFriendComponent },
                    { path: 'mutualfriends', component: ProfileMutualFriendsComponent },
                ]
            },
            {
                path: 'photo', component: ProfilePhotosComponent, children: [
                    { path: '', redirectTo: 'all', pathMatch: 'full' },
                    { path: 'all', component: ProfileAllPhotosComponent },
                    { path: 'album', component: ProfileAlbumPhotoComponent },
                    { path: 'detail', component: ProfilePhotoDetailAlbumComponent },
                ]
            },
            {
                path: 'video', component: ProfileVideoComponent, children: [
                    { path: '', redirectTo: 'all', pathMatch: 'full' },
                    { path: 'all', component: ProfileAllVideosComponent },
                    { path: 'album', component: ProfileAlbumVideoComponent },
                    { path: 'detail', component: ProfileVideoDetailAlbumComponent },
                ]
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PersonaInfomationRoutingModule { }
