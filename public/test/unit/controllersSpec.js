describe('controllers', function(){
  beforeEach(module('Karaoke'));

  describe('AddCtrl', function() {
    it('should add a new show', inject(function($controller) {
      var addCtrl = $controller('AddCtrl', { $scope: {} });
      expect(addCtrl).toBeDefined();
    }));
  });

  it('should be defined', inject(function($controller) {
    var detailCtrl = $controller('DetailCtrl', { $scope: {} });
    expect(detailCtrl).toBeDefined();
  }));

    it('should be defined', inject(function($controller) {
      var loginCtrl = $controller('LoginCtrl', { $scope: {} });
      expect(loginCtrl).toBeDefined();
    }));

});
