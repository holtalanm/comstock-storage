module.exports = {
    roots: [
        '<rootDir>/src',
        '<rootDir>/test',
    ],
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
        '^.+\\.tsx?$': 'ts-jest',
    },
    transformIgnorePatterns: ['/node_modules/(?!(comstock)/)']
}