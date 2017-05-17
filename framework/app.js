var auth, receiver;
var tempa, temps, interval, intUser;
var initmes, times;
var searchres = '';
var searchm = '';
var bl = true;
var name;
var selectedBool = true;
var selectArray = [];
var countSelect = 0;
  

  function changeUrl(url) {
    $('.userlist3').css("background-image","");
    $('.userlist3').css("background-image","url("+url+")");
  };

var t = function(dic){
    var res;
    if(auth>receiver) res=auth+receiver;
    else res=receiver+auth;

    if(!space.get(res))
      space.set(res, []);
    space.set(res,dic);
};
var updateT = function(updatedAuthor, dic){
    var res, x;
    var users = space.get('allusers');
    for(var i=0; i<users.length; i++) {
      if(users[i].author!=auth) {
         if(auth>users[i].author) {res=auth+users[i].author; x=updatedAuthor+users[i].author;}
         else {res=users[i].author+auth;x=users[i].author+updatedAuthor;}
         var mes=space.get(res);
         for(var j = 0; j < mes.length; j++){
          if(mes[j].author == name){
            mes[j].author=updatedAuthor;
            message[j].message=mes[j].message;
            message[j].time=mes[j].time;
          }
          else {
            mes[j].author=receiver;
            message[j].message=mes[j].message;
            message[j].time=mes[j].time;
          }
        }
          space.set(x,mes);
          space.remove(res);
      }
    }
    auth = updatedAuthor;
};

recFunc = function(receivercollection, name) {
    var users = space.get('allusers');
    
    function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }
    users = sortByKey(users,'time'); 
    users.reverse();
    for(var i = 0; i < users.length; i++){
        if(users[i].author!=name && searchres=='') 
          receivercollection.push({
            receiver:users[i].author,
            recstatus:users[i].status,
            time:users[i].time
          });
        else if(users[i].author!=name && users[i].author.includes(searchres)) {
          receivercollection.push({
            receiver:users[i].author,
            recstatus:users[i].status,
            time:users[i].time
          });
        }
      }
  }
  recClear = function(receivercollection) {
    receivercollection.reset();
  }
  var updateUserList = function(receivercollection, name){
      intUser = setInterval(function(){
        recClear(receivercollection);
        recFunc(receivercollection, name);
      }, 1000);
  };
  
  dicClear = function(dic, dicdelete, chatcollection) {
    dic.reset();
    dicdelete.reset();
    chatcollection.reset();
  }
  
  var getAllMessages=function(dic, name, dicdelete, chatcollection){
  var res;
  var users = space.get('allusers');
  if(auth>receiver) res=auth+receiver;
  else res=receiver+auth;

  if(!space.get(res))
    space.set(res, []);
  var mes=space.get(res);
  
  chatcollection.push ({
    chatnumber: users.length,
    messagenumber: mes.length
  });

  for(var i = 0; i < mes.length; i++){
  if(searchm == '') {
  if(mes[i].message.includes('<i>deleted</i>')) {
      dicdelete.push({
        authorx: mes[i].author,
        messagex: mes[i].message,
        timex: mes[i].time
      }); 
  }
  else {
  if(mes[i].author == name){
    dic.push({
        author: mes[i].author,
        message: mes[i].message,
        time: mes[i].time
      }); 
  } 
  else{
    dic.push({
        author: receiver,
        message: mes[i].message,
        time: mes[i].time
      });
      }
    }
  }
  else {
  if(mes[i].author == name && mes[i].message.includes(searchm)){
    dic.push({
        author: mes[i].author,
        message: mes[i].message,
        time: mes[i].time
      }); 
  } 
  else if(mes[i].message.includes(searchm)==searchm){
    dic.push({
        author: receiver,
        message: mes[i].message,
        time: mes[i].time
      });
    }
  }     
    // if(messages[i].author == author) isRight = 1;
    // else isRight = 0;
    // div.append(renderMessagesInSpan(messages[i].text,messages[i].time, isRight));
  }
};
var changeMessage = function(mesx,times, name) {
  var res;
  if(auth>receiver) res=auth+receiver;
  else res=receiver+auth;

  if(!space.get(res))
    space.set(res, []);
  var mes=space.get(res);
  for(var i = 0; i < mes.length; i++){
  if(mes[i].author == name && mes[i].message == initmes) 
    mes[i].message = mesx + ' <i>edited</i>';
    mes[i].times = times;
  }
  space.set(res, mes);
};

