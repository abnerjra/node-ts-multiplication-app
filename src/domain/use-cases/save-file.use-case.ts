import fs from "fs";

export interface SaveFileUseCase {
    execute: ( options: SaveFileOptions ) => boolean;
}

export interface SaveFileOptions {
    fileContent: string;
    pathDestination?: string;
    fileName? : string;
}

export class SaveFile implements SaveFileUseCase {
    constructor(
        /**
         * repository: StorageRepository
         */
    ){};

    execute( { 
        fileContent, 
        pathDestination = 'outputs', 
        fileName = 'table'
    }: SaveFileOptions ): boolean {
        try {
            fs.mkdirSync(pathDestination, { recursive: true })

            const path = `${pathDestination}/${fileName}.txt`;

            fs.writeFileSync(path, fileContent);
            // console.log("File created");
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}