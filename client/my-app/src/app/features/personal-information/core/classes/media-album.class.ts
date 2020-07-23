export class MediaAlbum {
    AlbumID: string;
    AlbumName: string;
    QuantityPhoto: number;
    Privacy: boolean;
    Describe: string;
    AlbumCover: string;
    constructor(
        albumID: string,
        albumName: string,
        quantityPhoto: number,
        privacy: boolean,
        describe: string,
        albumCover: string,
    ) {
        this.AlbumID = albumID;
        this.AlbumName = albumName;
        this.QuantityPhoto = quantityPhoto;
        this.Privacy = privacy;
        this.Describe = describe;
        this.AlbumCover = albumCover;

    }
}