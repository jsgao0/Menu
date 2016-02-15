(function() {
    "use strict";
    function Menu(menuSize) {
        var page = this;
        this.selectFunction = function(e, arr) {
            [].forEach.call(arr, function(ae) {
                page.removeClass(ae, "menu-item-selected");
            });
            page.addClass(e, "menu-item-selected");
        };
        this._totalItems = [];
        this._menuSize = menuSize;
        this._currentPage = 1;
        this.setCurrentPage = function(index) {
            page._currentPage = Math.ceil(index / page._menuSize) || 1;
        };

        this.goToPage = function(specificPage) {
            var marginTop = page._firstItem.originalMarginTop;

            page._firstItem.style.marginTop = (page._currentPage > 1) ?
                page._multipleByPixels(page._itemHeight, (page._currentPage - 1) * -1 * page._menuSize) :
                marginTop;

            var s = page._isAbleToGoUp() ? page.removeClass(page._scrollUpButton, "scroll-tool-disabled") : page.addClass(page._scrollUpButton, "scroll-tool-disabled");
            var t = page._isAbleToGoDown() ? page.removeClass(page._scrollDownButton, "scroll-tool-disabled") : page.addClass(page._scrollDownButton, "scroll-tool-disabled");
        };
        this._isAbleToScroll = function() {
            return page._menuSize < page._altitude;
        };
        this._isAbleToGoUp = function() {
            return page._currentPage > 1;
        };
        this.pageUp = function() {
            if(!page._isAbleToScroll()) return;
            if(!page._isAbleToGoUp()) return;
            page._currentPage -= 1;
            page.goToPage(page._currentPage);
        };
        this._isAbleToGoDown = function() {
            return page._currentPage < page._thickness;
        };
        this.pageDown = function() {
            if(!page._isAbleToScroll()) return;
            if(!page._isAbleToGoDown()) return;
            page._currentPage += 1;
            page.goToPage(page._currentPage);
        };
        this.setScrollUpButton = function(e) {
            e.addEventListener("click", function() {
                if(page._isAbleToGoUp()) page.pageUp();
            }, false);
            page._scrollUpButton = e;
        };
        this.setScrollDownButton = function(e) {
            e.addEventListener("click", function() {
                if(page._isAbleToGoDown()) page.pageDown();
            }, false);
            page._scrollDownButton = e;
        };
        this.setScrollBox = function(menuBox, itemList, selectedIndex) {
            selectedIndex = selectedIndex || 0;
            menuBox.innerHTML = itemList.reduce(function(p, c, i) {
                            return (i === selectedIndex) ?
                                    p + '<div class="menu-item menu-item-selected">' + c + '</div>' :
                                    p + '<div class="menu-item">' + c + '</div>';
                        }, "");

            page._totalItems = [].map.call(document.getElementsByClassName("menu-item"), function(e, i, a) {
                    e.addEventListener("click", function() {
                        page.selectFunction(e, a);
                    }, false);
                    return e;
                });

            page._firstItem = page._totalItems[0];
            page._firstItem.originalMarginTop = window.getComputedStyle(page._firstItem, null).marginTop;
            page._altitude = page._totalItems.length;
            page._itemHeight = page._getHeight(page._firstItem);
            page._thickness = Math.ceil(page._altitude / page._menuSize);
            menuBox.style.height = page._multipleByPixels(page._itemHeight, page._menuSize);
        };

        this.hasClass = function(ele, cls) {
            return ele.className.search(new RegExp('(\\s|^)'+cls+'(\\s|$)')) > -1;
        };

        this.removeClass = function(ele, cls) {
            if(!page.hasClass(ele, cls)) return;
            var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
            ele.className = ele.className.replace(reg,' ');
        };

        this.addClass = function(ele, cls) {
            if(page.hasClass(ele, cls)) return;
            ele.className = ele.className + " " + cls;
        };

        this._getHeight = function(e, withMargin) {
            var el;
            try {
                var elStyle = window.getComputedStyle(e, null);
                el = page._sumPixels(
                    elStyle.getPropertyValue('height'),
                    elStyle.getPropertyValue('padding-top') || '0px',
                    elStyle.getPropertyValue('padding-bottom') || '0px',
                    elStyle.getPropertyValue('border-top') || '0px',
                    elStyle.getPropertyValue('border-bottom') || '0px'
                );
                if(withMargin === true) {
                    el = page._sumPixels(
                        el,
                        elStyle.marginTop || '0px',
                        elStyle.marginBottom || '0px'
                    );
                }
            } catch(ee) {
                el = ee.currentStyle.height;
            } finally {
                return el;
            }
        };

        this._sumPixels = function() {
            if(arguments.length === 0) return "0px";
            return [].map.call(arguments, function(e){return e;})
                    .reduce(function(p, c, i) {
                        try {
                            if(typeof c != "string") throw c + ' is not a pixel number.';
                            var num = c.replace(/px$/, "");
                            if(isNaN(num)) throw c + ' is not a pixel number.';
                            else return p + parseFloat(num);
                        } catch(e) {
                            // console.log(e);
                            return p + 0;
                        }
                    }, 0) + "px";
        };

        this._multipleByPixels = function(val, multi) {
            if(arguments.length < 2) return "0px";
            var num;
            try {
                if(typeof val != "string") throw val + ' is not a pixel number.';
                num = val.replace(/px$/, "");
                if(isNaN(num)) throw val + ' is not a pixel number.';
                if(isNaN(multi)) throw multi + ' is not a number.';
                num = parseFloat(val) * multi;
            } catch(e) {
                num = 0;
            } finally {
                return num + "px";
            }
        };

    }
    module.exports = Menu;
})();
