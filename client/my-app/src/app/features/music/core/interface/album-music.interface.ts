import { UserInfo } from './../../../../shared/core/interface/user-info.interface';
export interface AlbumMusic {
    id: string,
    name: string,
    cover: string,
    quantitySong: number,
    userInfo: UserInfo
}