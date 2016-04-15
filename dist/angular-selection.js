/**
 * angular-selection
 * Version: 0.1.0 (2016-04-16)
 *
 * Author: kiddy2910 <dangduy2910@gmail.com>
 * https://github.com/kiddy2910/angular-selection.git
 *
 * Copyright (c) 2016 
 */
angular.module('angular.selection', []).directive('selection', [
  '$document',
  function ($document) {
    var openingSelection;
    return {
      require: [
        'selection',
        '?ngModel'
      ],
      scope: { onselect: '&' },
      restrict: 'EA',
      template: '<i class="fa fa-caret-down"></i>' + '<div class="default text">-- Select --</div>' + '<div class="menu hidden" ng-transclude></div>',
      transclude: true,
      link: function (scope, element, attrs, ctrls) {
        var thisCtrl = ctrls[0], ngModelCtrl = ctrls[1];
        thisCtrl.select = function (item, itemHtml) {
          element.find('.text').removeClass('default');
          element.find('.text').html(itemHtml);
          if (ngModelCtrl != null) {
            ngModelCtrl.$setViewValue(item);
            ngModelCtrl.$render();
          }
          scope.onselect({ $event: item });
          onDocumentClick();
          scope.$broadcast('selectionItem:reset', item);
        };
        thisCtrl.close = function () {
          onDocumentClick();
        };
        element.on('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          if (openingSelection != null) {
            openingSelection.close();
          }
          openingSelection = thisCtrl;
          element.addClass('opened');
          element.find('.menu').removeClass('hidden');
          $document.off('click', onDocumentClick).one('click', onDocumentClick);
        });
        function onDocumentClick() {
          element.removeClass('opened');
          element.find('.menu').addClass('hidden');
        }
      },
      controller: [
        '$scope',
        '$element',
        '$attrs',
        function ($scope, $element, $attrs) {
        }
      ]
    };
  }
]).directive('item', function () {
  return {
    require: '^selection',
    restrict: 'EA',
    scope: { ref: '=' },
    transclude: true,
    template: '<div ng-transclude></div>',
    link: function (scope, element, attrs, ctrl) {
      if (angular.isUndefined(scope.ref)) {
        throw 'Directive selection > item missed ref binding.';
      }
      element.on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        ctrl.select(scope.ref, element.find('[ng-transclude]').html());
      });
      scope.$on('selectionItem:reset', function (e, selected) {
        if (angular.equals(selected, scope.ref)) {
          element.addClass('selected');
        } else {
          element.removeClass('selected');
        }
      });
    }
  };
});
angular.module('angular.selection.template', ['angular/selection/selection.tpl.html']);
angular.module('angular/selection/selection.tpl.html', []).run([
  '$templateCache',
  function ($templateCache) {
    $templateCache.put('angular/selection/selection.tpl.html', '<i class="fa fa-caret-down"></i>\n' + '<div class="default text">-- Select --</div>\n' + '<div class="menu hidden" ng-transclude></div>');
  }
]);