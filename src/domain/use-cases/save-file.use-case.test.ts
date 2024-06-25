import fs from 'fs';
import { SaveFile } from './save-file.use-case';

describe('SaveFileUseCase', () => {
    afterEach(() => {
        const outputFolderExists = fs.existsSync('outputs');
        if ( outputFolderExists ) fs.rmSync('outputs', { recursive: true });

        const customFolderExists = fs.existsSync('custom-outputs');
        if ( customFolderExists ) fs.rmSync('custom-outputs', { recursive: true });
    });

    test('should save file with default values', () => {
        const saveFile = new SaveFile();
        const filePath = 'outputs/table.txt';
        const options = {
            fileContent: 'test-content'
        };

        const result = saveFile.execute(options);
        expect( result ).toBe(true);

        const checkFile = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });

        expect( checkFile ).toBe(true);
        expect( fileContent ).toBe( options.fileContent )
    });

    test('should save file with custome values', () => {
        const saveFile = new SaveFile();
        const options = {
            fileContent: 'custom content',
            pathDestination: 'custom-outputs/',
            fileName: 'custom-table'
        };

        const filePath = `${options.pathDestination}/${options.fileName}.txt`;

        const result = saveFile.execute(options);
        expect( result ).toBe(true);

        const checkFile = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });

        expect( checkFile ).toBe(true);
        expect( fileContent ).toBe( options.fileContent )
    });
});