(function(){
    
    var app = angular.module("githubViewer", []);
//    var app = angular.module("githubViewer", []);
    
    var MainController = function(
      $scope, $http, $interval, 
      $anchorScroll, $location){
        
      var url = "https://api.github.com/users/";
      
      var onUserComplete = function(response){
        $scope.user = response.data;
        $http.get($scope.user.repos_url)
          .then(onRepos, onError);
      };
      
      var onRepos = function(response){
        $scope.repos = response.data;
        $location.hash("userDetails");
        $anchorScroll();
      }
      
      var onError = function(reason){
        $scope.error = "Could not fetch the data.";
      };
      
      $scope.search = function(username){
        $http.get(url+username)
        .then(onUserComplete, onError);
        if(countDownInterval){
          $interval.cancel(countDownInterval);
          $scope.countdown = null;
        }
      };
      
      var decrementCountdown = function(){
        $scope.countdown -= 1;
        if($scope.countdown < 1){
          $scope.search($scope.username);
        }
      };
      
      var countDownInterval = null;
      var startCountdown = function(){
        countDownInterval = $interval(decrementCountdown, 1000, $scope.countdown);
      };
      
      $scope.username = "angular";
      $scope.message = "Hello Angular";
      $scope.repoSortOrder = "-startgazers_count";
      $scope.countdown = 5;
      startCountdown();
    
    };
    
    
    app.controller("mainController", MainController);
    
}());

//(function() {
//
//    var app = angular.module("githubViewer", []);
//
//    var MainController = function($scope, $http, $interval) {
//
//        var onUserComplete = function(response) {
//            $scope.user = response.data;
//            $http.get($scope.user.repos_url)
//                .then(onRepos, onError);
//        };
//
//        var onRepos = function(response) {
//
//            $scope.repos = response.data;
//
//        };
//
//        var onError = function(reason) {
//            $scope.error = "Could not fetch the data.";
//        };
//
//
//        var decrementCountdown = function(){
//          $scope.countdown -= 1;
//          if($scope.countdown < 1){
//              $scope.search($scope.username);
//          }
//        };
//
//        var startCountdown = function(){
//            $interval(decrementCountdown, 1000, $scope.countdown);
//        };
//
//        $scope.search = function(username) {
//            $http.get("https://api.github.com/users/" + username)
//                .then(onUserComplete, onError);
//        };
//
//        $scope.username = "angular";
//        $scope.message = "GitHub Viewer";
//        $scope.repoSortOrder = "-stargazers_count";
//        $scope.countdown = 5
//        startCountdown();
//
//    };
//
//    app.controller("MainController", MainController);
//
//}());