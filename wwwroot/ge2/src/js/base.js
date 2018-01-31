$(document).ready(function () {
	var url = window.location;
	$('div.navbar-nav a').removeClass('active');
	$('div.navbar-nav a').filter(function () {
		return this.href == url;
	}).addClass('active');

});
