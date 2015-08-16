		$(document).ready(function(){

			for(var i = 0; i < 3; i++){
        		$('tbody tr').clone().appendTo('table');
    		}
			
			$('th, td').each(function() {
				$(this).text($(this).attr('abbr'));
			})

			$('td').on('mouseenter mouseleave', function() {
				var i = this.cellIndex;
			
				$(this)
					.closest('table')
					.find('tr')
					.each(function() {
					  $(this)
					    .find('td')
					    .eq(i)
					    .toggleClass('hover');
					});
			});

			$('.tablo').stickyTableHeaders();

			$('td').click(function(){
				name = $(this).parent('tr').children('td:eq(2)').text();
				fullInfo = window.open('./fullinfo.html?num=' + name, '_blank', "menubar=no,location=no,resizable=no,scrollbars=yes,status=yes");
				fullInfo.focus()
			})
		});