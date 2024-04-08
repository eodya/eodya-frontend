export interface BookmarkType {
    totalBookmarkCount: number;
    bookmarks: Bookmark[];
    hasNext: boolean;
  }
  
export interface Bookmark {
    placeId: number;
    image: string;
    name: string;
    addressDetail: string;
    bookmarkCount: number;
    bookmarkStatus: boolean;
    placeStatus: string;
}