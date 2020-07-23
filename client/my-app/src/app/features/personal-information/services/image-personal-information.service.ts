import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// Key
import { domain } from 'src/app/shared/core/key/domain';
import { pagingImages } from 'src/app/shared/core/key/header';
// Response Data
import { ResponseData } from 'src/app/shared/core/interface/response-data.interface';
import { map } from 'rxjs/operators';
// Store
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
// Helper
import { jsonMedia } from 'src/app/shared/core/helper/json-media';
import { UserPhoto } from '../core/interfaces/user-photo.interface';
import { PhotoTab } from '../core/interfaces/photo-tab.interface';

@Injectable({
    providedIn: 'root'
})
export class ImagePersonalInformationService {
    private uploadImageApi = domain + '/api/usermedia/uploadimage';
    private uploadImageAlbumApi = domain + '/api/usermedia/createalbumimage';
    private getImageAndAlbumQuantityAPI = domain + '/api/usermedia/quantitymedia';
    private getAllImageAlbumApi = domain + '/api/usermedia/getimages';
    private getAlbumDetailApi = domain + '';
    private deleteImageAlbumApi = domain + '';
    private uploadAvatarOrCoverAPI = domain + '/api/upload/uploadavatarOrcover';
    private getAccountApi = domain + '/api/useraccount/getaccount';
    private getAllImageApi = domain + '/api/newsfeed/getimagesofpost';
    constructor(
        private httpClient: HttpClient,
    ) { }
    /*
    @ Upload image to all image
    @ Input: User id, Images
    */
    uploadImage(
        idUser: string,
        images: Array<string>,
        privacy: boolean
    ): Observable<any> {
        return this.httpClient.post<ResponseData>(`${this.uploadImageApi}`,
            {
                // --------
            })
            .pipe(
                map(res => {
                    console.log(res);
                })
            );
    }
    /*
    @ Upload image album
    @ Input: User id, NAme, Description, Images
    */
    uploadImageAlbum(
        idUser: string,
        name: string,
        des: string,
        images: Array<string>,
        privacy: boolean
    ) {
        return this.httpClient.post<ResponseData>(`${this.uploadImageAlbumApi}`,
            {
                // -----
            })
            .pipe(
                map(res => {
                    console.log(res);
                })
            );
    }
    /*
    @ Get image and album quantity
    @ Input : user id
    */
    getImageAndAlbumQuantity(userId: string): Observable<any> {
        return this.httpClient.get<ResponseData>(`${this.getImageAndAlbumQuantityAPI}?idUser=${userId}&type=${3}`)
            .pipe(
                map(res => {
                    if (res.Data) {
                        // map return array
                    } else {
                        return null;
                    }
                })
            );
    }
    /*
    @ Get all image user
    @ Input : user id
    */
    getAllImages(userId: string, publicState: boolean): Observable<UserPhoto[]> {
        return this.httpClient.post<ResponseData>(`${this.getAllImageApi}`, {
            IdUser: userId,
            Status: publicState ? 1 : 2
        })
            .pipe(
                map(res => {
                    if (res.Data) {
                        return res.Data.map(item => {
                            const photo: UserPhoto = {
                                id: item.IdImage,
                                url: item.ImagesUrl,
                                contentPost: item.Post.Content,
                                quantityCommentPost: item.Post.QuantityComment,
                                quatityLikePost: item.Post.QuantityLike,
                                timePost: new Date(item.Post.CreatedTS).toLocaleString()
                            }
                            return photo;
                        });
                    } else {
                        return null;
                    }
                })
            );
    }
    /*
    @ Get all image user
    @ Input : user id
    */
    getImagesTab(userId: string, publicState: boolean): Observable<PhotoTab[]> {
        return this.httpClient.post<ResponseData>(`${this.getAllImageApi}`, {
            IdUser: userId,
            Status: publicState ? 1 : 2
        })
            .pipe(
                map(res => {
                    if (res.Data) {
                        let photos: PhotoTab[] = [];
                        for (let index = 0; index < res.Data.length && index < 9; index++) {
                            const item = res.Data[index];
                            const photo: PhotoTab = {
                                id: item.IdImage,
                                url: item.ImagesUrl
                            };
                            photos.push(photo);
                        }
                        return photos;
                    } else {
                        return null;
                    }
                })
            );
    }
    /*
    @ Get all image user
    @ Input : user id
    */
    getAllImageAlbum(userId: string): Observable<any> {
        return this.httpClient.get<ResponseData>(`${this.getAllImageAlbumApi}?idUser=${userId}`)
            .pipe(
                map(res => {
                    if (res.Data) {
                        // map return array
                    } else {
                        return null;
                    }
                })
            );
    }
    /*
    @ Get album detail
    @ Input: album Id
    */
    getAlbumDetail(idAlbum: string): Observable<any> {
        return this.httpClient.get<ResponseData>(`${this.getAlbumDetailApi}?idAlbum=${idAlbum}`)
            .pipe(
                map(res => {
                    if (res.Data) {
                        // map return array
                    } else {
                        return null;
                    }
                })
            );
    }
    /*
    @ Delete Album
    @ Input: album Id
    */
    deleteImageAlbum(albumId: string) { return; }
    /*
    @ Edit Album
    @ Input: album Id
    */
    editImageAlbum(albumId: string) { return; }
    /*
    @ Upload avatar
    */
    uploadAvatar(userId: string, newAvatar: string): Observable<boolean> {
        return this.httpClient.post<ResponseData>(`${this.uploadAvatarOrCoverAPI}`, {
            IdUser: userId,
            Avatar: jsonMedia(newAvatar)
        })
            .pipe(
                map(res => {
                    if (res.Data === 'success') {
                        return true
                    } else {
                        return false;
                    }
                })
            );
    }
    /*
    @ Get account 
    @ Input: idUser
    */
    getCover(idUser: string): Observable<string> {
        return this.httpClient.get<any>(`${this.getAccountApi}?idUser=${idUser}`)
            .pipe(
                map(res => {
                    if (res) {
                        const cover = res.Cover;
                        return cover;
                    } else {
                        return null;
                    }
                })
            );
    }
    /*
    @ Upload avatar
    */
    uploadCover(userId: string, newCover: string): Observable<boolean> {
        return this.httpClient.post<ResponseData>(`${this.uploadAvatarOrCoverAPI}`, {
            IdUser: userId,
            Cover: jsonMedia(newCover)
        })
            .pipe(
                map(res => {
                    if (res.Data === 'success') {
                        return true
                    } else {
                        return false;
                    }
                })
            );
    }
}
