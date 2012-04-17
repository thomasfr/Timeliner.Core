/**
 * Created by JetBrains WebStorm.
 * User: thomas
 * Date: 05.04.12
 * Time: 09:13
 * To change this template use File | Settings | File Templates.
 */
var parser = require('./lib/parser');


console.log(parser.parse("(foo bar) OR (baz bat)"));