(function() {
	"use strict";
	var assert = require('assert');
	var menu = require('../menu');
	var jsdom = require('jsdom');

	global.document = jsdom.jsdom(
		'<div class="menu-box">' +
		'	<div class="scroll-tool scroll-up">Scroll Up</div>' +
		'	<div class="scroll-box"></div>' +
		'	<div class="scroll-tool scroll-down">Scroll Down</div>' +
		'</div>'
	);

	global.window = document.defaultView;

	describe('Inner Tests', function() {
		var menuObj = new menu(7);

		var menuBox = document.getElementsByClassName("scroll-box")[0];
		var itemList = [0,1,2,3,4,5,6,7,8,9,10];

		menuObj.setScrollBox(menuBox, itemList);
		menuObj.setScrollUpButton(document.getElementsByClassName("scroll-up")[0]);
		menuObj.setScrollDownButton(document.getElementsByClassName("scroll-down")[0]);

		describe('Test Function: _sumPixels(args[Pixel])', function () {
			describe('should return 0 pixel', function() {
				it('when there is no argument.', function() {
					assert.equal('0px', menuObj._sumPixels());
				});
				it('when there is only 1 argument and which argument is not a pixel value.', function() {
					assert.equal('0px', menuObj._sumPixels('0.x'));
					assert.equal('0px', menuObj._sumPixels('x.1'));
					assert.equal('0px', menuObj._sumPixels('x.'));
					assert.equal('0px', menuObj._sumPixels('.x'));
					assert.equal('0px', menuObj._sumPixels('.'));
					assert.equal('0px', menuObj._sumPixels('0rem'));
					assert.equal('0px', menuObj._sumPixels('0cm'));
					assert.equal('0px', menuObj._sumPixels('s'));
					assert.equal('0px', menuObj._sumPixels(null));
					assert.equal('0px', menuObj._sumPixels({}));
					assert.equal('0px', menuObj._sumPixels([]));
				});
			});
			describe('should return decimal-pixel', function() {
				it('when the pixel number is incomplete.', function() {
					assert.equal('0px', menuObj._sumPixels('0.px'));
					assert.equal('0px', menuObj._sumPixels('.0px'));
					assert.equal('0.1px', menuObj._sumPixels('.1px'));
					assert.equal('2px', menuObj._sumPixels('2.px'));
					assert.equal('3.22px', menuObj._sumPixels('3.22px'));
				});
			});
			describe('should return the sum of each arguments\' pixels', function() {
				it('when the arguments are all valid values.', function () {
					assert.equal('100px', menuObj._sumPixels('40px', '60px'));
					assert.equal('100px', menuObj._sumPixels('40px', '35px', '25px'));
				});
				it('when the arguments includes some values which are not pixel values.', function () {
					assert.equal('100px', menuObj._sumPixels('40px', '60px', '0rem'));
					assert.equal('100px', menuObj._sumPixels('40px', '60px', '10cm'));
					assert.equal('100px', menuObj._sumPixels('40px', '60px', 's'));
					assert.equal('100px', menuObj._sumPixels('40px', '35px', '25px', null));
					assert.equal('100px', menuObj._sumPixels('40px', '35px', '25px', {}));
					assert.equal('100px', menuObj._sumPixels('40px', '35px', '25px', []));
					assert.equal('100px', menuObj._sumPixels('40px', '35px', '25px', NaN));
				});
			});
		});

		describe('Test Function: _multipleByPixels(multiplicand: Pixel, multiplier: Number)', function () {
			describe('should return the product of the multiplication', function() {
				it('when the multiplicand and the multiplier are both valid values.', function() {
					assert.equal('40px', menuObj._multipleByPixels('20px', 2));
					assert.equal('0px', menuObj._multipleByPixels('20px', 0));
					assert.equal('0px', menuObj._multipleByPixels('0px', 10));
					assert.equal('0px', menuObj._multipleByPixels('0px', 0));
				});
			});
			describe('should return 0 pixel', function() {
				it('when there is only the multiplicand.', function() {
					assert.equal('0px', menuObj._multipleByPixels('10px'));
				});
				it('when the multiplicand is not a pixel value.', function() {
					assert.equal('0px', menuObj._multipleByPixels('10rem', 2));
					assert.equal('0px', menuObj._multipleByPixels('s', 2));
					assert.equal('0px', menuObj._multipleByPixels(null, 2));
					assert.equal('0px', menuObj._multipleByPixels({}, 2));
					assert.equal('0px', menuObj._multipleByPixels([], 2));
				});
				it('when the multiplier is not a number.', function() {
					assert.equal('0px', menuObj._multipleByPixels('10px', null));
					assert.equal('0px', menuObj._multipleByPixels('10px', {}));
					assert.equal('0px', menuObj._multipleByPixels('10px', []));
					assert.equal('0px', menuObj._multipleByPixels('10px', NaN));
					assert.equal('0px', menuObj._multipleByPixels('10px', ""));
				});
			});
		});

		describe('Test Function: _getHeight(blockElement: DOM, withMargin: Boolean)', function () {
            // Haven't consider the height with the border width yet.
            describe('should return the division\'s height', function() {
                it('when there is no pandding or margin in the division.', function() {
                    var div = document.createElement('div');
                    div.style.height = "100px";
                    assert.equal('100px', menuObj._getHeight(div));
                });
                it('when there are some paddings in the division.', function() {
                    var div = document.createElement('div');
                    div.style.height = "100px"; // Must includes the height if you'd like to set the paddings.
                    div.style.padding = "5px";
                    assert.equal('110px', menuObj._getHeight(div));
                    div.style.paddingTop = "10px";
                    assert.equal('115px', menuObj._getHeight(div));
                    div.style.paddingBottom = "15px";
                    assert.equal('125px', menuObj._getHeight(div));
                });
                it('when there are some margins surround the division.', function() {
                    var div = document.createElement('div');
                    div.style.height = "100px"; // Must includes the height if you'd like to set the margins.
                    div.style.margin = "10px";
                    assert.equal('100px', menuObj._getHeight(div));
                    assert.equal('120px', menuObj._getHeight(div, true));
                    div.style.marginTop = "20px";
                    assert.equal('100px', menuObj._getHeight(div));
                    assert.equal('130px', menuObj._getHeight(div, true));
                    div.style.marginBottom = "25px";
                    assert.equal('100px', menuObj._getHeight(div));
                    assert.equal('145px', menuObj._getHeight(div, true));
                });
            });
		});
        
		describe('_isAbleToScroll', function () {
			//TODO
		});
		describe('_isAbleToGoUp', function () {
			//TODO
		});
		describe('_isAbleToGoDown', function () {
			//TODO
		});
	});
})();
