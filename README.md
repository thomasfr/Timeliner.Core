Timeliner.Core
==============

This module contains shared dependencies for Timeliner.Index and Timeliner.Search.
It provides / exports 2 public functions:

 * tokenizeWord(String word)
 * tokenizeText(String text)


Installation
============

```
npm install Timeliner.Core
```

Usage
=====

```javascript
## example/example-tokenizeText1.js:
var Core = require('Timeliner.Core').tokenizeText;
var dummyText = "This is an example text. It will create some strings, let`s say tokens. This Tokens are generated via stemming, singularizing and calculating phonetic strings for every word. This is done through the wonderful and excellent 'natural' module by chris umbel!";
tokenizeText(dummyText, function (error, tokens) {
    console.log(tokens);
});
```

Will Output:
```json
[ 'AFR',
  'AKSMPL',
  'AKSSL',
  'AKSSLNT',
  'AL',
  'ANT',
  'ANTRFL',
  'CALC',
  'CALCULATING',
  'CHRI',
  'CHRIS',
  'CHRY',
  'CRE',
  'CREATE',
  'DON',
  'DONE',
  'EVERY',
  'EXAMPL',
  'EXAMPLE',
  'EXCEL',
  'EXCELLENT',
  'FL',
  'FNT',
  'FNTK',
  'FNTRFL',
  'GEN',
  'GENERATED',
  'KLK',
  'KLKLTNK',
  'KN',
  'KNRTT',
  'KR',
  'KRT',
  'MOD',
  'MODULE',
  'MT',
  'MTL',
  'PHONET',
  'PHONETIC',
  'SAY',
  'SINGUL',
  'SINGULARIZING',
  'SNKL',
  'SNKLRSNK',
  'STRING',
  'STRINGS',
  'STRNK',
  'TK',
  'TKN',
  'TN',
  'TOK',
  'TOKEN',
  'TOKENS',
  'VIA',
  'WIL',
  'WILL',
  'WOND',
  'WONDERFUL' ]
``

LICENSE
=======

Copyright (c) 2012 Thomas Fritz

The MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.