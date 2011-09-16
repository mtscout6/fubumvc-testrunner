define(['specLoader'], function (specLoader) {
    var fakeJStorageSet = sinon.mock({ set: function (key, value) { } });

    specLoader.register('sample.spec');

    // Redefine dependency to be a fake
    define('lib/jstorage', [], function () {
        return fakeJStorageSet.object;
    });

    describe('sample', function () {
        it('should find this test outside of require', function () {
            expect(true).toEqual(true);
        });

        require(['sample'], function (sut) {
            describe('when initialized', function () {
                it('should have defaults', function () {
                    expect(sut.name).toEqual('Hello, World!');
                });
            });

            describe('persist called', function () {
                fakeJStorageSet.expects('set').once().withExactArgs("sample", sut);
                sut.persist();

                it('should delegate to jstorage', function () {
                    fakeJStorageSet.verify();
                    expect(true).toEqual(true);
                });
            });

            specLoader.completed('sample.spec');
        });
    });
});