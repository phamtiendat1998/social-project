export function calcTimeStory(minute: number) {
    if (minute < 60) {
        return Math.floor(minute) + ' phút trước';
    } else if (Math.floor(minute) == 0) {
        return '1 phút trước'
    }
    else {
        return Math.floor(minute / 60) + ' giờ trước';
    }
}