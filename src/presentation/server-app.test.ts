import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";
import { ServerApp } from "./server-app";

describe('Test Server App', () => {
    const options = {
        base: 3,
        limit: 10,
        showTable: false,
        destination: 'test-destination',
        name: 'test-filename'
    }

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('should create Serverapp instance', () => {
        const serverApp = new ServerApp();
        expect( serverApp ).toBeInstanceOf(ServerApp)
        expect( typeof ServerApp.run ).toBe('function')
    });

    /* test('should run ServerApp with options', () => {
        const logSpy = jest.spyOn(console, 'log');
        const creteTableSpy = jest.spyOn(CreateTable.prototype, 'execute');
        const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute');

        ServerApp.run(options);

        expect( logSpy ).toHaveBeenCalledWith('Server running...');
        expect( logSpy ).toHaveBeenCalledWith('File created!');

        expect( creteTableSpy ).toHaveBeenCalledTimes(1);
        expect( creteTableSpy ).toHaveBeenCalledWith({
            base: options.base, limit: options.limit
        });

        expect( saveFileSpy ).toHaveBeenCalledTimes(1);
        expect( saveFileSpy ).toHaveBeenCalledWith({
            fileContent: expect.any(String),
            pathDestination: options.destination,
            fileName: options.name
        });
    }); */

    test('should run with custom values mocked', () => {
        const logMock = jest.fn();
        const logErrorMock = jest.fn();
        const createMock = jest.fn().mockReturnValue('1 x 2 = 2');
        const saveFileMock = jest.fn().mockReturnValue(false);

        console.log = logMock;
        console.error = logErrorMock;
        CreateTable.prototype.execute = createMock;
        SaveFile.prototype.execute = saveFileMock;

        ServerApp.run(options);

        expect( logMock ).toHaveBeenCalledWith('Server running...');
        expect( createMock ).toHaveBeenCalledWith({
            base: options.base, limit: options.limit
        });

        expect( saveFileMock ).toHaveBeenCalledWith({
            fileContent: '1 x 2 = 2',
            pathDestination: options.destination,
            fileName: options.name
        });

        expect( logMock ).toHaveBeenCalledWith('File created!');
        expect( logErrorMock ).not.toBeCalledWith();
    });
});