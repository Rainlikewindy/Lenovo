/*脚本集结号*/
var clock,m=0;
var dot=document.getElementById("banled").getElementsByTagName("li");
var img=document.getElementById("slide").getElementsByTagName("li");
var arr=document.getElementById("banleft").getElementsByTagName("span");
/*1.动态获得类名*/
var giveclass=function (){
    for(var i=0;i<img.length;i++){
    	if(i==m){
    		img[i].className="selected";
    	}
    	else{img[i].className="";}
    }
}
/*2.幻灯片实现*/
var move=function(){
	if(m<img.length){
		img[m].style.display="list-item";
		dot[m].style.backgroundColor="#FF0000";
		if((m-1)>=0){
			img[m-1].style.display="";
			dot[m-1].style.backgroundColor="";
	    	}
	    else {
	    	img[img.length-1].style.display="";
	    	dot[dot.length-1].style.backgroundColor="";
	    	}
	    giveclass();
	    m++;
	    }
	else{
		m=0;
		move();
	}
}
var moveround=function (){
	    clock=setInterval(function (){
		move();
		},1500);
	}	
move();	
moveround();
/*3.箭头的隐现--鼠标的悬停*/

/*3.1hiddenorremove通过箭头控制箭头的隐现和图片的静止*/
var hiddenoremove=function (){
	for(var i=0;i<arr.length;i++){
		var nav_row=arr[i];
		nav_row.onmouseover=function(){
			stop();   //调用静止函数
			show();   //调用箭头显示函数
		}
		nav_row.onmouseout=function(){
			remove(); //调用开始移动函数
			hidden(); //调用箭头隐藏函数
		}
	}
}
var show=function (){
     arr[0].style.opacity="0.8";
     arr[1].style.opacity="0.8";
}
var hidden=function (){
	arr[0].style.opacity="";
    arr[1].style.opacity="";
} 

/*3.2showorsrop通过图片控制箭头的隐现和图片的静止移动*/
var showorstop=function (){
	for(var i=0;i<img.length;i++){
		imgs=img[i];
        imgs.onmouseover=function(){
            stop();
            show();
        }
        imgs.onmouseout=function(){
        	 remove();
        	 hidden();
        	}
        }
    }

/*3.3通过跳点控制箭头的隐现--鼠标的悬停*/
var dotshow=function(){
	for(var i=0;i<dot.length;i++){
	   dotshow=dot[i];	
	   dotshow.onmouseout=function(){
		  remove();
		  hidden();
	    }
	   dotshow.onmouseover=function(){
		  stop();
		  show();
	    }
    }
}
var stop=function (){
	clearInterval(clock);
}
var remove=function (){
	 moveround();
}
hiddenoremove();
showorstop();
dotshow();
/*4.点击点跳转图片*/
var clickjump=function(r){
	clearInterval(clock);
	for(var i=0;i<dot.length;i++){
		img[i].style.display="";
		dot[i].style.backgroundColor="";
	}
	m=r;
	move();
}
/*5.点击箭头移动*/
var foreorafter=function (){
	var fore_arr=arr[0];
	var after_arr=arr[1];
	fore_arr.onclick=function(){
		premove();
	}
    after_arr.onclick=function(){
    	aftermove();
    }
}
var premove=function (){
	clearInterval(clock);
    var i;
    for(i=0;i<img.length;i++){
    	if(img[i].className.indexOf('selected')!=-1)
    		break;
    }
    i=i-1;
    if(i<0)
    {
    	img[img.length-1].style.display="list-item";
    	dot[dot.length-1].style.backgroundColor="#FF0000";
    	m=img.length-1;
	   	giveclass();
	   	img[0].style.display="";
	   	dot[0].style.backgroundColor="";
	   	m=0;
	   }
	else{
		img[i].style.display="list-item";
		dot[i].style.backgroundColor="#FF0000";
		m=i;
		giveclass();
		i=i+1;
        img[i].style.display="";
        dot[i].style.backgroundColor="";
        m++;
	}	  
}
var aftermove=function(){
    clearInterval(clock);
    var i;
    for(i=0;i<img.length;i++){
    	if(img[i].className.indexOf('selected')!=-1)
    		break; 
    }
    m=i+1;
    if(m>img.length-1)
    m=0;
    move();
}
foreorafter();