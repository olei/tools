<?php
defined('IN_ADMIN') or exit('No permission resources.');$addbg=1;
include $this->admin_tpl('header','admin');?>
<script type="text/javascript">
<!--
	var charset = '<?php echo CHARSET;?>';
	var searchKey = '';
	var uploadurl = '<?php echo pc_base::load_config('system','upload_url')?>';
	var uploadkey = '<?=upload_key("1,jpg|jpeg|gif|png|bmp,1,,,0");?>';
//-->
</script>
<script language="javascript" type="text/javascript" src="/statics/js/content_addtop.js"></script>
<script language="javascript" type="text/javascript" src="http://himg2.huanqiu.com/statics/js/colorpicker.js"></script>
<script language="javascript" type="text/javascript" src="http://himg2.huanqiu.com/statics/js/hotkeys.js"></script>
<script language="javascript" type="text/javascript" src="http://himg2.huanqiu.com/statics/js/cookie.js"></script>
<script type="text/javascript" src="http://himg2.huanqiu.com/statics/js/HQcommon.js"></script>
<script type="text/javascript" src="http://himg2.huanqiu.com/statics/js/ui.core.js"></script>
<script type="text/javascript" src="http://himg2.huanqiu.com/statics/js/ui.draggable.js"></script>
<script type="text/javascript" src="http://himg2.huanqiu.com/statics/js/ui.sortable.js"></script>
<script type="text/javascript">var catid=<?php echo $catid;?></script>
<form name="myform" id="myform" action="?m=content&c=content&a=add" method="post" enctype="multipart/form-data">
<div class="addContent">
<div class="crumbs"><?php echo L('add_content_position');?></div>
<div class="col-right">
    	<div class="col-1">
        	<div class="content pad-6">
