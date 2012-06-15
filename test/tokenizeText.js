var Core = require('../index');
var should = require('should');

var dummyText = "If you're among the companies vying for one of the nearly 2,000 new generic top-level domains, or gTLDs, you've got big pockets. The application alone costs about $185,000. But if you're just an average Joe building your own website or blog, there are much cheaper options out there. One of the most popular is .tk. It's a country code top-level domain, similar to .ca for Canada or .fr for France. But .tk stands for a country you've probably never heard of. It's called Tokelau. Places don''t get much more remote than Tokelau. It would make a great backdrop for a desert-island television series. The only problem would be getting the crew there. What appears on a map as three tiny pinpoints in the midst of the Pacific Ocean are the country's tiny atolls, bringing the total size of Tokelau to a whopping 4 square miles. If you want to get there, you will start in Los Angeles and fly to Hawaii. From Hawaii, you'll fly to American Samoa. From American Samoa, you'll take a small plane to West Samoa, where you might wait two weeks for a boat. The boat ride is 48 hours, and there's no cabin, so you'll sleep on the deck. The boat will get you close to Tokelau, but the sea is too rough and the coral too dangerous to approach, so you'll hop in a canoe and paddle to shore. Now, you're ready to start your island holiday.";

describe('#tokenizeText()', function () {
    it('should return an Array of Tokens without any error', function (done) {
        Core.tokenizeText(dummyText, function (error, tokens) {
            should.not.exist(error);
            tokens.should.be.an.instanceOf(Array);
            done();
        });
    });
    it('should return the correct amount of tokens without any errors', function (done) {
        Core.tokenizeText(dummyText, function (error, tokens) {
            should.not.exist(error);
            tokens.should.be.an.instanceOf(Array).and.have.lengthOf(229);
            done();
        });
    });
});