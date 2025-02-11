// to make the file a module and avoid the Typecript error
export{};

declare global {
    namespace Express {
        export interface Request {
            userId?:number;
            cleanBody?: any ;
            role: string;
            rawBody?: Buffer;
        }
    }
}