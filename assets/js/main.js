(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1680px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ null,      '736px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Dropdowns.
		$('#nav > ul').dropotron({
			mode: 'fade',
			noOpenerFade: true,
			speed: 300
		});

	// Nav.

		// Toggle.
			$(
				'<div id="navToggle">' +
					'<a href="#navPanel" class="toggle"></a>' +
				'</div>'
			)
				.appendTo($body);

		// Panel.
			$(
				'<div id="navPanel">' +
					'<nav>' +
						$('#nav').navList() +
					'</nav>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'left',
					target: $body,
					visibleClass: 'navPanel-visible'
				});

})(jQuery);










// SLIDER JAVASCRIPT

var wheel = Draggable.create("#wheel", {
	type:"rotation",
	throwProps:true,
	  snap:function(endValue) {
	   return Math.round(endValue / 90) * 90;
	},   
	 onDrag: function() {},
	 onThrowComplete: function() {
	   dragActive()
	 }
 });
 
 TweenMax.set('#wheel li:not(.active) .details> *', {
   opacity: 0,
   y: -10
 })

 TweenMax.set('#wheel li:not(.active) .circle> *', {
	opacity: 0,
	y: -10
  })

 
 
 // Calculate which product is active
 function dragActive() {
   var rot = wheel[0].rotation / 360
   var decimal = rot % 1
   var sliderLength = $('#wheel li').length
   var tempIndex = Math.round(sliderLength * decimal)
   var index
 
   if (rot < 0) {
	 index = Math.abs(tempIndex)
   } else {
	 index = sliderLength - tempIndex
   }
 
   if (decimal === 0) {
	 index = 0
   }
   
   TweenMax.staggerTo('#wheel li.active .details > *', 0.6,   {
	 opacity: 0,
	 y: -10
   }, 0.1)
 
   $('#wheel li.active').removeClass('active')
   $($('#wheel li')[index]).addClass('active')
   
   TweenMax.staggerTo('#wheel li.active .details > *', 0.6,   {
	 opacity: 1,
	 y: 0
   }, 0.1)

      
 }
 
 // Tween rotation
 function rotateDraggable(deg, callback) {
   var rot = wheel[0].rotation
   var tl = new TimelineMax()
 
   tl
	 .to('#wheel', .5, {
	   rotation: rot + deg,
	   onComplete: function() {
		 callback()
	   }
	 });
 
   wheel[0].rotation = rot + deg
 }
 
 // Handlers
 function nextHandler() {
   var current = $('#wheel li.active')
   var item = current + 1
   if (item > $('#wheel li').length) {
	 item = 1
   }
   rotateDraggable(360/$('#wheel li').length, dragActive);
 }
 
 function prevHandler() {
   var current = $('#wheel li.active')
   var item = current - 1
   if (item > 1) {
	 item = $('#wheel li').length
   }
   rotateDraggable(-360/$('#wheel li').length, dragActive);
 }
 
 $('.next').on('click', nextHandler);
 $('.prev').on('click', prevHandler);
 
 var square = '<svg x="0px" y="0px" width="1200px" height="600px" viewBox="0 0 1200 600"><rect x="0.002" y="0.499" width="1200" height="600"/></svg>'

//  modal js
// mODAL






window.onload = function () {
	list = document.querySelectorAll(".modal__trigger");
	console.log(list, 'load')
	for (var i = 0; i < list.length; i++) {
	  list[i].addEventListener("click", function (e) {
		  e.preventDefault();
		  console.log('new click trigger')
	  });
	}
  };

window.onload = function () {
	list = document.getElementsByClassName(".modal__trigger");
	for (var i = 0; i < list.length; i++) {
	  list[i].addEventListener("touchend", function (e) {
		  e.preventDefault();
		  console.log('touched')
	  });
	  list[i].addEventListener("clicked", function (e) {
		e.preventDefault();
		console.log('clicked')
	});
	}
  };

