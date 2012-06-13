var Core = require('../index');
var should = require('should');

var dummyWord = 'companies';
var stopWord = 'and';
var specialChar = '#foo ?=Bar %&';
var dashedWord = 'National-Security';

describe('#tokenizeWord', function () {
    it('should return an Array of Tokens without any errors', function (done) {
        Core.tokenizeWord(dummyWord, function (error, tokens) {
            should.not.exist(error);
            done();
        });
    });
    it('should return correct amount of tokens without errors', function (done) {
        Core.tokenizeWord(dummyWord, function (error, tokens) {
            should.not.exist(error);
            tokens.should.be.an.instanceof(Array).and.have.lengthOf(3);
            done();
        });
    });
    it('should return the correct tokens without errors', function (done) {
        Core.tokenizeWord(dummyWord, function (error, tokens) {
            should.not.exist(error);
            tokens.should.be.an.instanceof(Array);
            tokens[0].should.equal('COMPANIES');
            tokens[1].should.equal('COMPANY');
            tokens[2].should.equal('KMPN');
            done();
        });
    });
    it('should not return any tokens when a "stopword" is given', function (done) {
        Core.tokenizeWord(stopWord, function (error, tokens) {
            should.not.exist(error);
            tokens.should.be.an.instanceOf(Array).and.have.lengthOf(0);
            done();
        });
    });
    it('should return an Array of tokens without any errors when given a dash delimited word', function (done) {
        Core.tokenizeText(dashedWord, function (error, tokens) {
            should.not.exist(error);
            tokens.should.be.an.instanceOf(Array);
            done();
        });
    });
    it('should return correct amount of tokens when given a dash delimited word', function (done) {
        Core.tokenizeText(dashedWord, function (error, tokens) {
            should.not.exist(error);
            tokens.should.be.an.instanceOf(Array).and.have.lengthOf(8);
            done();
        });
    });
    it('should return correct tokens when given a dash delimited word', function (done) {
        Core.tokenizeText(dashedWord, function (error, tokens) {
            should.not.exist(error);
            // [ 'NAT', 'NATIONAL', 'NT', 'NXNL', 'SEC', 'SECURITY', 'SK', 'SKRT' ]
            tokens[0].should.equal('NAT');
            tokens[1].should.equal('NATIONAL');
            tokens[2].should.equal('NT');
            tokens[3].should.equal('NXNL');
            tokens[4].should.equal('SEC');
            tokens[5].should.equal('SECURITY');
            tokens[6].should.equal('SK');
            tokens[7].should.equal('SKRT');
            done();
        });
    });
    it('should not return any tokens when a word with special chars is given', function (done) {
        Core.tokenizeText(specialChar, function (error, tokens) {
            should.not.exist(error);
            console.log(tokens);
            done();
        });
    });
});