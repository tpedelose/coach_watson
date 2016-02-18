$(function () {
  /* Fucntions for updating the dialog stream */
    // Websocket with server to preprocess sumbissions before sending to Watson
    var ws = new WebSocket('ws://' + window.location.host + '/ws');
    ws.onopen = function() {
    };
    ws.onmessage = function(evt) {
        var answer = $('<div />', {
            'class': 'col-xs-12'
        })
        answer.append($('<div />', {
            'class': 'panel panel-default panel-answer'
        }))
        if(evt.data[0] === '<') {
            answer.children(0).append($('<div class="panel-heading">I think this might work for you ...</div>'));
            answer.children(0).append($(evt.data));
        } else {
            answer.children(0).append($('<div />', {
                'class': 'panel-body' ,
                text: evt.data
            }))
        }
        $('#center-dialog').prepend(answer);
    }
    // Upon submission of a quesiton
    $('form').submit(function(){
        var question_text = $('#query-bar').val();
        ws.send(question_text);
        $('#query-bar').val('');
        var question = $('<div />', {
            'class': 'col-xs-12'
        })
        question.append($('<div />', {
            'class': 'panel panel-default panel-question'
        }))
        question.children(0).append($('<div />', {
            'class': 'panel-body',
            text: question_text
        }))
        var line_break = $('<div />', {
            'class': 'col-xs-12'
        })
        line_break.append('<hr>');
        $('#center-dialog').prepend(line_break);
        $('#center-dialog').prepend(question);
        // Prevents page from reloading
        return false;
    });
    // Submit button for input is clicked
    $('#ask-button').click(function() {
        ws.send($('#query-bar').val());
        $('#query-bar').val('');
    });

  /* Side drawer functions*/
    $('#page-mask').click(function() {
        closeDrawer();
    });
    $('#drawer-exit').click(function() {
        closeDrawer();
    });
    function closeDrawer() {
      if($('#panel-left').hasClass('expanded')) {
          $('#panel-left').removeClass('expanded');
      }
      $('#page-mask').removeClass('visible');
    }
    $('#input-menu').click(function() {
        if($('#panel-left').hasClass('expanded')) {
            $('#panel-left').removeClass('expanded');
        } else {
            $('#panel-left').addClass('expanded');
        }
        $('#page-mask').addClass('visible');
    });
});
