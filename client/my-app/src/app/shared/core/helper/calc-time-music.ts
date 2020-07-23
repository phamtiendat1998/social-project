export function calcTimeMusic(time: string): string {
    const hour = String(Number(time) / 3600);
    const min = String((Number(time) / 60) % 60);
    const sec = String(Number(time) % 60);
    if (parseInt(hour) > 0) {
        return ((parseInt(hour) > 9 ? '' : '0') + parseInt(hour)) + ' :  ' + ((parseInt(min) > 9 ? '' : '0') + parseInt(min)) + ' : ' + ((parseInt(sec) > 9 ? '' : '0') + parseInt(sec));
    } else {
        return ((parseInt(min) > 9 ? '' : '0') + parseInt(min)) + ' : ' + ((parseInt(sec) > 9 ? '' : '0') + parseInt(sec));
    }
}