<?php
if(is_array($forminfos['senior'])) {
	
 foreach($forminfos['senior'] as $field=>$info) {
	if($info['isomnipotent']) continue;
	if($info['formtype']=='omnipotent') {
		foreach($forminfos['base'] as $_fm=>$_fm_value) {
			if($_fm_value['isomnipotent']) {
				$info['form'] = str_replace('{'.$_fm.'}',$_fm_value['form'],$info['form']);
			}
		}
		foreach($forminfos['senior'] as $_fm=>$_fm_value) {
			if($_fm_value['isomnipotent']) {
				$info['form'] = str_replace('{'.$_fm.'}',$_fm_value['form'],$info['form']);
			}
		}
	}
	if(trim($info['name'])!='编译原创'){
 ?>
	<h6><?php if($info['star']){ ?> <font color="red">*</font><?php } ?> <?php echo $info['name']?></h6>
	 <?php echo $info['form']?><?php echo $info['tips']?> 
<?php
} }
?>
<?php if($_SESSION['roleid']==1 || $priv_status) {?>
<h6><?php echo L('c_status');?></h6>
<span class="ib" style="width:190px">
	<label class="ib" style="width:40px">
		<input type="radio" name="status" value="99" checked onClick="javascript:hide();" /><?php echo L('c_publish'); ?>
	</label>
	<label class="ib" style="width:40px">
		<input type="radio" name="status" value="50" onClick="javascript:hide();" /><?php echo L('c_store'); ?>
	</label>
	<label class="ib" style="width:70px">
		<input type="radio" name="status" value="10" onClick="javascript:show();" /><?php echo L('c_publish_timing'); ?>
	</label>
	<link href="/statics/js/calendar/jscal2.css" type="text/css" rel="stylesheet" />
	<link href="/statics/js/calendar/border-radius.css" type="text/css" rel="stylesheet" />
	<link href="/statics/js/calendar/win2k.css" type="text/css" rel="stylesheet" />
	<script src="/statics/js/calendar/calendar.js" type="text/javascript" ></script>
	<script src="/statics/js/calendar/lang/en.js" type="text/javascript" ></script>
	<input id="publish_timing" class="date input-text" type="text" readonly size="21" value="<?php echo date("Y-m-d H:i:s"); ?>" name="info[publish_timing]" style="display: none;" />
	<script type="text/javascript" >
	function show(){
		$("#publish_timing").show();
	}
	function hide(){
		$("#publish_timing").hide();
	}
	/*
	Calendar.setup({
		weekNumbers: true,
		inputField: "publish_timing",
		trigger: "publish_timing",
		dateFormat:"%Y-%m-%d %H:%M:%S",
		showTime: true,
		minuteStep: 1,
		onSelect: function(){this.hide();}
	});*/
	var todayCalendar = new Date();
	var myYears = (todayCalendar.getYear() < 1900) ? (1900+todayCalendar.getYear()) : todayCalendar.getYear();
	myYears = myYears.toString()+((todayCalendar.getMonth() + 1) < 10 ? "0" + (todayCalendar.getMonth() + 1) : (todayCalendar.getMonth() + 1)) + (todayCalendar.getDate() < 10 ? "0" + todayCalendar.getDate() : todayCalendar.getDate());
				
	Calendar.setup({
		weekNumbers: true,
		inputField : "publish_timing",
		trigger    : "publish_timing",
		dateFormat: "%Y-%m-%d %H:%M:%S",
		showTime: true,
		min:parseInt(myYears),
		minuteStep: 1,
		onSelect   : function() {this.hide();}
	});
	</script>
</span>
<?php if($workflowid) { ?><label><input type="radio" name="status" value="1" > <?php echo L('c_check');?> </label><?php }?>
<?php }?>
          </div>
        </div>
    </div>
    <a title="展开与关闭" class="r-close" hidefocus="hidefocus" style="outline-style: none; outline-width: medium;" id="RopenClose" href="javascript:;"><span class="hidden">展开</span></a>
    <div class="col-auto">
    	<div class="col-1">
        	<div class="content pad-6">
<table width="100%" cellspacing="0" class="table_form">
	<tbody>	
<?php
if(is_array($forminfos['base'])) {
	foreach($forminfos['base'] as $field=>$info) {
		if($info['isomnipotent']) continue;
		if($info['formtype']=='omnipotent') {
			foreach($forminfos['base'] as $_fm=>$_fm_value) {
				if($_fm_value['isomnipotent']) {
					$info['form'] = str_replace('{'.$_fm.'}',$_fm_value['form'],$info['form']);
				}
			}
			foreach($forminfos['senior'] as $_fm=>$_fm_value) {
				if($_fm_value['isomnipotent']) {
					$info['form'] = str_replace('{'.$_fm.'}',$_fm_value['form'],$info['form']);
				}
			}
		}
		if(trim($info['name'])=='权重'){
?>
	<tr>
		<th width="80"><font color="red">*</font> 权重</th>
		<td><input type="text" name="info[weight]" id="weight" size="13" value="50" class="input-text">数字范围:0 - 100 <div id="weightTip" style="display: none; "></div></td>
	</tr>
<?php
		continue;
		} 
			if(trim($info['name'])=='海纳抓取区别'){
?>
	<tr>
		<th width="80">排序</th>
		<td><input type="text" name="info[listorder]" id="haina" size="13" value="0" class="input-text"> </td>
	</tr>
	<tr>
		<td><input type="hidden" name="info[haina]" id="haina" size="13" value="0" class="input-text" readonly="readonly"> </td>
	</tr>
<?php
		continue;
		} 
                if( trim($info['name'])=='关键词' ){
?>
<style type="text/css">
/*图片*/
/*.key_tip b{ background: url(/statics/images/admin_img/cmsKeyWords.png);}*/
tbody th.keyWord_Tit{ vertical-align:top!important; line-height:24px; color:#777!important;}
table tbody td.keyWord_form { padding:0px;}
.keyWord_form tbody td,.keyWord_form tbody th{border:none; padding-left:0px; padding-bottom:0px;}
.keyWord_form ul,.keyWord_form li{ padding:0; margin:0; list-style:none;}
.keyWord_form li{ display:inline; float:left; white-space:nowrap; margin:0 5px 5px 0px; border:1px solid #b3d9f0; line-height:21px; padding-right:20px; position:relative;}
.keyWord_form li.tag,.keyWord_form li.closeTag,.keyWord_form li.addTag{  border:1px solid #b3d9f0;}

.keyWord_form li{ font-size:14px; color:#0078b5; padding-left:7px; cursor:default; outline:none; zoom:1; float:left;}
.keyWord_form li{ font-size:14px; color:#0078b5;cursor:move;}

.keyWord_form li a:hover { text-decoration:none;}
.keyWord_form li a.state{ position:absolute; width:12px; height:12px; _height:14px; display:block; right:4px;top:4px; line-height:12px; _line-height:14px; text-align:center; padding-left:0px; text-indent:0px;cursor:pointer;}
.keyWord_form li a.state:hover { background:#9fd0f8; text-decoration:none; color:#fff; }



.keyWord_form li.closeTag{border:1px solid #cccdcf;}
.keyWord_form li.closeTag a.state{ display:none;padding-left:0px; text-indent:0px;}
.keyWord_form li.closeTag{color:#c1c1c1;}
.keyWord_form li.closeTag a.state:hover{  }


.keyWord_form li.addTag{border:1px solid #b3d9f0;}
.key_tip{ border:1px solid #a0a0a0;border-radius:5px; width:150px; height:44px; line-height:44px; overflow:hidden;display:none;}
.key_tip b{ display:block; width:16px; height:16px; float:left; margin:15px 5px 0 9px;}
.addTagText{color:#ccc;}
</style>        
      <script>
	  $(function(){
              HQ.Widget.focusInputTxt('.addTagText');
              
              
			$('#title').one('focusout',function(){
				var ulHTML = liHTML = '';
				//$('#keywordCon').html('');
				//获取网络地址
                                var title = $('#title').val();
                                $.post('/api.php?op=get_keywords&data='+encodeURI(title)+'&number=5',function(data){
                                    //本地测试文字
                                    //var getKeyWord = '国美 苏宁 京东 当当 易迅';    
                                    $('.tagList').html('');
                                    var getKeyWord = data;
                                    //alert(data);
                                    if(getKeyWord){
                                        getKeyWord = getKeyWord.split(" ");
                                        for(var i = 0; i < getKeyWord.length;i++){
                                            liHTML += '<li class="tag" data-keyword="'+getKeyWord[i]+'" data-keynum="0"><span>'+getKeyWord[i]+'</span><a class="state" title="删除热词">&times;</a></li>';
                                        }                      
                                        $('.tagList').append(liHTML);
                                        $(".tagList").sortable({
                                          stop:function(event){
                                              getKeyWords();
                                            }
                                        });                                        
                                    }
                                    getKeyWords();
                                });
			});
			$('ul.tagList li').live('click',function(){
                            if($(this).attr('data-keynum') == '0'){
                                    $(this).attr('data-keynum','-1');
                                    $(this).removeClass('tag').addClass('closeTag');
                                    if($(this).attr('class') == 'closeTag'){
                                            $(this).click(function(){
                                                    var txtArray = [];
                                                    $('ul.tagList li.addTag').each(function(){
                                                            txtArray.push($(this).find('span').text());
                                                    });
                                                    var stra = $(this).find('span').text();
                                                    for (var j= 0; j < txtArray.length; j++ ) {
                                                            var strb=txtArray[j];
                                                            if(stra==strb){
                                                                    alert('不能添加重复标签');
                                                                    return false;
                                                            }
                                                    }
                                            });
                                    }
                            }else if($(this).attr('data-keynum') == '-1'){
                                    var keyLength = $('ul.tagList li.tag').length;
                                    if(keyLength >=10){alert('最多只有10个标签');return false;}else{
                                            $(this).attr('data-keynum','0');
                                            $(this).removeClass('closeTag').addClass('tag');
                                    }
                            }
                            getKeyWords();

                    });
			/*$('#btn').bind('click',function(){
				var keyLength = $('ul.tagList li.tag').length;
				var closeKeyLength = $('ul.tagList li.closeTag').length;
				if(keyLength >5){$('.key_tip').css('display','block');return false;}
				var keynum = keyword = closekeynum = closekeyword ='';
				for(var i=0;i<keyLength;i++){
					keyword += $('ul.tagList li.tag').eq(i).attr('data-keyword')+ '|' + $('ul.tagList li.tag').eq(i).attr('data-keynum') + ',';
					keyword = keyword.split(",");
				}
				for(var i=0;i<closeKeyLength;i++){
					closekeyword += $('ul.tagList li.closeTag').eq(i).attr('data-keyword') + '|' + $('ul.tagList li.closeTag').eq(i).attr('data-keynum') +',';
					closekeyword = closekeyword.split(",");
				}
				$('#output').val('保留及新增的关键词：'+keyword+'\r\n删除的关键词：'+closekeyword);
			});
*/
$('#add').bind('click',function(){
		var keyLength = $('ul.tagList li.tag').length;
		if(keyLength >=10){alert('最多只有10个标签');return false;}
		var txtArray = [];
		if($('.addTagText').val() == "多个关键词之间请用空格或','分开"){
			alert('请填写关键词');return false;
		}else if($('.addTagText').val() != ''){
			var addTagText = $.trim($('.addTagText').val()).replace(/^,|,$/g,'');
			$('.addTagText').val('');
			addTagText = $.trim(addTagText).replace(/^，|，/g," ");
			addTagText = addTagText.replace(/\s*/,"");
			addTagText = addTagText.replace(/\s*$/,"");
			addTagText = addTagText.replace(/\s+/g," ");
			addTagText = addTagText.replace(/ /g,",");
			addTagText = addTagText.split(",");
			$.unique(addTagText);
			addTagText.reverse();
			var txtArray = [];
			$('ul.tagList li.tag').each(function(){
				txtArray.push($(this).find('span').text());
			});
			if(addTagText.length > 10 - keyLength){alert('最多只有10个标签');return false;}
			var liTemp = '';
			for(var i=0;i<addTagText.length;i++){
				var stra=addTagText[i];
				var _exist=$.inArray(stra,txtArray);
				if(_exist >=0){
					//去重
				}else{
					if(stra.length == '0'){continue;}
					liTemp += '<li class="tag addTag" data-keyword="'+stra+'" data-keynum="1"><span>'+stra+'</span><a class="state" title="删除热词">×</a></li>';
				}
			}
		}else{
			alert('请填写关键词');return false;
		}
		$('ul.tagList').prepend(liTemp);
    getKeyWords();
	});
			$('.addTag').live('click',function(){
				$(this).remove();
getKeyWords();
			});
        function getKeyWords(){
            var keyLength = $('ul.tagList li.tag').length;
            var closeKeyLength = $('ul.tagList li.closeTag').length;
            if(keyLength >10){alert('最多只有10个标签');return false;}
            var keynum = keyword = closekeynum = closekeyword ='';
            for(var i=0;i<keyLength;i++){
                    keyword += $('ul.tagList li.tag').eq(i).attr('data-keyword')+ '|' + $('ul.tagList li.tag').eq(i).attr('data-keynum') + ',';
                    keyword = keyword.split(",");
            }
            for(var i=0;i<closeKeyLength;i++){
                    closekeyword += $('ul.tagList li.closeTag').eq(i).attr('data-keyword') + '|' + $('ul.tagList li.closeTag').eq(i).attr('data-keynum') +',';
                    closekeyword = closekeyword.split(",");
            }
            $('#hidewords').val(keyword+closekeyword);
            //$('#output').val('保留及新增的关键词：'+keyword+'\r\n删除的关键词：'+closekeyword);            
        }                        
		});
	  </script>
                     <tr>
                         <th class="keyWord_Tit" width="80" valign="top" align="right"> 关键词 </th>
                      <td colspan="2">
                          <table>
                            <tbody>
                                    <td class="keyWord_form">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td id="keywordCon">
                                                    <ul class="tagList"></ul>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td width="480">
                                                    <input type='hidden' name='hidewords' id='hidewords' value='' >
                                                    <input type="text" name="info[keywords]" id="keywords" value="多个关键词之间请用空格或','分开" style="width:280px" class="input-text addTagText">
                                                    <input type="button" class="button" value="添加关键词" id="add" style="width:73px;">                                        
                                                 </td>
                                                </tr>
                                        </tbody>
                                    </table>
                                </td>
                                <td width="155">
                                    <div class="key_tip">
                                        <b></b>10个标签
                                    </div>
                                </td>

                            </tbody>
                          </table>         
                         </td>
                     </tr>        
<?php
                    continue;
                }if(trim($info['name'])=='推荐位'){
?>
	<tr>
		<th width="80">频道推荐位</th>
		<td><?php echo $info['form']?></td>
	</tr>
	<tr>
		<th width="80">合作推荐位</th>
		<td><?php echo $info['form1']?></td>
	</tr>
<?php
		continue;
		} 
 ?>
	<tr>
      <th width="80"><?php if($info['star']){ ?> <font color="red">*</font><?php } ?> <?php echo $info['name']?>
	  </th>
      <td><?php echo $info['form']; if(trim($info['name'])=='来源'){echo $forminfos['senior']['bytj']['form'];}?>   <?php echo $info['tips']?></td>
    </tr>
<?php
	}
	}
}
?>

    </tbody></table>
                </div>
        	</div>
        </div>
        
    </div>
</div>

<div class="fixed-bottom">
	<input name="s" type="hidden" value="" />
	<div class="fixed-but text-c">
    <div class="button"><input value="<?php echo L('save_close');?>" id="sc" type="submit" name="dosubmit" class="cu" style="width:145px;" onclick="refersh_window()"></div>
    <div class="button"><input value="<?php echo L('save_continue');?>" id="sr" type="submit" name="dosubmit_continue" class="cu" style="width:130px;" title="Alt+X" onclick="refersh_window()"></div>
    <div class="button"><input value="<?php echo L('c_close');?>" type="button" name="close" onclick="refersh_window();close_window();" class="cu" style="width:70px;"></div>
    <div class="button"><input value="<?php echo L('c_preview'); ?>" type="button" name="preview" onclick="javascript:preview_content();" class="cu" title="" ></div>
    <script type="text/javascript">
	//预览提交 2012年2月3日 zdm
	function preview_content(){
		var pre = $("#myform").attr("action");
		$("#myform").attr("action", "?m=content&c=content&a=public_preview_c");
		//$("#myform").attr("action", "?m=content&c=content&a=add");
		
		$("#myform").attr("target", "_blank");
		$("#myform").submit();
		$("#myform").attr("action", pre);
		$("#myform").removeAttr("target");
	}
	</script>
      </div>
</div>
<iframe id="upload_form_target" name="upload_form_target" src="" style="display: none;"></iframe>
</form>

</body>
</html>
<script type="text/javascript"> 
//jiangxin add 20130402
function InitLimit(txt,limit,isbyte,cb){ 
	txt.keyup(function(){
		var str=txt.val();
		var charLen; 
		var byteLen=0; 
		if(isbyte){
			for(var i=0;i<str.length;i++){ 
				if(str.charCodeAt(i)>255){ 
					byteLen+=2; 
				}else{ 
					byteLen++; 
				} 
			} 
		charLen = Math.floor((limit*2-byteLen)/2); 
		}else{ 
			byteLen=str.length; 
			charLen=limit*2-byteLen; 
		} 
		cb(charLen); 
	}); 
} 
InitLimit($("#description"),40,true,function(c){ 
	if(c>=0){ 
		$("#description_len").text("您已输入"+(40-c)+"个，还可以输入"+c+"个"); 
	}else{ 
		$("#description_len").text("您已输入"+(40-c)+"个，"+"已经超过"+(-c)+"个汉字");
		return false;
	}
});
InitLimit($("#title"),40,true,function(c){ 
	if(c>=0){ 
		$("#title_len_a").text((40-c)+"个，还可以输入"+c); 
	}else{ 
		$("#title_len_a").text((40-c)+"个，"+"已经超过"+(-c)+"个汉字");
		return false;
	}
});
InitLimit($("#shorttitle"),1008,true,function(c){ 
	if(c>=0){ 
		$("#shorttitle_len_a").text("您已输入"+(1008-c)+"个汉字"); 
	}
});
//jiangxin add 20130402
<!--
$("#keywords").focusout(function(){
	searchKey = $("#keywords").val();
})
//只能放到最下面
var config_submit = true;
var openClose = $("#RopenClose"), rh = $(".addContent .col-auto").height(),colRight = $(".addContent .col-right"),valClose = getcookie('openClose');
$(function(){
	if(valClose==1){
		colRight.hide();
		openClose.addClass("r-open");
		openClose.removeClass("r-close");
	}else{
		colRight.show();
	}
	openClose.height(rh);
	$.formValidator.initConfig({formid:"myform",autotip:true,onsuccess:function() {config_submit=true;},onerror:function(msg,obj){config_submit=false;window.top.art.dialog({id:'check_content_id',content:msg,lock:true,width:'200',height:'50'}, 	function(){$(obj).focus();
	boxid = $(obj).attr('id');
	if($('#'+boxid).attr('boxid')!=undefined) {
		check_content(boxid);
	}
	})}});
	//<?php //echo $formValidator;?>
	
	//jiangxin add 20130402

	$("#title").formValidator({onshow:"",onfocus:"请输入标题"}).inputValidator({min:1,max:120,onerror:"标题不能为空"});
	
	$("#shorttitle").formValidator({onshow:"",onfocus:"请输入短标题"}).inputValidator({min:1,onerror:"短标题不能为空"}).inputValidator({max:26,onerror:"短标题不能多于13个汉字"});
	
	$("#keywords").formValidator({onshow:"",onfocus:"关键词不能多于60个字符"});
	
	$("#copyfrom").formValidator({onshow:"",onfocus:"请输入来源"}).inputValidator({min:1,max:100,onerror:"请输入来源"});
	
	$("#weight").formValidator({onshow:"",onfocus:"权重填写不正确"}).inputValidator({min:1,onerror:"权重填写不正确"});<?php if($modelid==1){ ?>
	if(catid=='1278' || catid=='1269' || catid=='1270' || catid=='1271' || catid=='1272' || catid=='1273' || catid=='1274' || catid=='1275' || catid=='1276')
	{
		$("#description").formValidator(<?php if($modelid==1){ ?>{onshow:"",onfocus:"请输入摘要"}<?php } ?>).inputValidator(<?php if($modelid==1){ ?>{min:1,onerror:"摘要不能为空"}<?php } ?>);
	}else{
		$("#description").formValidator(<?php if($modelid==1){ ?>{onshow:"",onfocus:"请输入摘要"}<?php } ?>).inputValidator(<?php if($modelid==1){ ?>{min:1,onerror:"摘要不能为空"}<?php } ?>).inputValidator(<?php if($modelid==1){ ?>{max:80,onerror:"摘要不能多于40个汉字"}<?php } ?>);
	}
	<?php } ?>

		$("#bytj_1").click(function(){
		var ischecked = $(this).attr('checked');
		if(ischecked == true){
			$("#copyfrom").attr("value","环球网");
		}else{
			$("#copyfrom").attr("value","");
		}
	})

	$('#islink').bind('click',function(){
		if($(this).attr('checked') == true){
			$("#description").formValidator({onshow:"",onfocus:"请输入摘要"}).inputValidator({min:0,onerror:"摘要不能为空"})<?php if($modelid==1){ ?>.inputValidator({max:80,onerror:"摘要不能多于40个汉字"})<?php } ?>;
			$("#shorttitle").formValidator({onshow:"",onfocus:"请输入短标题"}).inputValidator({min:0,onerror:"短标题不能为空"}).inputValidator({max:26,onerror:"短标题不能多于13个汉字"});
		}else{
			$("#description").formValidator({onshow:"",onfocus:"请输入摘要"})<?php if($modelid==1){ ?>.inputValidator({min:1,onerror:"摘要不能为空"})<?php } ?><?php if($modelid==3){ ?>.inputValidator({min:0,onerror:"摘要不能为空"})<?php } ?>.inputValidator({max:80,onerror:"摘要不能多于40个汉字"});
			$("#shorttitle").formValidator({onshow:"",onfocus:"请输入短标题"}).inputValidator({min:1,onerror:"短标题不能为空"}).inputValidator({max:26,onerror:"短标题不能多于13个汉字"});
		}
	});
	
	$("#content").formValidator(<?php if($modelid==1){ ?>{onshow:"",onfocus:"内容不能为空"}<?php } ?>).functionValidator({
	    fun:function(val,elem){
			var oEditor = CKEDITOR.instances.content;
			var data = oEditor.getData();
		
			//jiangxin add 20130402
			<?php if($modelid==1){ ?>
			if(data != ''){
				var imgRegex = /<img.*?(?:>|\/>)/gi;
				if(imgRegex.test(data)){//判断内容是否有图片
					var thumbSrc = $('#thumb_preview').attr('src');
					thumbSrc = thumbSrc.substring(thumbSrc.length-14,thumbSrc.length);
					if(thumbSrc == 'upload-pic.png'){//缩略图是否为默认地址
						if(!$('#t_pic_1').attr('checked')){//判断是否勾选自动生成缩略图
							var result = confirm("是否为文章自动生成缩略图？");
							if(result){
								$('#t_pic_1').attr('checked','checked');
							}else{
								return;
							}
						}
					}
				}
			}
			<?php } ?>
			//jiangxin add 20130402
	        if($('#islink').attr('checked')){
        				var strUrlRegex = '^[A-Za-z]+://[A-Za-z0-9-_]+\.[A-Za-z0-9-_%&\?\/.=]+$';
        				var re=new RegExp(strUrlRegex);
        				var linkUrl = $('#linkurl').val();
        				linkUrl = $.trim(linkUrl);
        				if((re.test(linkUrl) || /^\d+$/.test(linkUrl)) && $.trim('#linkurl') != ''){
        					return true;
        				}else{
        					$('#linkurl').focus();
        					$('#linkurl').val('');
        					return '转向链接为空或者URL格式非法，请输入正确的转向链接！';
        				}
			    //return true;
		    } <?php if($modelid==1){ ?> else if(($('#islink').attr('checked')==false) && (data=='')){
			    return "内容不能为空";
		    } else if (data=='' || $.trim(data)=='') {
				return "内容不能为空";
			}<?php } ?>
			return true;
		}
	});	
/*
 * 加载禁用外边链接
 */

	$('#linkurl').attr('disabled',true);
	$('#islink').attr('checked',false);
	$('.edit_content').hide();
	jQuery(document).bind('keydown', 'Alt+x', function (){close_window();});
})
document.title='<?php echo L('add_content');?>';
self.moveTo(-4, -4);
function refersh_window() {
	setcookie('refersh_time', 1);
}
openClose.click(
	  function (){
		if(colRight.css("display")=="none"){
			setcookie('openClose',0,1);
			openClose.addClass("r-close");
			openClose.removeClass("r-open");
			colRight.show();
		}else{
			openClose.addClass("r-open");
			openClose.removeClass("r-close");
			colRight.hide();
			setcookie('openClose',1,1);
		}
	}
)

/*
 * 来源管理
 */
$("#copyfrom_data").change(function(){
	if($(this).val()==0){
		$("#copyfrom").val("");
	}else{	
		$("#copyfrom").val($(this).find("option:selected").text());
	}
})
/*
 * 作者管理
 */
$("#author_data").change(function(){
	if($(this).val()==0){
		$("#author").val("");
	}else{	
		$("#author").val($(this).find("option:selected").text());
	}
})
//-->
</script>
<script type="text/javascript">
(function(window){
	var LS, noop = function(){}, document = window.document, notSupport = {set:noop,get:noop,remove:noop,clear:noop,each:noop,obj:noop,length:0};
	
	(function(){
		if( "localStorage" in window ){
			try{
				LS = window.localStorage;
				return;
			}catch(e){}
		}
		
		var o = document.getElementsByTagName("head")[0], hostKey = window.location.hostname || "localStorage", d = new Date(), doc, agent;
		
		if(!o.addBehavior){
			try{
				LS = window.localStorage;
			}catch(e){
				LS = null;
			}
			return;
		}
		
		try{
			agent = new ActiveXObject('htmlfile');
			agent.open();
			agent.write('<s' + 'cript>document.w=window;</s' + 'cript><iframe src="/favicon.ico"></iframe>');
			agent.close();
			doc = agent.w.frames[0].document;
			o = doc.createElement('head');
			doc.appendChild(o);
		}catch(e){
			o = document.getElementsByTagName("head")[0];
		}
		
		try{
			d.setDate(d.getDate() + 36500);
			o.addBehavior("#default#userData");
			o.expires = d.toUTCString();
			o.load(hostKey);
			o.save(hostKey);
		}catch(e){
			return;
		}
		var root, attrs;
		try{
			root = o.XMLDocument.documentElement;
			attrs = root.attributes;
		}catch(e){
			return;
		}
		var prefix = "p__hack_", spfix = "m-_-c",
			reg1 = new RegExp("^"+prefix),
			reg2 = new RegExp(spfix,"g"),
			encode = function(key){ return encodeURIComponent(prefix + key).replace(/%/g, spfix); },
			decode = function(key){ return decodeURIComponent(key.replace(reg2, "%")).replace(reg1,""); };
		LS= {
			length: attrs.length,
			isVirtualObject: true,
			getItem: function(key){
				return (attrs.getNamedItem( encode(key) ) || {nodeValue: null}).nodeValue||root.getAttribute(encode(key)); 
			},
			setItem: function(key, value){
				try{
					root.setAttribute( encode(key), value);
					o.save(hostKey);
					this.length = attrs.length;
				}catch(e){
				}
			},
			removeItem: function(key){
				try{
					root.removeAttribute( encode(key) );
					o.save(hostKey);
					this.length = attrs.length;
				}catch(e){
				}
			},
			clear: function(){
				while(attrs.length){
					this.removeItem( attrs[0].nodeName );
				}
				this.length = 0;
			},
			key: function(i){
				return attrs[i] ? decode(attrs[i].nodeName) : undefined;
			}
		};
		if( !("localStorage" in window) )
			window.localStorage = LS;
	})();
	
	window.LS = !LS ? notSupport : {
		set    : function(key, value){
			if( this.get(key) !== undefined )
				this.remove(key);
			LS.setItem(key, value);
			this.length = LS.length;
		},
		get    : function(key){
			var v = LS.getItem(key);
			return v === null ? undefined : v;
		},
		remove : function(key){ LS.removeItem(key);this.length = LS.length; },
		clear  : function(){ LS.clear();this.length = 0; },
		each   : function(callback){
			var list = this.obj(), fn = callback || function(){}, key;
			for(key in list) if( fn.call(this, key, this.get(key)) === false ) break;
		},
		obj    : function(){
			var list={}, i=0, n, key;
			if( LS.isVirtualObject ){
				list = LS.key(-1);
			}else{
				n = LS.length;
				for(; i<n; i++){
					key = LS.key(i);
					list[key] = this.get(key);
				}
			}
			return list;
		},
		length : LS.length
	};
	if( window.jQuery ) window.jQuery.LS = window.LS;
})(window); 
	
function getUrlAtt() {
	var qs      = window.location.search.length?window.location.search.substring(1):'',
		args    = {},
		items   = qs.length ? qs.split('&'):[],
		item    = null,
		arr     = [];
	for (var i=0,o=items.length;i<o;i++) {
		item    = items[i].split('=');
		name    = item[0];
		value   = item[1];
		if(name.length) args[name] = value;
	}
	return args;
}

function formateTime(timespan) {
	var newDate = timespan?new Date(timespan * 1e3):new Date(),
		y = newDate.getFullYear(),
		m = _doubleNum(newDate.getMonth() + 1),
		d = _doubleNum(newDate.getDate()),
		h = _doubleNum(newDate.getHours()),
		min = _doubleNum(newDate.getMinutes());
	return y + "-" + m + "-" + d + " " + h + ":" + min;
	function _doubleNum(num) {
		if (num < 10) {
			return "0" + num;
		}
		return num;
	}
}

(function() {


	var fie     = /(applewebkit|firefox|safari)/ig.test(navigator.userAgent),
		running = false;
		
	if(!fie) return;	

	document.getElementById("sc").type = "button";
	document.getElementById("sr").type = "button";
	
	$("input[name='dosubmit_continue']").click(function() {
		$("input[name='s']").val("dosubmit_continue");
		_s(true);
		//setTimeout(function() {_s(true);},3000);
	});
	$("input[name='dosubmit']").click(function() {
		$("input[name='s']").val("dosubmit");
		_s(false);
		//setTimeout(function() {_s(false);},3000);
	});
	
	function _s(t) {
		
		

	
		$('#myform').attr('target','upload_form_target').submit();
		
		
		
		
		
		
		if(!config_submit||running) return; 
		running = true;
		var $m    = $(document.createElement("div")),
			$w    = $(document.createElement("div")),
			timer = 3;
		$m
		.css({
			"width":"100%",
			"height":$(document.body).innerHeight(),
			"background":"#000",
			"position":"fixed",
			"top":0,
			"left":0,
			"filter":"alpha(opacity=50)",
			"-moz-opacity":0.5,
			"opacity":0.5,
			"z-index":10
		}).appendTo($(document.body));
		$w
		.css({
			width:300,
			height:80,
			background:"#4074ad",
			color:"#fff",
			"position":"fixed",
			"border-radius":"5px",
			top:100,
			"text-align":"center",
			"line-height":"80px",
			"font-size":"16px",
			"z-index":11,
			left:$(document.body).innerWidth()/2-150
		}).appendTo($(document.body)).html("正在上传...");
		
		var it = setInterval(function() {
			timer = timer>=3?0:timer+1;
			var s = "";
			for(var i=0;i<timer;i++) s+=".";
			$w.html("正在上传"+s);
		},500);
		
		
        $('#upload_form_target').load(function (){
           	var obj          = $("#upload_form_target").contents().find("body"),
				responseText = obj.html();
			
			clearInterval(it);
           	if(responseText){
                if(responseText!='false') {
					_del(n);
					key&&_del(key);
					timer = 3;
					$w.html("上传成功！ "+timer+"秒后自动关闭！");
					it = setInterval(function() {
						timer--;
						if(!timer) {
							clearInterval(it);
							t?window.location.reload(true):window.close();
						}
						$w.html("上传成功！ "+timer+"秒后自动关闭！");
					},1000);
					
					
					
				}else {
					clearInterval(it);
					$m.remove();
					$w.remove();
					alert("保存失败！");
				}
           		
           	}else {
				clearInterval(it);
				$m.remove();
				$w.remove();
				alert("保存超时！");
			}
			running = false;
			return;
        });
	}
	
	var u      = getUrlAtt(),
		cid    = u.catid,
		ls     = window.LS.get("ls"+cid) || "",
		title  = document.getElementById('title'),
		des    = document.getElementById('description'),
		n,obj,key;
	
	if(ls) {
		var item = ls.split("|"),
			root = false;
		for(var i=0;i<item.length;i++) {
			var s = "h"+i;
			if(ls.indexOf(s)==-1) {
				n    = "h"+i;
				root = true;
				break;
			}
		}
		if(!root) n = "h"+new Date().getTime();
		ls += "|"+n;
	}else {
		n  = "h0";
		ls = n;
	}

	window.LS.set("ls"+cid,ls);
	
	
	
	
	
	

	
	function _del(num) {
		var reg = new RegExp("\\|?"+num);
		ls = ls.replace(reg,"");
		window.LS.set("ls"+cid,ls);
		if(window.LS.get("e"+num+"_"+cid)) window.LS.remove("e"+num+"_"+cid);
		if(window.LS.get("t"+num+"_"+cid)) window.LS.remove("t"+num+"_"+cid);
		if(window.LS.get("d"+num+"_"+cid)) window.LS.remove("d"+num+"_"+cid);
		if(window.LS.get("time"+num+"_"+cid)) window.LS.remove("time"+num+"_"+cid);
	}
	
	function _write() {
		text = obj.document.body.innerHTML;
		window.LS.set("e"+n+"_"+cid, text);
		window.LS.set("t"+n+"_"+cid, title.value);
		window.LS.set("d"+n+"_"+cid, des.value);
		window.LS.set("time"+n+"_"+cid, formateTime());
	}
	
	setTimeout(function() {
		
		$("#cke_4").length&&$("#cke_4").bind("click",_run);
		function _run() {
			var c = document.getElementById('cke_contents_content');
			if(c&&c.getElementsByTagName("iframe")) {
				obj = c.getElementsByTagName("iframe")[0].contentWindow;
				obj.onkeyup   = _write;
				title.onchange  = _write;
				des.onchange    = _write;
			}
		}
		_run();
	},1000);
	
	
	var btn = document.createElement("input");
	btn.setAttribute("type","button");
	btn.value = "恢复";
	btn.style.cssText="position:fixed;top:10px;right:10px;";
	document.body.appendChild(btn);
	btn.onclick = function() {
		var a    = [],
			item = ls?ls.split("|"):0;

		
		for(var i=0;i<item.length;i++) {
			if(window.LS.get("t"+item[i]+"_"+cid)) {
				a.push("<li><dl><dt><input key='"+item[i]+"' type='checkbox'/></dt><dd key='"+item[i]+"' style='cursor:pointer;'>"+window.LS.get("t"+item[i]+"_"+cid)+"</dd><dt style='width:120px;'>"+(window.LS.get("time"+item[i]+"_"+cid)?window.LS.get("time"+item[i]+"_"+cid):"--")+"</dt></dl></li>");
			}
		}
		if(!a.length) {
			alert("没有可恢复内容！");
			return;
		}
		
		var box = document.createElement("div"),
			w   = document.body.clientWidth/2-250;
		box.style.cssText = "width:500px;height:300px;position:relative;border:1px solid #565656;background:#fff;position:fixed;top:150px;left:"+w+"px";
		document.body.appendChild(box);
		box.innerHTML = "<p style='line-height:35px;color:#637651;text-indent:10px;background:#c3d2b5;font-size:14px;'>文件列表<span id='closeB' style='float:right;padding-right:8px;cursor:pointer;'>X</span></p><ul style='padding:8px;line-height:21px;overflow:auto;height:220px;border-bottom:1px solid #999;' class='savelist' id='savelist'>"+a.join("")+"</ul><div style='position:absolute;left:5px;bottom:5px;'><input id='saveAll' type='checkbox' />&nbsp;全选&nbsp;&nbsp;&nbsp;&nbsp;<input type='button' value='删除' id='dellist' /></div>";
		var li = box.getElementsByTagName("dd");
		for(var i=0,le=li.length;i<le;i++) {
			li[i].onclick = function(index) {
				return function() {
					key = this.getAttribute("key");
					document.body.removeChild(box);
					if(!obj) return;
					if(window.LS.get("e"+key+"_"+cid)) obj.document.body.innerHTML = window.LS.get("e"+key+"_"+cid);
					if(window.LS.get("t"+key+"_"+cid)) title.value = window.LS.get("t"+key+"_"+cid);
					if(window.LS.get("d"+key+"_"+cid)) des.value   = window.LS.get("d"+key+"_"+cid);
					
					_write();
					n!=key&&_del(key);
				};
			}(i);
		}
		
		
		document.getElementById("saveAll").onclick = function() {
			var inp = box.getElementsByTagName("input");
			for(var i=0;i<inp.length;i++) inp[i].checked = this.checked?true:false;
		};
		
		document.getElementById("dellist").onclick = function() {
			var inp = box.getElementsByTagName("input"),
				o   = [];
			for(var i=0;i<inp.length;i++) {
				if(inp[i].getAttribute("key")&&inp[i].checked) {
					var key = inp[i].getAttribute("key"),
						p   = inp[i].parentNode;
					while(p.nodeName.toLowerCase()!="li") {
						p = p.parentNode;
					}
					o.push([p,key]);
				}
			}
			
			
			if(o.length) {
				if(confirm("是否将选中的"+o.length+"篇草稿删除?")) {
					for(var i=0;i<o.length;i++) {
						document.getElementById("savelist").removeChild(o[i][0]);
						_del(o[i][1]);
					}
				}
			}else {
				alert("没有选中要删除的草稿。");
			}
			
		};
		document.getElementById("closeB").onclick = function() {
			document.body.removeChild(box);
		};
	};
	
	var cssCode = (function() {
		var cssCodes = '';
		cssCodes += '.savelist dt,.savelist dd {float:left;}';
		cssCodes += '.savelist dd {width:350px;overflow:hidden;text-indent:8px;}';
		cssCodes += '.savelist dt {text-align:center;}';
		cssCodes += '.savelist dt input {margin-top:4px;}';
		return cssCodes;
	})();
	
	var sEle    = document.createElement("style"),
		$sEle   = $(sEle);
	$sEle.attr("type","text/css"); 
	$("head").eq(0).append($sEle);
	if(sEle.styleSheet) sEle.styleSheet.cssText += cssCode; 
	else if(document.getBoxObjectFor) sEle.innerHTML += cssCode; //火狐
	else sEle.appendChild(document.createTextNode(cssCode));

	
	
	
	
})();



</script>