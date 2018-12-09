const expect = require('chai').expect
      mongoose = require('mongoose'),
      requestModel = require('../../models/request');

describe('Request model', function() {
    let testRequest;
    before(function(done) {
        const request = new requestModel({
            trapId: "test2",
            ip: "127.0.0.1", 
            method: "POST", 
            scheme: "https", 
            query: "", 
        });

        request.save()
            .then(result => {
                testRequest = result;
                done();
            })
            .catch(err => done(err));
    });

    after((done) => {
        requestModel.deleteMany({}, (err) => { 
            if (err) return done(err);
            done();         
        });     
    });

    describe('Lifecycle', function() {
        it('should save the request', function(done) {
            let request = new requestModel({
                trapId: "test",
                date: Date.now(), 
                ip: "127.0.0.1", 
                method: "POST", 
                scheme: "https", 
                query: "", 
                params: [
                    {
                        key: "test",
                        value: "test"
                    }
                ], 
                cookie: "test=Y", 
                headers: [
                    {
                        key: "test1",
                        value: "test1"
                    }
                ]
            });
            request.save()
                .then(result => {
                    expect(result).to.have.property('trapId');
                    expect(result.trapId).to.equal("test");
                    expect(result).to.have.property('date');
                    expect(result).to.have.property('ip');
                    expect(result.ip).to.equal("127.0.0.1");
                    expect(result).to.have.property('method');
                    expect(result.method).to.equal("POST");
                    expect(result).to.have.property('scheme');
                    expect(result.scheme).to.equal("https");
                    expect(result).to.have.property('query');
                    expect(result.query).to.equal("");
                    expect(result).to.have.property('params');
                    expect(result).to.have.nested.property('params[0].key');
                    expect(result).to.have.nested.property('params[0].value');
                    expect(result.params[0].key).to.equal("test");
                    expect(result.params[0].value).to.equal("test");
                    expect(result).to.have.property('cookie');
                    expect(result.cookie).to.equal("test=Y");
                    expect(result).to.have.property('headers');
                    expect(result).to.have.nested.property('headers[0].key');
                    expect(result).to.have.nested.property('headers[0].value');
                    expect(result.headers[0].key).to.equal("test1");
                    expect(result.headers[0].value).to.equal("test1");
                    done();
                })
                .catch(err => done(err));
        });

        it('should find previously saved request', function(done) {
            requestModel.findByTrapId("test2")
                .then(result => {
                    expect(result).to.be.a('array');
                    expect(result).to.have.nested.property('[0].trapId');
                    expect(result[0].trapId).to.equal(testRequest.trapId);
                    expect(result[0].method).to.equal(testRequest.method);
                    expect(result[0].scheme).to.equal(testRequest.scheme);
                    expect(result[0].query).to.equal(testRequest.query);
                    expect(result[0].cookie).to.equal(testRequest.cookie);
                    done();
                })
                .catch(err => done(err));
        });

        it('should aggregate previously saved request', function(done) {
            requestModel.findAllRequests()
                .then(result => {
                    expect(result).to.be.a('array');
                    expect(result).to.have.nested.property('[0]._id');
                    expect(result).to.have.nested.property('[0].count');
                    expect(result).to.have.nested.property('[1]._id');
                    expect(result).to.have.nested.property('[1].count');
                    expect(result[0]._id).to.equal("test");
                    expect(result[0].count).to.equal(1);
                    expect(result[1]._id).to.equal("test2");
                    expect(result[1].count).to.equal(1);
                    done();
                })
                .catch(err => done(err));
        });
    });
});
