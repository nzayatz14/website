
//get the current app
var app = angular.module('NicksApp', []);

//get the view controller that we want
app.controller('viewController1', function($scope) {

	//set the properties within that scope INCLUDING FUNCTION BODIES
	$scope.btnIncrementClicked = function(){
		alert('HellO?');
		$scope.lblLine2Text="Try I guess?";
	}
});


function navBarController($scope, $location) {
	$scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
}


app.controller('viewController2', function($scope){

	//set the properties within that scope INCLUDING FUNCTION BODIES
	$scope.btnIncrementClicked = function(){
		alert('button 2?');
		$scope.lblLine2Text="YEET?";
	}
});


app.controller("dropdownDemo", function($scope) {
	$scope.colours = [{
		name: "Red",
		hex: "#F21B1B"
	}, {
		name: "Blue",
		hex: "#1B66F2"
	}, {
		name: "Green",
		hex: "#07BA16"
	}];
	$scope.colour = "";
});

app.run(function($rootScope) {
	angular.element(document).on("click", function(e) {
		$rootScope.$broadcast("documentClicked", angular.element(e.target));
	});
});


app.directive("dropdown", function($rootScope) {
	return {
		restrict: "E",
		templateUrl: "templates/dropdown.html",
		scope: {
			placeholder: "@",
			list: "=",
			selected: "=",
			property: "@"
		},
		link: function(scope) {
			scope.listVisible = false;
			scope.isPlaceholder = true;

			scope.select = function(item) {
				scope.isPlaceholder = false;
				scope.selected = item;
			};

			scope.isSelected = function(item) {
				return item[scope.property] === scope.selected[scope.property];
			};

			scope.show = function() {
				scope.listVisible = true;
			};

			$rootScope.$on("documentClicked", function(inner, target) {
				console.log($(target[0]).is(".dropdown-display.clicked") || $(target[0]).parents(".dropdown-display.clicked").length > 0);
				if (!$(target[0]).is(".dropdown-display.clicked") && !$(target[0]).parents(".dropdown-display.clicked").length > 0)
					scope.$apply(function() {
						scope.listVisible = false;
					});
			});

			scope.$watch("selected", function(value) {
				scope.isPlaceholder = scope.selected[scope.property] === undefined;
				scope.display = scope.selected[scope.property];
			});
		}
	}
});
