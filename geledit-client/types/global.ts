import {KeyedMutator} from "swr";

export type Note = {
    currentEditor: string | null;
    id: number,
    owner: string,
    title: string,
    content: string | null,
    guests: [
        string
    ]
}

export type SWRReturn<T> = {data: T, error: any, isLoading: boolean, mutate: KeyedMutator<any>}