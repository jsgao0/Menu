



var menu = new Menu(7);
var menuBox = document.getElementsByClassName("scroll-box")[0];
var itemList = [0,1,2,3,4,5,6,7,8,9,10];

menu.setScrollBox(menuBox, itemList);
menu.setScrollUpButton(document.getElementsByClassName("scroll-up")[0]);
menu.setScrollDownButton(document.getElementsByClassName("scroll-down")[0]);

