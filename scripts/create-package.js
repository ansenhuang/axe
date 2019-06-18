const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

function writeFile(file, content) {
  fs.writeFile(file, content, err => {
    if (err) {
      console.log(err);
    }
  });
}

function createPackage(data, targetPath) {
  const json = {
    name: `@axe/${data.name}`,
    version: '1.0.0',
    description: data.description,
    author: 'ansenhuang <ancheng1992@126.com>',
    license: 'MIT',
    main: 'lib/index.cjs.js',
    module: 'lib/index.esm.js',
    browser: 'lib/index.umd.js',
    unpkg: 'src/index.ts',
    typings: 'typings/index.d.ts',
    files: [
      'lib',
      'src',
      'typings'
    ],
    homepage: `https://github.com/ansenhuang/axe/tree/master/packages/${data.name}#readme`,
    repository: {
      type: 'git',
      url: 'git+https://github.com/ansenhuang/axe.git'
    },
    bugs: {
      url: 'https://github.com/ansenhuang/axe/issues'
    }
  };
  writeFile(path.join(targetPath, 'package.json'), JSON.stringify(json, null, 2));
}

function createReadme(data, targetPath) {
  const readme =
`# [@axe/${data.name}](https://www.npmjs.org/package/@axe/${data.name})

[![npm version](https://img.shields.io/npm/v/@axe/${data.name}.svg)](https://www.npmjs.org/package/@axe/${data.name})
[![npm downloads](https://img.shields.io/npm/dt/@axe/${data.name}.svg)](http://npm-stat.com/charts.html?package=@axe/${data.name})
[![examples](https://img.shields.io/badge/examples-🚀-yellow.svg)](https://ansenhuang.github.io/axe/examples/${data.name}.html)
[![License](https://img.shields.io/npm/l/@axe/${data.name}.svg)](../../LICENSE)

${data.description}

## Documentation

[Refer to here](https://ansenhuang.github.io/axe/docs/modules/_axe_${data.name}.html)

## Examples

[Click here](https://ansenhuang.github.io/axe/examples/${data.name}.html)
`;
  writeFile(path.join(targetPath, 'README.md'), readme);
}

function createTsconfig(data, targetPath) {
  const json = {
    extends: '../../tsconfig.lib.json',
    compilerOptions: {
      baseUrl: './',
      rootDir: './src',
      declarationDir: './typings'
    },
    include: ['./src']
  };
  writeFile(path.join(targetPath, 'tsconfig.json'), JSON.stringify(json, null, 2));
}

function createSource(data, targetPath) {
  const indexTs =
`/**
* @module @axe/${data.name}
*/

export default {};
`;
  const indexTestTs =
`describe('Please add your own test!', () => {
  test('test', () => {
    expect(1 + 1).toBe(2);
  });
});
`;
  writeFile(path.join(targetPath, 'src/index.ts'), indexTs);
  writeFile(path.join(targetPath, 'src/index.test.ts'), indexTestTs);
}

inquirer.prompt([
  {
    type: 'input',
    name: 'name',
    message: 'Enter name(without @axe):',
    validate: input => (input && input.trim()) ? true : 'Please enter name',
  },
  {
    type: 'input',
    name: 'description',
    message: 'Enter description:',
  }
]).then(answer => {
  const targetPath = path.join(__dirname, '../packages', answer.name);
  fs.mkdirSync(targetPath);
  createPackage(answer, targetPath);
  createReadme(answer, targetPath);
  createTsconfig(answer, targetPath);
  fs.mkdirSync(path.join(targetPath, 'src'));
  createSource(answer, targetPath);
  console.log(`${answer.name} has created successfully!`);
});
