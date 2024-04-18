import { atom } from "jotai";

const initialState = { email: "", password: "" };

export const formAtom = atom(initialState);
