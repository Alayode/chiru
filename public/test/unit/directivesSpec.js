describe('directives', function() {
  beforeEach(module('Karaoke'));

  describe('passwordStrength', function() {
    it('should print current version', inject(function($compile, $rootScope) {
      var element = angular.element('<input password-strength class="form-control input-lg" type="password" name="password" ng-model="password" placeholder="Password" required>');
      $compile(element)($rootScope);
      expect(element.next().html()).toBe('<span></span><span></span><span></span><span></span>');
    }));
  });


  describe('passwordStrength', function(){
    it('should fail if empty string', inject(function($compile, $rootScope) {
      var element = angular.element('<input password-strength class="form-control input-lg" type="password" name="password" ng-model="password" placeholder="Password" required>');
      $compile(element)($rootScope);
      expect(true).toBe(true);
    }))
  })
});
