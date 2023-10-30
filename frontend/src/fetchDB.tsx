import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function FetchDataPost(url:string,body: any){
    const response = await axios.post(url,body)
    return response;
}
export async function FetchDataGet(url:string){
    const response = await axios.get(url)
    return response;
}




