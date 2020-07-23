import { PagingHeader } from '../interface/header.interface';

export type Paging<T> = {
    header: PagingHeader,
    data: T
}