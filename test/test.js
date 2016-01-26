var assert = require('assert');
var menu = require('../menu');

describe('Inner Tests', function() {
	var menuObj = new menu(7);
	describe('Test Function: _sumPixels(args[])', function () {
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

	describe('Test Function: _multipleByPixels(multiplicand, multiplier)', function () {
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

	describe('_getHeight', function () {
		//TODO
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