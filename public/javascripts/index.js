(function(){

// 插入 <ul> 之 <li> 樣板
var tmpl = '<li><input type="text"><span></span></li>',
    addButton = $('#add'),
    connected = $('.connected'),      // 三個 <ul>
    placeholder = $('#placeholder'),  // 三個 <ul> 的容器
    mainUl = $('.main'),              // main <ul>
    deleteUl = $('.delete'),          // delete <ul>
    doneUl = $('.done');              // done <ul>

    
// add button    
addButton.on('click',function(){
	$(tmpl).prependTo(mainUl).addClass('is-editing').find('input').focus();

});    
function save(){
    var arr=[];
    
    mainUl.find('li').each(function(){
        var Q = new Object();
        Q.text = $(this).text()
        Q.done = $(this).hasClass('is-done');
        arr.push(Q);
    });
    localStorage.todoItems = JSON.stringify(arr);
}
//
function load(){
    var arr = JSON.parse(localStorage.todoItems);
    var i;
    for(i=0; i<arr.length; i+=1){
        
        if(arr[i].done){
            $(tmpl).appendTo(mainUl).addClass('is-done').find('span').text(arr[i].text);
        }    
        else
            $(tmpl).appendTo(mainUl).find('span').text(arr[i].text);
  }
}
//save as pressing Enter    
mainUl.on('keyup','input',function(e){
    if(e.which === 13){
        var input = $(this);
        var li = input.parent('li');
        li.find('span').text(input.val());
        li.removeClass('is-editing');
        save();
        console.log("test git");
    }
});
    
    
mainUl.sortable({connectWith: ".connected" }).disabeSelection;
deleteUl.sortable({connectWith: ".connected" }).disableSelection;    
doneUl.sortable({connectWith: ".connected" }).disableSelection;        
//拖曳


    
mainUl.on('sortstart',function(e,ui){
    $('#placeholder').addClass('is-dragging');
    
});

deleteUl.bind('sortreceive', function(e,ui){
    console.log('check1');
    ui.item.remove();
    save();
}); 

doneUl.bind('sortreceive', function(e,ui){
    console.log('check2');
    ui.item.remove();
    save();
    ui.item.addClass('is-done').appendTo(mainUl);
    
});    
    
     
mainUl.on('sortstop',function(e,ui){
    $('#placeholder').removeClass('is-dragging');
    save();
});

    
load();    
    
//end   
}());

