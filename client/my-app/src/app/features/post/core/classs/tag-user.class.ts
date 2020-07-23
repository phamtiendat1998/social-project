export class TagUser {
    UserId: string;
    FirstName: string;
    LastName: string;
    constructor(userid: string, firstname: string, lastname: string) {
        this.UserId = userid;
        this.FirstName = firstname;
        this.LastName = lastname;
    }
    get getFullName() {
        return this.FirstName + ' ' + this.LastName;
    }
}
