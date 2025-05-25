import { atom } from "recoil";

export const MovieId_Atoms = atom<number|undefined>({
    key: "MovieIdAtom",
    default: 0
});