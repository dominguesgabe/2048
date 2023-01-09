describe('Hello World', function() {
    it('should display a hello world', function() {
        const greet = 'hello';
        const to = 'world';

        expect(greet + ' ' + to).toEqual('hello world');
    });
});
