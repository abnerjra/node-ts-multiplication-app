import fs from 'fs';
import { SaveFile } from './save-file.use-case';

describe('SaveFileUseCase', () => {
    const customOptions = {
        fileContent: 'custom content',
        pathDestination: 'custom-outputs/',
        fileName: 'custom-table'
    };

    const filePath = `${customOptions.pathDestination}/${customOptions.fileName}.txt`;

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
        const result = saveFile.execute(customOptions);
        expect( result ).toBe(true);

        const checkFile = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });

        expect( checkFile ).toBe(true);
        expect( fileContent ).toBe( customOptions.fileContent )
    });

    test('should return false if directory could not be created', () => {
        const saveFile = new SaveFile();
        const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {
            throw new Error('This is a custom error message from testing');
        });

        const result = saveFile.execute(customOptions);
        expect( result ).toBe(false);

        mkdirSpy.mockRestore();
    });

    test('should return false if file could not be created', () => {
        const saveFile = new SaveFile();
        const writeFileSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {
            throw new Error('This is a custom writing error message');
        });

        const result = saveFile.execute({ fileContent: 'Hi' });
        expect( result ).toBe(false);

        writeFileSpy.mockRestore();
    });
});