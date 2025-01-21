const tsConfig = require('./tsconfig.json');

const transformObject = (obj) => {
    const transformed = {};

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            // Get the first element from the array
            const value = obj[key][0];
            // Modify the path
            let newPath = value.replace('./src', '<rootDir>/../src');
            newPath = newPath.replace('/packages/tools/', '/packages/tools/');

            // Add to the transformed object
            transformed[key] = newPath;
        }
    }

    return transformed;
};

const config = {
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    "rootDir": "./src",
    "testRegex": "\\.test.ts$",
    "transform": {
        '^.+\\.[tj]sx?$': ['ts-jest', { tsconfig: '<rootDir>/../tsconfig.json' }],
    },
    "coverageDirectory": "../coverage",
    "testEnvironment": "node",
    "collectCoverage": true,
    "moduleNameMapper": transformObject(tsConfig.compilerOptions.paths),
    "coverageReporters": [
        "json",
        "html",
        "text-summary"
    ]
};

export default config;