var changeToRed = function(mesx,times, name, color) {
  var res;
  if(auth>receiver) res=auth+receiver;
  else res=receiver+auth;

  if(!space.get(res))
    space.set(res, []);
  var mes=space.get(res);
  for(var i = 0; i < mes.length; i++){
  if(mes[i].author == name && mes[i].message == mesx) 
    mes[i].message = '<span style="color:'+color+'">'+mesx+'</span>';
    mes[i].times = times;
  }
  space.set(res, mes);
};

var changeSelectColor = function(arr,times, name, color) {
  var res;
  if(auth>receiver) res=auth+receiver;
  else res=receiver+auth;

  if(!space.get(res))
    space.set(res, []);
  var mes=space.get(res);
  for(var i = 0; i < mes.length; i++){
    for(var j=0; j<arr.length; j++) {
      if(mes[i].author == name && mes[i].message == arr[j]){ 
         mes[i].message = '<span style="color:'+color+'">'+arr[j]+'</span>';
      }
    }
  }
  space.set(res, mes);
};

var removeMessage = function(mesx, times, name) {
  var res;
  if(auth>receiver) res=auth+receiver;
  else res=receiver+auth;

  if(!space.get(res))
    space.set(res, []);
  var mes=space.get(res);
  for(var i = 0; i < mes.length; i++){
  if(mes[i].author == name && mes[i].message == mesx) 
    mes[i].message = '<i>deleted</i>';
    delete mes[i].times;
  }
  space.set(res, mes);
};

var removeSelectedMessage = function(a, times, name) {
  var res;
  if(auth>receiver) res=auth+receiver;
  else res=receiver+auth;

  if(!space.get(res))
    space.set(res, []);
  var mes=space.get(res);
  for(var i = 0; i < mes.length; i++){
    for(var j=0; j<a.length; j++) {
      if(mes[i].author == name && mes[i].message == a[j]){ 
        mes[i].message = '<i>deleted</i>';
        delete mes[i].times;
      }
    }
  }
  space.set(res, mes);
};


var removeUser = function(r, name) {
  var res;
  if(auth>receiver) res=auth+receiver;
  else res=receiver+auth;
  space.remove(res);

  var users = space.get('allusers');
    for(var i = 0; i < users.length; i++){
        if(users[i].author==r){
            users.splice(i,1);
      }
  }
  space.set('allusers', users);
}

var refreshUser = function(r, name) {
  var res;
  if(auth>receiver) res=auth+receiver;
  else res=receiver+auth;
  space.remove(res);
}

var updateMessages= function(dic, name, b, dicdelete, chatcollection){
  if(b) {
  interval = setInterval(function(){
    dicClear(dic, dicdelete, chatcollection);
    getAllMessages(dic, name, dicdelete, chatcollection);
  }, 2000);
  }
  else {
    clearInterval(interval);
  }
};

