export interface CreateTableUseCase {
    execute: ( options: CreateTableOptions ) => string;
}

export interface CreateTableOptions {
    base: number;
    limit?: number;
}

export class CreateTable {
    constructor(
        /**
         * DI - Dependecy Injection
         */
    ){}

    execute({ base, limit = 10 }: CreateTableOptions){
        let outputMessage = '';
        for (let i = 1; i <= limit; i++) {
            outputMessage+=`${base} x ${i} = ${base*i}`;
            if (i < limit) outputMessage += '\n'
        }
        return outputMessage;
    }
}