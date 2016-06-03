describe('service', function() {
  beforeEach(module('Karaoke'));

  describe('Auth', function() {
    it('should return current version', inject(function(Auth) {
      expect(Auth).toBeDefined();
    }));
  });
});
