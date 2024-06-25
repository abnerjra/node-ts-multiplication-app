import { CreateTable } from './create-table.use-case';

describe('CreateTableUseCase', () => {
    test('should create table with default values', () => {
        const createTable = new CreateTable();

        const table = createTable.execute({ base: 4 });
        const rows = table.split('\n').length;
        // console.log(table);

        expect( createTable ).toBeInstanceOf( CreateTable );
        expect( table ).toContain('4 x 1 = 4');
        expect( table ).toContain('4 x 10 = 40');
        expect( rows ).toBe(10);
    });

    test('should create table with custom values', () => {
        const options = {
            base: 3,
            limit: 20
        }

        const createTable = new CreateTable();

        const table = createTable.execute(options);
        // console.log(table);
        const rows = table.split('\n').length

        expect( table ).toContain('3 x 1 = 3');
        expect( table ).toContain('3 x 20 = 60');
        expect( rows ).toBe(20);
    });
});