var Modal = (function() {
	
	var trigger = $qsa('.modal__trigger');
	// what you click to activate the modal
	var modals = $qsa('.modal'); // the entire modal (takes up entire window)
	var modalsbg = $qsa('.modal__bg'); // the entire modal (takes up entire window)
	var content = $qsa('.modal__content'); // the inner content of the modal
	  var closers = $qsa('.modal__close'); // an element used to close the modal
	var w = window;
	var isOpen = false;
	  var contentDelay = 400; // duration after you click the button and wait for the content to show
	var len = trigger.length;
  
	// make it easier for yourself by not having to type as much to select an element
	function $qsa(el) {
	  return document.querySelectorAll(el);
	}
  
	var getId = function(event) {
  
	  event.preventDefault();
	  var self = this;
	  // get the value of the data-modal attribute from the button
	  var modalId = self.dataset.modal;
	  var len = modalId.length;
	  // remove the '#' from the string
	  var modalIdTrimmed = modalId.substring(1, len);
	  // select the modal we want to activate
	  var modal = document.getElementById(modalIdTrimmed);
	  // execute function that creates the temporary expanding div
	  makeDiv(self, modal);
	};
  
	var makeDiv = function(self, modal) {
  
	  var fakediv = document.getElementById('modal__temp');
  
	  /**
	   * if there isn't a 'fakediv', create one and append it to the button that was
	   * clicked. after that execute the function 'moveTrig' which handles the animations.
	   */
  
	  if (fakediv === null) {
		var div = document.createElement('div');
		div.id = 'modal__temp';
		self.appendChild(div);
		moveTrig(self, modal, div);
	  }
	};
  
	var moveTrig = function(trig, modal, div) {
	  var trigProps = trig.getBoundingClientRect();
	  var m = modal;
	  var mProps = m.querySelector('.modal__content').getBoundingClientRect();
	  var transX, transY, scaleX, scaleY;
	  var xc = w.innerWidth / 2;
	  var yc = w.innerHeight / 2;
  
	  // this class increases z-index value so the button goes overtop the other buttons
	  trig.classList.add('modal__trigger--active');
  
	  // these values are used for scale the temporary div to the same size as the modal
	  scaleX = mProps.width / trigProps.width;
	  scaleY = mProps.height / trigProps.height;
  
	  scaleX = scaleX.toFixed(3); // round to 3 decimal places
	  scaleY = scaleY.toFixed(3);
  
  
	  // these values are used to move the button to the center of the window
	  transX = Math.round(xc - trigProps.left - trigProps.width / 2);
	  transY = Math.round(yc - trigProps.top - trigProps.height / 2);
  
		  // if the modal is aligned to the top then move the button to the center-y of the modal instead of the window
	  if (m.classList.contains('modal--align-top')) {
		transY = Math.round(mProps.height / 2 + mProps.top - trigProps.top - trigProps.height / 2);
	  }
  
  
		  // translate button to center of screen
		  trig.style.transform = 'translate(' + transX + 'px, ' + transY + 'px)';
		  trig.style.webkitTransform = 'translate(' + transX + 'px, ' + transY + 'px)';
		  // expand temporary div to the same size as the modal
		  div.style.transform = 'scale(' + scaleX + ',' + scaleY + ')';
		  div.style.webkitTransform = 'scale(' + scaleX + ',' + scaleY + ')';
  
  
		  window.setTimeout(function() {
			  window.requestAnimationFrame(function() {
				  open(m, div);
			  });
		  }, contentDelay);
  
	};
  
	var open = function(m, div) {
  
	  if (!isOpen) {
		// select the content inside the modal
		var content = m.querySelector('.modal__content');
		// reveal the modal
		m.classList.add('modal--active');
		// reveal the modal content
		content.classList.add('modal__content--active');
  
		/**
		 * when the modal content is finished transitioning, fadeout the temporary
		 * expanding div so when the window resizes it isn't visible ( it doesn't
		 * move with the window).
		 */
  
		content.addEventListener('transitionend', hideDiv, false);
  
		isOpen = true;
	  }
  
	  function hideDiv() {
		// fadeout div so that it can't be seen when the window is resized
		div.style.opacity = '0';
		content.removeEventListener('transitionend', hideDiv, false);
	  }
	};
  
	var close = function(event) {
  
		  event.preventDefault();
	  event.stopImmediatePropagation();
  
	  var target = event.target;
	  var div = document.getElementById('modal__temp');
  
	  /**
	   * make sure the modal__bg or modal__close was clicked, we don't want to be able to click
	   * inside the modal and have it close.
	   */
  
	  if (isOpen && target.classList.contains('modal__bg') || target.classList.contains('modal__close')) {
  
		// make the hidden div visible again and remove the transforms so it scales back to its original size
		div.style.opacity = '1';
		div.removeAttribute('style');
  
			  /**
			  * iterate through the modals and modal contents and triggers to remove their active classes.
		* remove the inline css from the trigger to move it back into its original position.
			  */
  
			  for (var i = 0; i < modals.length; i++) {
				  modals[i].classList.remove('modal--active');
				  content[i].classList.remove('modal__content--active');
				  trigger[i].style.transform = 'none';
		  trigger[i].style.webkitTransform = 'none';
				  trigger[i].classList.remove('modal__trigger--active');
			  }
  
		// when the temporary div is opacity:1 again, we want to remove it from the dom
			  div.addEventListener('transitionend', removeDiv, false);
  
		isOpen = false;
  
	  }
  
	  function removeDiv() {
		setTimeout(function() {
		  window.requestAnimationFrame(function() {
			// remove the temp div from the dom with a slight delay so the animation looks good
			div.remove();
		  });
		}, contentDelay - 50);
	  }
  
	};
  
	function stopTouchendPropagationAfterScroll(){
		var locked = false;
		window.addEventListener('touchmove', function(ev){
			locked || (locked = true, window.addEventListener('touchend', stopTouchendPropagation, true));
		}, true);
		function stopTouchendPropagation(ev){
			ev.stopPropagation();
			window.removeEventListener('touchend', stopTouchendPropagation, true);
			locked = false;
		}
	}

	var bindActions = function() {
	  for (var i = 0; i < len; i++) {
		trigger[i].addEventListener('click', getId, false);
		trigger[i].addEventListener('touchend', getId, stopTouchendPropagationAfterScroll(), false);
		trigger[i].addEventListener('touchendoutside', getId, stopTouchendPropagationAfterScroll(), false)
		closers[i].addEventListener('click', close, false);
		closers[i].addEventListener('touchend', close, false);
		modalsbg[i].addEventListener('click', close, false);
		modalsbg[i].addEventListener('touchend', close, false);
	  }
	};
  
	var init = function() {
	  bindActions();
	};
  
	return {
	  init: init
	};
  
  }());
  
  Modal.init();

setTimeout(function() {
    $('#promo').fadeOut('slow');
}, 3500);

setTimeout(function(){
	$('.lead').fadeIn('slow')
	},4000);

setTimeout(function(){
		$('.question').fadeOut('slow')
		},3500);

setTimeout(function(){
			$('body').removeClass('stop-scrolling')
			},3500);

			$.each($('*'), function() { if ($(this).width() > $('body').width()) { console.log($(this).get(0)); } }).length;