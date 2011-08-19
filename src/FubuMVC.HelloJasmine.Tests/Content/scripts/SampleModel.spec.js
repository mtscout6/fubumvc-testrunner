define(['sample'], function(sample) {
    describe('SampleModelTester', function() {
        it('should_have_defaults', function() {
            expect(sample.name)
                .toEqual('Hello, World!');
        });
    });
});