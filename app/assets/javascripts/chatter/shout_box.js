var dispatcher = new WebSocketRails(window.location.host+'/websocket');
function openChatBoxFor(el){
  var exists = $('#chat_container:has(li[value='+$(el).val()+'])').length
  if(exists == 0)
  {
    $.ajax({
    type: 'POST',
    url: 'chat/chats/open_conversation',
    data: {"recipient_id": $(el).val()},
    success: function(data) {
      if(data){
        var old_msgs=JSON.parse(data["old_messages"]);
        var str=""
        old_msgs.forEach(function(msg){
          var parsed_msg = JSON.parse(msg)
          var sent=new Date(parsed_msg["sent_at"])
          var sent_at="";
          if(sent.toDateString()===(new Date).toDateString()){
            sent_at=sent.toLocaleTimeString();
          }
          else{
            sent_at=sent.toLocaleString();
          }
          if(parsed_msg["msg_from"] == $(el).val()){
            str += '<div class="callout top-right">'+parsed_msg["msg"]+'<br/><span class="sent_at">'+sent_at+'</span></div>'
          }
          else{
            str += '<div class="callout top-left">' + parsed_msg["msg"]+'<br/><span class="sent_at">'+sent_at+'</span></div>'
          }
        });
        var chatbox = '<li class="chatter_box" name="'+data["conversation_id"]+'" value='+$(el).val()+'><div class="shout_box float-left"><div class="chat_header" onclick="$(this).next().slideToggle();"><div class="row" style="vertical-align:bottom"><div class="col-xs-10"><u>'+$(el).text()+'</u></div><div class="btn btn-xs col-xs-2" onclick="$(this).parent().parent().parent().parent().remove()" style="margin-right:0">X</div></div></div><div class="toggle_chat"><div class="message_box" id="message_box_'+$(el).val()+'">'+str+'</div><div class="user_info"><input name="shout_message" id="shout_message" type="text" placeholder="Type Message & Hit Enter" maxlength="160" onkeyup="if(isEnterPressed(event)){sendMessage(this)} else {sendTyping(this)}" /></div></div></div></li>';
        $(chatbox).appendTo($('#chat_container'));
        $("#message_box_"+$(el).val()).next().children().first().focus();
        $("#message_box_"+$(el).val()).animate({scrollTop: $("#message_box_"+$(el).val()).prop('scrollHeight')},2000);
      }
      else {
        alert('Something went wrong');
      }
    }
  });
  }
  $("#message_box_"+$(el).val()).next().children().first().focus();
  return true
}
function isEnterPressed(e){
	var keycode=null;
	if (e!=null){
		if (window.event!=undefined){
			if (window.event.keyCode) keycode = window.event.keyCode;
			else if (window.event.charCode) keycode = window.event.charCode;
		}else{
			keycode = e.keyCode;
		}
	}
return (keycode == 13);
}
function sendMessage(el){
  var msg = $(el).val()
  var sent_at=(new Date).toLocaleTimeString();
  $(el).parent().prev().append('<div class="callout top-left">' + msg +'<br/><span class="sent_at">'+sent_at+'</span></div>');
  $(el).parent().prev().animate({scrollTop: $(el).parent().prev().prop('scrollHeight')});

  $(el).val('');
  dispatcher.trigger('tasks.new_message', {"conversation_id": $(el).closest('.chatter_box').attr('name'), "msg_from": $('#user_id').val(), "msg_to": $(el).closest('.chatter_box').val() , "msg": msg});
}

function appendMessage(msg){
  if($('#message_box_'+JSON.parse(msg)["msg_from"]).length == 0){
    openChatBoxFor($('.chatter_friend[value='+JSON.parse(msg)["msg_from"]+']'));
  }
  var sent_at=(new Date).toLocaleTimeString();
  $('#message_box_'+JSON.parse(msg)["msg_from"]).append('<div class="callout top-right">'+JSON.parse(msg)["msg"]+'<br/><span class="sent_at">'+sent_at+'</span></div>');
  $('#message_box_'+JSON.parse(msg)["msg_from"]).animate({scrollTop: $('#message_box_'+JSON.parse(msg)["msg_from"]).prop('scrollHeight')});
}
