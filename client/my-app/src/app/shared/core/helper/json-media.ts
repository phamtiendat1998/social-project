const stringSlice = ';base64,';
export function jsonMedia(stringBase64: string) {
    if (stringBase64 == null) {
        return null;
    } else {
        const arrayJson = [stringBase64.slice(stringBase64.indexOf(stringSlice) + stringSlice.length)];
        return JSON.stringify(arrayJson);
    }
}

export function jsonMedias(stringArrayImage: string[]) {
    if (stringArrayImage.length == 0) {
        return null;
    } else {
        const arrayJson = [];
        stringArrayImage.forEach(item => {
            const itemImage = item.slice(item.indexOf(stringSlice) + stringSlice.length);
            arrayJson.push(itemImage);
        });
        return JSON.stringify(arrayJson);
    }
}