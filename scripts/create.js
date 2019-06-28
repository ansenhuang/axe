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
    unpkg: 'unpkg/index.js',
    typings: 'unpkg/index.d.ts',
    files: [
      'lib',
      'unpkg',
    ],
    keywords: [
      'TypeScript',
      'JavaScript',
      'axe',
      data.name,
    ],
    scripts: {
      "build": "node ../../scripts/build.js"
    },
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
[![build status](https://img.shields.io/travis/ansenhuang/axe.svg)](https://travis-ci.org/ansenhuang/axe)
[![code coverage](https://img.shields.io/codecov/c/github/ansenhuang/axe.svg)](https://codecov.io/gh/ansenhuang/axe)
[![npm downloads](https://img.shields.io/npm/dt/@axe/${data.name}.svg)](http://npm-stat.com/charts.html?package=@axe/${data.name})
[![License](https://img.shields.io/npm/l/@axe/${data.name}.svg)](https://github.com/ansenhuang/axe/blob/master/LICENSE)
[![examples](https://img.shields.io/badge/examples-🚀-yellow.svg)](https://ansenhuang.github.io/axe/examples/${data.name}.html)

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
    extends: '../../tsconfig.json',
    compilerOptions: {
      noEmit: false,
      declaration: true,
      baseUrl: './',
      rootDir: './src',
      outDir: './unpkg'
    },
    include: [
      './src'
    ]
  };
  writeFile(path.join(targetPath, 'tsconfig.json'), JSON.stringify(json, null, 2));
}

function createSource(data, targetPath) {
  const indexTs =
`/**
 * ${data.description}
 * @module @axe/${data.name}
 */ /** */

export default {};
`;
  writeFile(path.join(targetPath, 'src/index.ts'), indexTs);
}

inquirer.prompt([
  {
    type: 'input',
    name: 'name',
    message: 'Enter name(without @axe):',
    validate: input => {
      if (!input) {
        return 'Please enter name';
      }
      if (fs.existsSync(path.join(__dirname, '../packages', input))) {
        return `${input} already exists!`;
      }
      return true;
    }
  },
  {
    type: 'input',
    name: 'description',
    message: 'Enter description:',
  },
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
