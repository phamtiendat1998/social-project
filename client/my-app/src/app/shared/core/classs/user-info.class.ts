export class UserInfo {
    userId: string;
    firstName: string;
    lastName: string;
    avatar: string;
    link: string;
    constructor(userid: string, firstname: string, lastname: string, avatar: string) {
        this.userId = userid;
        this.firstName = firstname;
        this.lastName = lastname;
        this.avatar = avatar;
        this.link = 'http://localhost:4200/home/personal/profile' + userid;
    }
    get getFullName() {
        return this.firstName + ' ' + this.lastName;
    }
}
