// INIT VARIABLES
var root = 'https://pwasample.github.io/';
var useHash = false;
var router = new Navigo(root, useHash, '#');
var modal = document.getElementById('modal-preloader');
var modalLoading = M.Modal.init(modal, {dismissible:false});
var pageLoading = $('#page-loading');
var content = $(".body-content");
M.AutoInit();

$(function(){


	// LOAD PAGE CONTENT
	router.on(function () {
	    loadPage('home');
	});
	router.on('articles', function () {
	    loadArticles();
	});
	router.on(':page', function(params) {
		let path = 'pages/404';
		for(var i = 0; i < pages.length; i++) {
        	if(pages[i].uri == params.page){
				path = pages[i].path;
				break;
        	}
    	}
    	loadPage(path);
	})
	router.resolve();

	// SIDEBAR NAVIGATION
	M.Sidenav.init($('.sidenav'));
	$.get('navs.html', function(data){
		$(".topnav, .sidenav").html(data);
	
		$(".sidenav a, .topnav a").on('click', function(e){
			e.preventDefault();
			var page = $(this).attr('href');
			router.navigate(page);
		});
	});
	
	function loadPage(path)
	{
		pageLoading.show();
		content.hide();

		$.ajax({
			url: path + '.html',
			success: function(data, status, xhr){
				pageLoading.hide();
				content.html(data);
				content.fadeIn(200);
			},
			error: function(xhr, errorType, error){
				pageLoading.hide();
				content.fadeIn(200, function(){
					if(xhr.status == 404) {
						content.html("<p>Halaman tidak ditemukan.</p>");
					} else {
						content.html("<p>Ups.. halaman tidak dapat diakses.</p>");
					}
				});
			}
		});
	}

	function loadArticles()
	{
		content.hide();
		content.html("<h2>coming soon</h2>");
		content.fadeIn(200);
	}

});