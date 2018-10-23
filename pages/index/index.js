//index.js

Page({
    data: {
        text1: "",
        infoList: [{ text: "list_text"}]
    },
    onLoad: function () {

        wx.navigateTo({
            url: '../../pages/index/build',
        })
        return;

        this.htmlParse();

        return;

        var list = [];
        for (var i = 0; i < 2; i++) {
            list.push({ text: "list_text" + i })
        }

        var oThis = this;
        this.setData({
            text1: "text1",
            infoList: list
        }, function () {
            console.log("setData在界面渲染完毕后，这段会被调用");
        });

        console.log(1, oThis.data.infoList);
    },

    htmlParse: function(){

        var str = "<html style='font-color:#2f2f2f;margin-top:20px;'>e<a href='http://www.baidu.com'>p1</a> <br/>bc <h1>zyh</h1>  </html>";

        var check_state_unknow = 0;
        var check_state_htmltag_begin = 1;
        var check_state_htmltag_end = 2;
        var check_state_innercontent = 3;

        var check_state_html_property_begin = 4;
        var check_state_html_property_end = 5;
        var check_state_html_property_style_innercontent = 6;
        var check_state_html_property_href_innercontent = 7;
        var check_state_html_property_unknow_innercontent = 8;


        var check_state_html_property_style_innercontent_tag_begin = 9;
        var check_state_html_property_style_innercontent_tag_innercontent = 10;

        var check_state_html_property_href_innercontent_tab_begin = 11;
        var check_state_html_property_href_innercontent_tab_innercontent = 12;




        var index = 0;
        var length = str.length;

        var stateStack = [];

        var resultStack = [];

        var htmlTag;

        var content;

        var isInCheckHtmlTagBegin;

        var isInCheckHtmlTagEnd;

        var isInCheckContent;


        str = str.replace('\n',' ');

        str = str.replace('<br/>', '\n');

        str = str.replace('<br>', '\n');


        function isLetter(character) {
            var v = character.charCodeAt();
            return (v >= 48 && v <= 57) || (v >= 65 && v <= 90) || (v >= 97 && v <= 122);
        }


        for (var index = 0; index < length; index++) {

            var checkStateObj = stateStack[stateStack.length - 1];
            var char = str[index];
            var nextChar = index + 1 <str.length? str[index + 1]:"";

            var checkState = checkStateObj ? checkStateObj.check_state : check_state_unknow;

            if (checkState == check_state_htmltag_begin) {

                if (isLetter(char)) {
                    checkStateObj.content += char;
                }else if(char == ">"){

                    stateStack.push({
                        check_state: check_state_innercontent,
                        content: ""
                    });

                }else if(char == ' '){
                    stateStack.push({
                        check_state: check_state_html_property_begin,
                        content: ""
                    });
                }

            } else if (checkState == check_state_html_property_begin){

                if (isLetter(char)) {
                    checkStateObj.content += char;
                }else if(char == '='){

                } else if (char == '\'' || char == '"') {

                    stateStack.push({
                        check_state: checkStateObj.content.toLowerCase() == 'style' ? check_state_html_property_style_innercontent_tag_begin : (checkStateObj.content.toLowerCase() == 'href' ? check_state_html_property_href_innercontent_tab_begin : check_state_html_property_unknow_innercontent),
                        content: ""
                    });

                }else if(char == ">"){
                    stateStack.pop();//pop self

                    stateStack.push({
                        check_state: check_state_innercontent,
                        content: ""
                    });
                }


            } else if (checkState == check_state_html_property_style_innercontent_tag_begin ){

                if (isLetter(char) || char == '-') {
                    checkStateObj.content += char;
                } else if (char == ':') {
                    stateStack.push({
                        check_state: check_state_html_property_style_innercontent_tag_innercontent,
                        content: ""
                    });

                }else if(char == '"' || char == '\'' ){

                    stateStack.pop();//pop self

                    stateStack.push({
                        check_state: check_state_html_property_begin,
                        content: ""
                    });
                }

            } else if (checkState == check_state_html_property_style_innercontent_tag_innercontent){

                if (isLetter(char) || char=='-' || char == "#") {
                    checkStateObj.content += char;
                } else if (char == ';') {


                    resultStack.push(stateStack.pop());//pop self 
                    resultStack.push(stateStack.pop());//pop check_state_html_property_style_innercontent_tag_begin

                    stateStack.push({
                        check_state: check_state_html_property_style_innercontent_tag_begin,
                        content: ""
                    });

                }
            
            } else if (checkState == check_state_html_property_href_innercontent_tab_begin ){

                if (isLetter(char) || char == ':' || char == '-' || char == '%' || char == '_' || char=="\/" || char == '.') {
                    checkStateObj.content += char;
                }else if( char == '"' || char == '\'' ){

                    resultStack.push(stateStack.pop());

                    stateStack.pop();
                }


            }else if (checkState == check_state_innercontent) {

                if(char != "<" && char != ">"){
                    checkStateObj.content += char;
                } else if (char == "<" && nextChar == '\/'){

                    var o = stateStack.pop();//pop innercontent

                    resultStack.push(o);

                    stateStack.push({
                        check_state: check_state_htmltag_end,
                        content: ""
                    });
                }else if(char == "<"){

                    resultStack.push(stateStack.pop());

                    stateStack.push({
                        check_state: check_state_htmltag_begin,
                        content: ""
                    });

                }

            } else if (checkState == check_state_htmltag_end) {

                if (isLetter(char)) {
                    checkStateObj.content += char;
                } else if (char == ">") {

                    stateStack.pop();//pop self
                    stateStack.pop();//pop htmltag_begin

                    stateStack.push({
                        check_state: check_state_innercontent,
                        content: ""
                    });
                }



            } else if (char == '<') {

                stateStack.push({
                    check_state: check_state_htmltag_begin,
                    content:""
                });

            }


        }


        console.log(resultStack)

        console.log(stateStack)

    },

    alert: function(e){
        console.log(e)
        wx.showModal({
            title: 'alert',
            content: 'alert',
        })
    },
    onPageScroll: function(e){
        console.log(e);
    }
})
