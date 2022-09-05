import axios from "axios";
import { get, post } from ".."

export const uploadFiles = async (file: any) => {
    try {
        const res = await post('photos/upload', { name: file.fileName,type:file.type }) as { url: string }
        console.log(res.url);
        uploadToSignedURL(res.url, file)
    } catch (error) {
        throw error
    }
}

export const uploadToSignedURL = async (url: string, file: any) => {
    try {

        const res = await fetch(url, {
            method: "PUT",
            body: file,
            //@ts-ignore
            "Content-Type": "binary/octet-stream",
        })
         return res;

    } catch (error) {
        console.log(error);

    }

}

export const base64File = async (url: string) => {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
            const base64data = reader.result;
            resolve(base64data);
        };
    });
}