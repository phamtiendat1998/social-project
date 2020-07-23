import { UserInfo } from '../../../../shared/core/interface/user-info.interface';
export interface SongMusic {
    id: string;
    name: string;
    totalTime: string;
    time: string;
    url: string;
    cover: string;
    userInfo: UserInfo;
}