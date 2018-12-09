process.env.NODE_ENV = 'test';

const app = require('../../app'),
      chai = require('chai'),
      chaiHttp = require('chai-http'),
      requestModel = require('../../models/request'),
      expect = chai.expect;

chai.use(chaiHttp);
describe('Request controller', function() {
    beforeEach((done) => {
        requestModel.deleteMany({}, (err) => { 
            if (err) return done(err);
            done();         
        });     
    });

    describe('GET /', function() {
        it('should send back a html without error for root request', function(done) {
            chai.request(app)
                .get('/')
                .then(function (res) {
                    expect(res).to.have.status(200);
                    expect(res).to.be.html
                    done();
                 })
                 .catch(err => done(err));
        });
    });

    describe('GET /testId', function() {
        it('should send back a text without error for the app trap request ', function(done) {
            chai.request(app)
                .get('/testId')
                .then(function (res) {
                    expect(res).to.have.status(200);
                    expect(res).to.be.text
                    expect(res).to.have.nested.property('text').to.equal("OK")
                    done();
                 })
                 .catch(err => done(err));
        });
    });

    describe('GET /testId/requests', function() {
        it('should send back a html without error for the request list', function(done) {
            chai.request(app)
                .get('/testId/requests')
                .then(function (res) {
                    expect(res).to.have.status(200);
                    expect(res).to.be.html
                    done();
                 })
                 .catch(err => done(err));
        });
    });
});