var l = function(status){
  var b = true;    
  auth = name;
  
  var viewReceiver = Marionette.View.extend({
    template: '#receiver',
    ui: {
      deletechat: '.delete-chat',
      refresh: '.refresh-chat'
    },

    events: {
      'click @ui.deletechat': 'deleteChat',
      'click @ui.refresh': 'refChat' 
    },

    deleteChat() {
      var temp = this.$('.r').html();
      this.model.destroy();
      removeUser(temp, name);
    },

    refChat() {
      var temp = this.$('.r').html();
      refreshUser(temp, name);
    }
  });

  var receivercontainer = Marionette.CollectionView.extend({
    childView: viewReceiver,
    tagName: 'div'
  });

  var receivercollection = new Backbone.Collection([
  ]); 

  var viewAuthor = Marionette.View.extend({
    template: '#users',

    ui: {
      edit: '.edit-user',
      update: '.update-user',
      editstatus: '.edit-status',
      updatestatus: '.update-status'
    },

    events: {
      'click @ui.edit': 'editUser',
      'click @ui.update': 'updateUser',
      'click @ui.editstatus': 'editStat',
      'click @ui.updatestatus': 'updateStat'
    },

    editUser() {
      tempa = this.$('.author').html();
      temps = this.$('.status').html();
      this.$('.edit-user').hide();
      this.$('.update-user').show();

      var mes = this.$('.author').html();
      this.$('.author').html('<input type="text" class="a-update" value="' + mes + '">');
    },

    updateUser() {
      this.$('.edit-user').show();
      this.$('.update-user').hide();
      var updatedAuthor = $('.a-update').val();
      this.$('.author').html(updatedAuthor);
      var temp = space.get('allusers');
      for (var i = 0; i < temp.length; i++)
      {
          if (temp[i].author == tempa)  
            {
              temp[i].author = updatedAuthor;
              space.set('allusers', temp);
              break;
            }
      }
      name = updatedAuthor;
      clearInterval(intUser);
      updateUserList(receivercollection, name);
      updateT(updatedAuthor, dic);
    },
    
    editStat() {
      tempa = this.$('.author').html();
      temps = this.$('.status').html();
      this.$('.edit-status').hide();
      this.$('.update-status').show();

      var s = this.$('.status').html();
      this.$('.status').html('<input type="text" class="s-update" value="' + s + '">');
    },

    updateStat() {
      this.$('.edit-status').show();
      this.$('.update-status').hide();
      var updatedStatus = $('.s-update').val();
      this.$('.status').html(updatedStatus);
      var temp = space.get('allusers');
      for (var i = 0; i < temp.length; ++i)
      {
        if (temp[i].author == tempa && temp[i].status == temps) temp[i].status = updatedStatus;
       }
      space.set('allusers', temp);
    }
  });
  
  updateUserList(receivercollection, name);
  var usercontainer = Marionette.CollectionView.extend({
    childView: viewAuthor,
    tagName: 'span'
  });

    var usercollection = new Backbone.Collection([
  ]);

  usercollection.push({
    author: name,
    userstatus: status
  });
  
  var view = Marionette.View.extend({
    template: '#message',

    ui: {
      remove: '.delete-this',
      edit: '.edit-this',
      update: '.update-this',
      red: '.red',
      yellow: '.yellow',
      blue: '.blue',
      check: '.select',
      checked: '.selected'
    },

    events: {
      'click @ui.remove': 'deleteThis',
      'click @ui.edit': 'editThis',
      'click @ui.update': 'updateThis',
      'click @ui.check': 'selectThis',
      'click @ui.checked': 'selectedThis',
      'click @ui.red' : 'toColorRed',
      'click @ui.yellow' : 'toColorYellow',
      'click @ui.blue' : 'toColorBlue',
      'click @ui.check': 'selectThis',
      'click @ui.checked': 'selectedThis'
    },

    deleteThis() {
      if(selectedBool) {
         this.$('.edit-this').hide();
        var temp = this.$('.sms').html();
        this.model.destroy();
        removeMessage(temp,times,name);
      }
    },

    selectThis() {
        b = false;
        selectedBool = false;
        countSelect++;
        updateMessages(dic, name, b, dicdelete, chatcollection);
        $('.edit-this').hide();
        this.$('.select').hide();
        this.$('.selected').show();
        $('.delete-this').hide();
        $('.red').hide();
        $('.yellow').hide();
        $('.blue').hide();
        $('.selectbtn').show();
        $('.selection').show();
        $('.selectred').show();
        $('.selectyellow').show();
        $('.selectblue').show();
        selectArray.push(this.$('.sms').html());
        console.log(selectArray);
    },

    selectedThis() {
        countSelect--;
        if(countSelect == 0) {
          b = true;
          selectedBool = true;
          $('.selectbtn').hide();
          $('.selection').hide();
          $('.selectred').hide();
          $('.selectyellow').hide();
          $('.selectblue').hide();
          $('.delete-this').show();
          $('.red').show();
          $('.yellow').show();
          $('.blue').show();
          $('.edit-this').show();
          updateMessages(dic, name, b, dicdelete, chatcollection);
        }
        this.$('.selected').hide();
        this.$('.select').show();
        for(i=0; i<selectArray.length; i++) {
          if(selectArray[i] == this.$('.sms').html()) {
            selectArray.splice(i,1);
            console.log(selectArray);
            break;
          }
        }
    },

    editThis() {
      b = false;
      updateMessages(dic, name, b, dicdelete, chatcollection);

      this.$('.edit-this').hide();
      this.$('.update-this').show();

      var mes = this.$('.sms').html();
      initmes = mes;
      this.$('.sms').html('<input type="text" class="mes-update" value="' + mes + '">');
    },

    updateThis() {
      b = true;
      updateMessages(dic, name, b, dicdelete, chatcollection);

      this.$('.edit-this').show();
      this.$('.update-this').hide();

      var mesx = $('.mes-update').val();
      this.$('.sms').html(mesx);
      var timex =  new Date();
          times = timex.getHours().toString() + ':'  
                    + timex.getMinutes().toString(); 
      if(initmes!=mesx) changeMessage(mesx,times, name);
    },

    toColorRed() {
      if(bl) {
      this.$('.sms').removeClass('blue','yellow');
      this.$('.sms').addClass('red');
      changeToRed(this.$('.sms').html(), times, name, 'red');
      }
      else {
        alert('You can not edit');
        bl = true;
      }
    },
    toColorYellow() {
      this.$('.sms').removeClass('blue','red');
      this.$('.sms').addClass('yellow');
      changeToRed(this.$('.sms').html(), times, name, 'yellow');
    },
    toColorBlue() {
      this.$('.sms').removeClass('red','yellow');
      this.$('.sms').addClass('blue');
      changeToRed(this.$('.sms').html(), times, name, 'blue');
    }
  });

  var container = Marionette.CollectionView.extend({
    childView: view,
    tagName: 'div'
  });

  var dic = new Backbone.Collection([
  ]);

  var viewx = Marionette.View.extend({
    template: '#messagex',
    ui: {}
  });
  
  var deletecontainer = Marionette.CollectionView.extend({
    childView: viewx,
    tagName: 'div'
  });

  var dicdelete = new Backbone.Collection([
  ]);

  var viewChat = Marionette.View.extend({
  template: '#chatcount',
  ui:{}
  });

  var chatcontainer = Marionette.CollectionView.extend({
    childView: viewChat,
    tagName: 'div'
  });

  var chatcollection = new Backbone.Collection([
  ]); 


  window.dic = dic;

  $('.selectbtn').on('click', function(){
      b = true;
      selectedBool = true;
      $('.selectbtn').hide();
      $('.selection').hide();
      $('.selectblue').hide();
      $('.selectyellow').hide();
      $('.selectred').hide();
      updateMessages(dic, name, b, dicdelete, chatcollection);
      removeSelectedMessage(selectArray, times, name);
      selectArray = [];
      countSelect = 0;
    });

  $('.selectblue').on('click', function(){
      b = true;
      selectedBool = true;
      $('.selectbtn').hide();
      $('.selection').hide();
      $('.selectblue').hide();
      $('.selectyellow').hide();
      $('.selectred').hide();
      updateMessages(dic, name, b, dicdelete, chatcollection);
      changeSelectColor(selectArray, times, name, 'blue');
      selectArray = [];
      countSelect = 0;
    });

  $('.selectyellow').on('click', function(){
      b = true;
      selectedBool = true;
      $('.selectbtn').hide();
      $('.selection').hide();
      $('.selectblue').hide();
      $('.selectyellow').hide();
      $('.selectred').hide();
      updateMessages(dic, name, b, dicdelete, chatcollection);
      changeSelectColor(selectArray, times, name, 'yellow');
      selectArray = [];
      countSelect = 0;
    });

  $('.selectred').on('click', function(){
      b = true;
      selectedBool = true;
      $('.selectbtn').hide();
      $('.selection').hide();
      $('.selectblue').hide();
      $('.selectyellow').hide();
      $('.selectred').hide();
      updateMessages(dic, name, b, dicdelete, chatcollection);
      changeSelectColor(selectArray, times, name, 'red');
      selectArray = [];
      countSelect = 0;
    });

  $('.submit').on('click', function(){
    var text = $('#editor').html();
    var timex = new Date(); 
    if(timex.getMinutes() < 10) { 
      times = timex.getHours().toString() + ":0"  
                + timex.getMinutes().toString();
    }
    else {
      times = timex.getHours().toString() + ':'  
                    + timex.getMinutes().toString();  
    }
    if(text){
      dic.push({
        author: auth,
        message: text,
        time: times
      });
      console.log(dic.message);
      $('#editor').html('');
      t(dic);
    }
  });

  $('.findx').on('click', function(){
    searchres = $('.search').val();
    if(searchres){
      updateUserList(receivercollection, name);
    }
      $('.search').val('');
  });

  $('.findmes').on('click', function(){
    searchm = $('.searchmes').val();
    if(searchm){
      updateMessages(dic, name, b, dicdelete, chatcollection);
    }
      $('.searchmes').val('');
  });

  $(('#editor')).on('keydown', function(e) {
   var text = $('#editor').html();
   var timex = new Date(); 
   console.log(text);
    if(timex.getMinutes() < 10) { 
      times = timex.getHours().toString() + ":0"  
                + timex.getMinutes().toString();
    }
    else {
      times = timex.getHours().toString() + ':'  
                    + timex.getMinutes().toString();  
    }

    if (text.slice(0,8) == 'https://' || text.slice(0,7) == 'http://'){
     text='<a href="'+text+'" target="_blank">'+text+'</a>';   
  }

    else if (text.slice(0,4) == 'www.' || text.includes('.com') || text.includes('.ru') 
     || text.includes('.kz') || text.includes('.org')){
        text='<a href="https://'+text+'" target="_blank">'+text+'</a>';
  }

   if(e.which == 13 && text){
      dic.push({
        author: auth,
        message: text,
        time: times
      });
      e.preventDefault();
      $('#editor').html('');
      t(dic);
    }
});

  var viewHolder = Marionette.View.extend({
    template: '#holder',
    ui: {}
  });

  var holdercontainer = Marionette.CollectionView.extend({
    childView: viewHolder,
    tagName: 'div'
  });

  var holder = new Backbone.Collection([
  ]);

  $(document).on('click', '.r', function() {
      receiver=$(this).text();
      holder.reset();
      var users = space.get('allusers');
        for(var i = 0; i < users.length; i++){
  if(users[i].author == receiver){
    holder.push({
          receiverholder: receiver,
          receiverstatus: users[i].status,
          receivertime: users[i].time
      }); 
     }    
    }
  });

  updateMessages(dic, name, b, dicdelete, chatcollection);

  (new container({
    el: '.test-container',
    collection: dic
  })).render();

  (new chatcontainer({
    el: '.count-container',
    collection: chatcollection
  })).render();

  (new deletecontainer({
    el: '.test-container',
    collection: dicdelete
  })).render();

  (new usercontainer({
    el: '.author-container',
    collection: usercollection
  })).render();

  (new receivercontainer({
    el: '.receiver-container',
    collection: receivercollection
  })).render();

  (new holdercontainer({
    el: '.holder-container',
    collection: holder
  })).render();

};

