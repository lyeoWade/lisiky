var nodes  = document.querySelectorAll('.world-index-list')[0].getElementsByTagName('li'),
    _nodes = [].slice.call(nodes, 0);

var getDirection = function (ev, obj) {
    var w = obj.offsetWidth,
        h = obj.offsetHeight,
        x = (ev.pageX - obj.offsetLeft - (w / 2) * (w > h ? (h / w) : 1)),
        y = (ev.pageY - obj.offsetTop - (h / 2) * (h > w ? (w / h) : 1)),
        d = Math.round( Math.atan2(y, x) / 1.57079633 + 5 ) % 4;
  
    return d; 
};

var addClass1 = function ( ev, obj) {
    var direction = getDirection( ev, obj );
    var This=obj.getElementsByTagName('span')[0];
    console.log(obj)
	This.style.opacity=0.6;
    switch ( direction ) {
        case 0 : This.style.bottom='-50px';This.style.left='0px';startMove(This,{bottom:0});   break;
        case 1 : This.style.bottom='0px';This.style.left='200px';startMove(This,{left:0});   break;
        case 2 : This.style.bottom='-50px';This.style.left='0px';startMove(This,{bottom: 0});   break;
        case 3 : This.style.bottom='0px';This.style.left='-200px';startMove(This,{left:0});  break;
    }
};

var addClass2 = function ( ev, obj, state ) {
    var direction = getDirection( ev, obj );
    var This=obj.getElementsByTagName('span')[0];
    This.style.bottom='0px';This.style.left='0px';
    switch ( direction ) {
        case 0 : startMove(This,{bottom:50,opacity:0});    break;
        case 1 : startMove(This,{left:200,opacity:0});    break;
        case 2 : startMove(This,{bottom: -50,opacity:0});    break;
        case 3 : startMove(This,{left:-200,opacity:0});   break;
    }

};

// bind events
_nodes.forEach(function (el) {
    el.addEventListener('mouseover', function (ev) {
        addClass1( ev, this );
    }, false);

    el.addEventListener('mouseout', function (ev) {
        addClass2( ev, this );
    }, false);
});