// import { yarg } from "./args.pluging";

const runCommand = async(args: string[]) => {
    process.argv = [...process.argv, ...args];

    const { yarg } = await import('./args.pluging');

    return yarg;
};

const originalArgv = process.argv;

beforeEach(() => {
    process.argv = originalArgv;
    jest.resetModules();
});

describe('Test args.pluging.ts', () => {
    test('should return default values', async() => {
        const argv = await runCommand(['-b', '5']);
        console.log(argv);

        expect( argv ).toEqual(expect.objectContaining({
            b: 5,
            l: 10,
            s: false,
            n: 'multiplication-table',
            d: 'outputs'
        }));
    });

    test('should return configuration custom values', async() => {
        const argv = await runCommand([
            '-b',
            '9',
            '-l',
            '20',
            '-s',
            '-n',
            'table-in-9',
            '-d',
            'tables'
        ]);
        console.log(argv);

        expect( argv ).toEqual(expect.objectContaining({
            b: 9,
            l: 20,
            s: true,
            n: 'table-in-9',
            d: 'tables'
        }));
    });
});