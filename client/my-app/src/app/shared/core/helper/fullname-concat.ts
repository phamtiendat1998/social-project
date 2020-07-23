export function fullNameConcat(fullname: string) {
    return fullname.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ');
}