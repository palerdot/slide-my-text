




$(document).ready(function(){

	//prepare document ready variables and events
	
	var io = $('#intro_overlay');
	var im = $('#intro_modal');
	
	var ic = $('#intro_close');
	var ptc = $('#plain_text_close');
	
	var csmb = $('#create_slide_message_button');
	var settings = $('#settings');
	
	var sptb = $('#show_plain_text_button');
	var spt = $('#show_plain_text');
	
	var cs = $('#create_slide');
	
	var ss = $('#slide_show_pane');
	
	show_intro_overlay();
	
	
	
	//event listeners
	
	cs.click(function(){
		ss.fadeIn();
	});
	
	ic.click(function(){
	
			im.removeClass('in').fadeOut();
			io.fadeOut();
	
	});
	
	ptc.click(function(){
		spt.fadeOut();
	});
	
	csmb.click(function(){
	
		im.removeClass('in').delay('300').fadeOut();
		io.fadeOut();
	
	});
	
	settings.click(function(){
	
		show_intro_overlay();
	
	});
	
	sptb.click(function(){
	
		spt.fadeIn();	
	
	});
	
	//end of event listeners
	
	// modules
	
	// show_intro_overlay module
	
	function show_intro_overlay(){

		io.fadeIn();
		im.fadeIn().addClass('in');

	}

});