var checkName = function(name) {
var check = true;
if(!space.get('allusers')) { space.set('allusers', []);}
  

 var users = space.get('allusers');
 var status = $('.statusinput').val(); 
 $('.statusinput').val('');
 var timex = new Date(); 
 if(timex.getMinutes() < 10) { 
    times = timex.getHours().toString() + ":0"  
                + timex.getMinutes().toString();
  }
  else {
      times = timex.getHours().toString() + ':'  
                    + timex.getMinutes().toString();  
  }
 for(var i=0; i<users.length; i++) {
  if(users[i].author == name) {
     check = false;
     $('.login').hide();
     $('.bodyView').show();
     users[i].status=status;
     users[i].time=times;
    space.set('allusers', users);
     l(users[i].status);
     break;
    }
  }
    if(check) {
    $('.statusinput').show();
    users.push({
      author: name,
      status: status,
      time: times
    });
    space.set('allusers', users);
    $('.login').hide();
    $('.bodyView').show();
    l(status);
  }
}

var space = {
  get: function(key){
    return JSON.parse(localStorage.getItem(key));
  },

  set: function(key, val){
    var tmp = JSON.stringify(val);
    localStorage.setItem(key, tmp);
  },

  remove: function(key){
    localStorage.removeItem(key);
  },

  clear: function(){
    localStorage.clear();
  }
};

$(document).ready(function(){

  $('.sbmitbtn').click(function(){
  name = $('.nameinput').val();
  $('.nameinput').val('');
  if(name) checkName(name);
  else {
    $('.statusinput').val('');
    $('.exists').show();
  }
});
});
