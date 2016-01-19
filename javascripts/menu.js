function Menu(menuSize) {
	this._sumPixels = function() {
		if(arguments.length == 0) return "0px";
		return [].map.call(arguments, function(e){return e;})
				.reduce(function(p, c, i) {
					try {
						return p + parseInt(c.replace("px"));
					} catch(e) {
						return 0;
					}
				}, 0) + "px";
	};
	this._multipleByPixels = function(val, multi) {
		if(arguments.length != 2) return "0px";
		var el;
		try {	
			el = parseInt(val) * multi;
		} catch(e) {
			el = 0;
		} finally {
			return el + "px";
		}
	};

	var page = this;
	this.selectFunction = function(e, arr) {
		[].forEach.call(arr, function(ae) {
			page.removeClass(ae, "menu-item-selected");
		});
		page.addClass(e, "menu-item-selected");
	};
	this._totalItems = [];
	this._menuSize = menuSize;
	this._getHeight = function(e) {
		var el;
		try {
			var elStyle = window.getComputedStyle(e, null);
			el = page._sumPixels(
				elStyle.getPropertyValue('height'), 
				elStyle.marginTop, 
				elStyle.marginBottom,
				elStyle.getPropertyValue('padding-top'),
				elStyle.getPropertyValue('padding-bottom')
			);
		} catch(e) {
			el = e.currentStyle.height;
		} finally {
			return el;
		}
	};
	this._currentPage = 1;
	this._isInCurrentPage = function(index) {
		if(!index) return false;
		if(isNaN(index)) return false;
		return page._currentPage === Math.ceil(index / page._menuSize);
	};
	this.setCurrentPage = function(index) {
		page._currentPage = Math.ceil(index / page._menuSize) || 1;
	}

	this.goToPage = function(specificPage) {
		var marginTop = page._firstItem.originalMarginTop;
		
		page._firstItem.style.marginTop = (page._currentPage > 1) ? 
			page._multipleByPixels(page._getHeight(page._scrollUpButton), (page._currentPage - 1) * -1 * page._menuSize) :
			marginTop;
		
		page._isAbleToGoUp() ? page.removeClass(page._scrollUpButton, "scroll-tool-disabled") : page.addClass(page._scrollUpButton, "scroll-tool-disabled");
		page._isAbleToGoDown() ? page.removeClass(page._scrollDownButton, "scroll-tool-disabled") : page.addClass(page._scrollDownButton, "scroll-tool-disabled");
	};
	this._isAbleToScroll = function() {
		return page._menuSize < page._altitude;
	}
	this._isAbleToGoUp = function() {
		return page._currentPage > 1;
	};
	this.pageUp = function() {
		if(!page._isAbleToScroll()) return;
		if(!page._isAbleToGoUp()) return;
		page._currentPage -= 1;
		page.goToPage(page._currentPage);
	}
	this._isAbleToGoDown = function() {
		return page._currentPage < page._thickness;
	}
	this.pageDown = function() {
		if(!page._isAbleToScroll()) return;
		if(!page._isAbleToGoDown()) return;
		page._currentPage += 1;
		page.goToPage(page._currentPage);
	};
	this.setScrollUpButton = function(e) {
		e.addEventListener("click", function() {
			console.log("up")
			if(page._isAbleToGoUp()) page.pageUp();
		}, false);
		page._scrollUpButton = e;
	};
	this.setScrollDownButton = function(e) {
		e.addEventListener("click", function() {
			console.log(page._isAbleToGoDown())
			if(page._isAbleToGoDown()) page.pageDown();
		}, false);
		page._scrollDownButton = e;
	};
	this.setScrollBox = function(menuBox, itemList) {
		menuBox.innerHTML = itemList.reduce(function(p, c, i) {
						return (i == 0) ?
								p + '<div class="menu-item menu-item-selected">' + c + '</div>' :
								p + '<div class="menu-item">' + c + '</div>'
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
	}

	this.hasClass = function(ele, cls) {
	    return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
	}

	this.removeClass = function(ele, cls) {
        if(!page.hasClass(ele, cls)) return;
        var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
        ele.className = ele.className.replace(reg,' ');
	}

	this.addClass = function(ele, cls) {
		if(page.hasClass(ele, cls)) return;
		ele.className = ele.className + " " + cls;
	}
}