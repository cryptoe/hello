var jsonData = [];
var regionData = [];
var subCategoryData = [];
var selectedRegionID = 0;
var selectedSubCategoryID = 0;

function regionClicked(val) {
    var ni = document.getElementById("regionBtn");
    ni.innerHTML = val;
    $("#regionWindow").popup("close");
}

function subCategoryClicked(val) {
    var ni = document.getElementById("subCategoryBtn");
    ni.innerHTML = val;
    $("#subCategoryWindow").popup("close");
}

$(document).ready(function() {



    $("#region").change(function() {

        alert("sssss");
        // $.mobile.loading( "show", {
        //      text: "",
        //      textVisible: false,
        //      theme: "z",
        //      html: ""
        //  });
        filterData($("#title-filter-menu").val(), $("#title-filter-menu1").val());
    });

    $("#title-filter-menu1").change(function() {
        // $.mobile.loading( "show", {
        //      text: "",
        //      textVisible: false,
        //      theme: "z",
        //      html: ""
        //  });
        filterData($("#title-filter-menu").val(), $("#title-filter-menu1").val());
    });

    //Contact Us
    $('#send-feedback').click(function() {
        var url = 'send.php';
        var error = 0;
        var $contactpage = $(this).closest('.ui-page');
        var $contactform = $(this).closest('.contact-form');
        $('.required', $contactform).each(function(i) {
            if ($(this).val() === '') {
                error++;
            }
        }); // each
        if (error > 0) {
            alert('Please fill in all the mandatory fields. Mandatory fields are marked with an asterisk *.');
        } else {
            //var firstname = $contactform.find('input[name="firstname"]').val();
            var firstname = $('#firstname').val()
                //var surname = $contactform.find('input[name="surname"]').val();
            var address = $('#address').val();
            var mobilephone = $('#mobilephone').val();
            //var email = $contactform.find('input[name="email"]').val();   
            var message = $('#message').val();

            var body = "First Name : " + firstname + "\n Address : " + address + "\n Contact No. : " + mobilephone + "\n Message : \n" + message;
            window.location.href = "mailto:amit.stiffy90@gmail.com?subject=The%20subject%20of%20the%20email";
            plugin.email.open({
                to: ['amit.stiffy90@gmail.com'],
                cc: [''],
                bcc: ['karankumar1100@gmail.com', 'tejaskale27@gmail.com'],
                subject: 'Wed-Up Contact Us',
                body: body
            });
            //submit the form
            /*  $.ajax({
            type: "GET",
            url: url,
            data: {firstname:firstname, surname:surname, state: state, mobilephone: mobilephone, email: email, message: message},
            success: function (data) {
                if (data == 'success') {
                    // show thank you 
                    $contactpage.find('.contact-thankyou').show();
                    $contactpage.find('.contact-form').hide();
                }  else {
                    alert('Unable to send your message. Please try again.');
                }
            }
        }); */

        }
        return false;
    });

    $("#seg").on("click", ">li", function() {
        var a = $('#seg a');
        a.each(function(i) {
            $(a[i]).removeClass('ui-state-persist');
            $(a[i]).removeClass('ui-btn-active');
        });
        $(this).children('a').addClass('ui-state-persist');
        $(this).children('a').addClass('ui-btn-active');
        showLoader();
        var catID = $(this).attr('value');
        $('#subCategory').empty();
        $('#subCategory').append($("<li id=0 class=\"iconLeft ui-first-child \">").append("<a href=\"javascript:subCategoryClicked('ALL')\" class=\"ui-nodisc-icon ui-icon-carat-l ui-btn ui-btn-icon-right\" data-rel=\"dialog\"><span style=\"float:right\">ALL</span></a>"));
        for (var i = 0; i < subCategoryData.length; i++) {
            if (subCategoryData[i]['typeid'] == catID) {
                var name = subCategoryData[i]['name'];
                var id = subCategoryData[i]['id'];
                $('#subCategory').append($("<li id=" + id + " class=\"iconLeft ui-first-child \">").append("<a href=\"javascript:subCategoryClicked('" + name + "')\" class=\"ui-nodisc-icon ui-icon-carat-l ui-btn ui-btn-icon-right\" data-rel=\"dialog\"><span style=\"float:right\">" + name + "</span></a>"));
            }

        }
        var ni = document.getElementById("regionBtn");
        ni.innerHTML = "Region";
        ni = document.getElementById("subCategoryBtn");
        ni.innerHTML = "Sub-Category";
        selectedRegionID = 0;
        selectedSubCategoryID = 0;
        divElement = "";

        for (var i = 0; i < subCategoryData.length; i++) {
            if (subCategoryData[i]['typeid'] == catID) {
                var subID = subCategoryData[i]['id'];
                for (var i = 0; i < jsonData.length; i++) {
                    var subId = jsonData[i]['subTypeID'];
                    if (subID == subId) {
                        var id = jsonData[i]['id'];
                        var name = jsonData[i]['name'];
                        var logo = jsonData[i]['logo'];
                        var phone = jsonData[i]['phone'];
                        var address = jsonData[i]['address'];
                        divElement = divElement + " <li id=" + id + " style=\"padding-left:15px;padding-right:15px;padding-bottom:5px;\" class=\"iconLeft\" data-icon=\"\"><a href='#about' onclick=\"setPhotographerID(" + id + ")\"class=\"ui-btn ui-btn-icon-right ui-nodisc-icon ui-icon-carat-l\"style=\"background: #222528;\"><div style=\"display: inline-block; float: right\"><img src=\'" + logo + "\' style=\"width:90px;height:90px\"/></div><div align=\"right\"style=\"display: inline-block; float: right; padding-right: 10px;font-weight: 100;color:#EAEAEA\">" + name + "</br>&nbsp;<h2 align=\"right\" style=\"color: #7F7F7F;font-size: small;\">" + address + "</h2><h2 align=\"right\" style=\"color:#C0C0C0;font-size: small;\">" + phone + "</h2></div></a></li>";

                    }
                }
            }
        }
        hideLoader();
        addElement('photographersList', divElement);
    });

    $("#region").on("click", ">li", function() {
        filterData($(this).attr('id'), selectedSubCategoryID);
        selectedRegionID = $(this).attr('id');
    });
    $("#subCategory").on("click", ">li", function() {
        filterData(selectedRegionID, $(this).attr('id'));
        selectedSubCategoryID = $(this).attr('id');
    });
    $("#video").on("click", function() {
        $("#video-gallery-1").removeClass("display-call");
        $("#photographer-info-slide").removeClass("display-call");
        $("#photographer-info-slide").addClass("display-call");
        $("#photogallery-div").removeClass("display-call");
        $("#photogallery-div").addClass("display-call");
    });
    $("#gallery").on("click", function() {
        $("#video-gallery-1").removeClass("display-call");
        $("#video-gallery-1").addClass("display-call");
        $("#photographer-info-slide").removeClass("display-call");
        $("#photographer-info-slide").addClass("display-call");
        $("#photogallery-div").removeClass("display-call");
    });

    $("#about1").on("click", function() {
        $("#video-gallery-1").removeClass("display-call");
        $("#video-gallery-1").addClass("display-call");
        $("#photographer-info-slide").removeClass("display-call");
        $("#photogallery-div").removeClass("display-call");
        $("#photogallery-div").addClass("display-call");
    });

    /**
     * Event handlers for forum code.
     */
    $('a[href="#forum"]').on('click', function() {
        var forumDiv = $('#forum_content');
        if (forumDiv.html().trim() === "") {
            forumLoad();
        }
    });




    $("#regionBtn").click(function() {
        $('.ui-listview  a').removeClass('ui-icon-carat-r');
    });

    $("#subCategoryBtn").click(function() {
        $('.ui-listview  a').removeClass('ui-icon-carat-r');
    });


});
var isForumLoading = false;
var forumUrl = "http://forum-hatunot.com/forum-custom/script/index.php?tab1=custom_timeline&id=wedAppForumTest";

function forumLoad() {
    showLoader();
    var forumDiv = $('#forum_content');
    isForumLoading = true;
    $('#forum_content').load(forumUrl, forumLoadSucces);
}

function forumLoadSucces() {

    isForumLoading = false;
    followButton = '<a class="follow-' + grpId + '" onclick="SK_registerFollow(' + grpId + ');"> <i data-icon="plus" class="icon-plus progress-icon"></i> Join</a>';
    if ($('.story-publisher-box').length == 0 && grpId !== '-1') {
        $('.header-content').append(followButton);
    }

    var refreshButton = '<a class="float-left" onclick="if(!isForumLoading)forumLoad();"> <i data-icon="refresh" class="icon-refresh"></i></a>';
    $('.header-content').append(refreshButton);
    $(".header-join-wrapper").on('click', function() {
        var url = $('.header-join-wrapper').attr('href');
        $('.header-join-wrapper').attr('href', "");
        var ref = window.open(url, '_blank', 'location=no');
        ref.addEventListener('loadstop', function(event) {
            var success = "http://forum-hatunot.com/forum-custom/Script//index.php?tab1=home#_=_";
            if (event.url === success) {
                ref.close();
                $('#forum_content').load(forumUrl, forumLoadSucces);
            }
        });
    });
    hideLoader();
}

function filterData(regionID, subCategID) {
    showLoader();
    var divElement = "";
    tempRegionjsonData = [];
    tempSubCategoryData = [];
    counter = 0;

    if (subCategID == 0) {
        for (var i = 0; i < subCategoryData.length; i++) {
            if (subCategoryData[i]['typeid'] == $('#seg li .ui-btn-active').attr('value')) {
                var subID = subCategoryData[i]['id'];
                for (var i = 0; i < jsonData.length; i++) {
                    var subId = jsonData[i]['subTypeID'];
                    if (subID == subId) {
                        if (regionID == 0) {
                            var id = jsonData[i]['id'];
                            var name = jsonData[i]['name'];
                            var logo = jsonData[i]['logo'];
                            var phone = jsonData[i]['phone'];
                            var address = jsonData[i]['address'];
                            divElement = divElement + " <li id=" + id + " style=\"padding-left:15px;padding-right:15px;padding-bottom:5px;\" class=\"iconLeft\" data-icon=\"\"><a href='#about' onclick=\"setPhotographerID(" + id + ")\"class=\"ui-btn ui-btn-icon-right ui-nodisc-icon ui-icon-carat-l\"style=\"background: #222528;\"><div style=\"display: inline-block; float: right\"><img src=\'" + logo + "\' style=\"width:90px;height:90px\"/></div><div align=\"right\"style=\"display: inline-block; float: right; padding-right: 10px;font-weight: 100;color:#EAEAEA\">" + name + "</br>&nbsp;<h2 align=\"right\" style=\"color: #7F7F7F;font-size: small;\">" + address + "</h2><h2 align=\"right\" style=\"color:#C0C0C0;font-size: small;\">" + phone + "</h2></div></a></li>";
                        } else {
                            var regID = jsonData[i]['regionID'];
                            if (regionID == regID) {
                                var id = jsonData[i]['id'];
                                var name = jsonData[i]['name'];
                                var logo = jsonData[i]['logo'];
                                var phone = jsonData[i]['phone'];
                                var address = jsonData[i]['address'];
                                divElement = divElement + " <li id=" + id + " style=\"padding-left:15px;padding-right:15px;padding-bottom:5px;\" class=\"iconLeft\" data-icon=\"\"><a href='#about' onclick=\"setPhotographerID(" + id + ")\"class=\"ui-btn ui-btn-icon-right ui-nodisc-icon ui-icon-carat-l\"style=\"background: #222528;\"><div style=\"display: inline-block; float: right\"><img src=\'" + logo + "\' style=\"width:90px;height:90px\"/></div><div align=\"right\"style=\"display: inline-block; float: right; padding-right: 10px;font-weight: 100;color:#EAEAEA\">" + name + "</br>&nbsp;<h2 align=\"right\" style=\"color: #7F7F7F;font-size: small;\">" + address + "</h2><h2 align=\"right\" style=\"color:#C0C0C0;font-size: small;\">" + phone + "</h2></div></a></li>";

                            }
                        }

                    }
                }
            }
        }
    } else {
        for (var i = 0; i < jsonData.length; i++) {
            var subId = jsonData[i]['subTypeID'];
            if (subCategID == subId) {
                if (regionID == 0) {
                    var id = jsonData[i]['id'];
                    var name = jsonData[i]['name'];
                    var logo = jsonData[i]['logo'];
                    var phone = jsonData[i]['phone'];
                    var address = jsonData[i]['address'];
                    divElement = divElement + " <li id=" + id + " style=\"padding-left:15px;padding-right:15px;padding-bottom:5px;\" class=\"iconLeft\" data-icon=\"\"><a href='#about' onclick=\"setPhotographerID(" + id + ")\"class=\"ui-btn ui-btn-icon-right ui-nodisc-icon ui-icon-carat-l\"style=\"background: #222528;\"><div style=\"display: inline-block; float: right\"><img src=\'" + logo + "\' style=\"width:90px;height:90px\"/></div><div align=\"right\"style=\"display: inline-block; float: right; padding-right: 10px;font-weight: 100;color:#EAEAEA\">" + name + "</br>&nbsp;<h2 align=\"right\" style=\"color: #7F7F7F;font-size: small;\">" + address + "</h2><h2 align=\"right\" style=\"color:#C0C0C0;font-size: small;\">" + phone + "</h2></div></a></li>";
                } else {
                    var regID = jsonData[i]['regionID'];
                    if (regionID == regID) {
                        var id = jsonData[i]['id'];
                        var name = jsonData[i]['name'];
                        var logo = jsonData[i]['logo'];
                        var phone = jsonData[i]['phone'];
                        var address = jsonData[i]['address'];
                        divElement = divElement + " <li id=" + id + " style=\"padding-left:15px;padding-right:15px;padding-bottom:5px;\" class=\"iconLeft\" data-icon=\"\"><a href='#about' onclick=\"setPhotographerID(" + id + ")\"class=\"ui-btn ui-btn-icon-right ui-nodisc-icon ui-icon-carat-l\"style=\"background: #222528;\"><div style=\"display: inline-block; float: right\"><img src=\'" + logo + "\' style=\"width:90px;height:90px\"/></div><div align=\"right\"style=\"display: inline-block; float: right; padding-right: 10px;font-weight: 100;color:#EAEAEA\">" + name + "</br>&nbsp;<h2 align=\"right\" style=\"color: #7F7F7F;font-size: small;\">" + address + "</h2><h2 align=\"right\" style=\"color:#C0C0C0;font-size: small;\">" + phone + "</h2></div></a></li>";

                    }
                }

            }
        }
    }

    hideLoader();
    addElement('photographersList', divElement);

}

function addElement(divId, divString) {
    var ni = document.getElementById(divId);
    ni.innerHTML = divString;
}

function setPhotographerID(id) {
    showLoader();
    $("#about").addClass("display-call");

    $.ajax({
        type: "GET",
        url: "http://wedup.net/mobileapp/clientDetAll.php?id=" + id,
        dataType: "script",
        async: false
    });

}

function clientDetails(dataJson, other, dataVideo, videoPath) {
        //console.log(dataJson);
        //console.log(other);
        //console.log(dataVideo);
        //console.log(videoPath);
        //console.log(dataJson['name']);
        $("#topName").text(dataJson['name']);
        $("#circle_name").text(dataJson['name']);
        $("#address_circle").text(dataJson['address']);
        $("#left2").text(dataJson['name']);
        $("#left1").text(dataJson['address']);
        $("#CALL_ME_NAV_BAR").attr("href", "tel:" + dataJson['phone']);
        $("#MESSAGE_NAV_BAR").attr("href", "#message");
        document.getElementById("vendorID").value = dataJson['id'];
        $("#logo_image").attr("src", dataJson['logo']);
        $("#phtotographer_info_text").text(dataJson['description']);
        $("#call_photographer_info").attr("href", "tel:" + dataJson['phone']);
        $("#backdrop").attr("style", "background: url(" + dataJson['coverImage'] + ") no-repeat;");
        $("#about").removeClass("display-call");
        /** for(var i in other)
         {
              alert(i);
              $("#photogallery-div").append(other[''] );
         }**/
        var videoHtml = ' <div class="ui-grid-a">';
        for (var i in dataVideo) {
            var block;
            if (i % 2 == 0)
                block = 'a';
            else
                block = 'b';
            var video_url = encodeURI(videoPath + "/" + dataVideo[i]['path']);
            var image_url = encodeURI(videoPath + "/" + dataVideo[i]['images'].split(',')[0]);
            // var div = '<div class="ui-block-' + block + '"><video poster="' + image_url + '" class="photographer-video-css" src=' + video_url + ' controls></video></div>';
            var div = '<div class="ui-block-' + block + '"><video src="' + video_url + '" controls class="photographer-video-css"  ><div id="slider1" class="photographer-video-css"> <img src="img/photograper.png" class="photographer-video-css"> <img src="img/photograper.png" class="photographer-video-css"> <img src="img/photograper.png" class="photographer-video-css"></div></video></div>';
            videoHtml = videoHtml + div;
        }
        videoHtml = videoHtml + '</div>';
        //console.log(videoHtml);


        $("#video-gallery-1").append(videoHtml);

        var gallery_number = 0;
        for (var prop in other) {
            gallery_number = gallery_number + 1;

            if (other.hasOwnProperty(prop)) {
                var generatedHtml;
                var albumName = prop.split('/')[prop.split('/').length - 1]
                    // console.log(albumName);
                var outerDiv = '<div data-role="collapsible"  data-content-theme="false"> <h4> <span class="collapsible-text">' + albumName + '<span></h4><div class="ui-grid-b my-gallery">';
                generatedHtml = outerDiv;



                // $("#photogallery-div").append(outerDiv); 
                // $("#photogallery-div").append();
                for (var i in other[prop]) {
                    var photoLink = prop + "/" + other[prop][i];
                    var innerDiv;
                    var block;
                    if ((i + 1) % 3 == 1)
                        block = 'a';
                    else if ((i + 1) % 3 == 2)
                        block = 'b';
                    else
                        block = 'c'

                    if (i > 20)
                        break;

                    innerDiv = ' <div class="ui-block-' + block + '"><a rel="gallery-' + gallery_number + '" href="' + encodeURI(photoLink) + '" class="swipebox" onclick="swipeIT()"  ><img src="' + encodeURI(photoLink) + '" class="gallery-images" /></a></div>';

                    generatedHtml = generatedHtml + innerDiv;
                }
                generatedHtml = generatedHtml + "</div></div>";
                $("#photogallery-div").append(generatedHtml);
                $("#photogallery-div").trigger("create");
            }
        };

        $("#slider1").excoloSlider({
            mouseNav: false,
            interval: 1000, // = 5 seconds
            prevnextAutoHide: true,
            prevnextNav: false,
            pagerNav: false,
            autoPlay: true,
            hoverPause: false,
            autoSize: true

        });
        $("#about1").triggerHandler("click");
        hideLoader();

        return true;

    }
    // execute above function


function setClientsDet(data, regionJson, subCategoryJson) {
    var divElement = "";
    for (var i = 0; i < subCategoryJson.length; i++) {
        if (subCategoryJson[i]['typeid'] == 2) {
            var subID = subCategoryJson[i]['id'];
            for (var i = 0; i < data.length; i++) {
                jsonData = data;
                var subId = data[i]['subTypeID'];
                if (subID == subId) {
                    var id = data[i]['id'];
                    var name = data[i]['name'];
                    var logo = data[i]['logo'];
                    var phone = data[i]['phone'];
                    var address = data[i]['address'];
                    divElement = divElement + " <li id=" + id + " style=\"padding-left:15px;padding-right:15px;padding-bottom:5px;\" class=\"iconLeft\" data-icon=\"\"><a href='#about' onclick=\"setPhotographerID(" + id + ")\"class=\"ui-btn ui-btn-icon-right ui-nodisc-icon ui-icon-carat-l\"style=\"background: #222528;\"><div style=\"display: inline-block; float: right\"><img src=\'" + logo + "\' style=\"width:90px;height:90px\"/></div><div align=\"right\"style=\"display: inline-block; float: right; padding-right: 10px;font-weight: 100;color:#EAEAEA\">" + name + "</br>&nbsp;<h2 align=\"right\" style=\"color: #7F7F7F;font-size: small;\">" + address + "</h2><h2 align=\"right\" style=\"color:#C0C0C0;font-size: small;\">" + phone + "</h2></div></a></li>";

                }
            }
        }
    }
    $('#region').append($("<li id=0 class=\"iconLeft\" >").append("<a href=\"javascript:regionClicked('ALL')\" class=\"ui-nodisc-icon ui-icon-carat-l \" data-rel=\"dialog\"><span style=\"float:right\">ALL</span></a>"));
    for (var i = 0; i < regionJson.length; i++) {
        regionData = regionJson;
        var name = regionJson[i]['name'];
        var id = regionJson[i]['id'];
        $('#region').append($("<li id=" + id + " class=\"iconLeft\">").append("<a href=\"javascript:regionClicked('" + name + "')\" class=\"ui-nodisc-icon ui-icon-carat-l \" data-rel=\"dialog\"><span style=\"float:right\">" + name + "</span></a>"));
    }
    $('#subCategory').append($("<li id=0 class=\"iconLeft\">").append("<a href=\"javascript:subCategoryClicked('ALL')\" class=\"ui-nodisc-icon ui-icon-carat-l \" data-rel=\"dialog\"><span style=\"float:right\">ALL</span></a>"));
    for (var i = 0; i < subCategoryJson.length; i++) {
        subCategoryData = subCategoryJson;
        var name = subCategoryJson[i]['name'];
        var catid = subCategoryJson[i]['typeid'];
        var id = subCategoryJson[i]['id'];
        if (catid == 2)
            $('#subCategory').append($("<li id=" + id + " class=\"iconLeft\">").append("<a href=\"javascript:subCategoryClicked('" + name + "')\" class=\"ui-nodisc-icon ui-icon-carat-l\" data-rel=\"dialog\"><span style=\"float:right\">" + name + "</span></a>"));
    }
    // console.log(divElement);
    addElement('photographersList', divElement);
    // outputs 'Foo'
}

function showLoader() {

    /*  $.mobile.loading( "show", {
            text: "Loading",
            textVisible: true,
            theme: "b",
            html: ""
         });*/
    // navigator.notification.activityStart("Please Wait", "Loading...");

}

function hideLoader() {
    //$.mobile.loading( "hide" );
    /** window.setTimeout(function() {
         navigator.notification.activityStop();
     }, 100);
     **/

}


function swipeIT() {
    $('.swipebox').swipebox();
}


//For Region and Price Select menu
(function($) {
    function pageIsSelectmenuDialog(page) {
        var isDialog = false,
            id = page && page.attr("id");
        $(".filterable-select").each(function() {
            if ($(this).attr("id") + "-dialog" === id) {
                isDialog = true;
                return false;
            }
        });
        return isDialog;
    }
    $.mobile.document
        // Upon creation of the select menu, we want to make use of the fact that the ID of the
        // listview it generates starts with the ID of the select menu itself, plus the suffix "-menu".
        // We retrieve the listview and insert a search input before it.
        .on("selectmenucreate", ".filterable-select", function(event) {
            var input,
                selectmenu = $(event.target),
                list = $("#" + selectmenu.attr("id") + "-menu"),
                form = list.jqmData("filter-form");
            // We store the generated form in a variable attached to the popup so we avoid creating a
            // second form/input field when the listview is destroyed/rebuilt during a refresh.
            if (!form) {
                input = $("<input data-type='search'></input>");
                form = $("<form></form>").append(input);
                input.textinput();
                list
                    .before(form)
                    .jqmData("filter-form", form);
                form.jqmData("listview", list);
            }
            // Instantiate a filterable widget on the newly created selectmenu widget and indicate that
            // the generated input form element is to be used for the filtering.
            selectmenu
                .filterable({
                    input: input,
                    children: "> option[value]"
                })
                // Rebuild the custom select menu's list items to reflect the results of the filtering
                // done on the select menu.
                .on("filterablefilter", function() {
                    selectmenu.selectmenu("refresh");
                });
        })
        // The custom select list may show up as either a popup or a dialog, depending on how much
        // vertical room there is on the screen. If it shows up as a dialog, then the form containing
        // the filter input field must be transferred to the dialog so that the user can continue to
        // use it for filtering list items.
        .on("pagecontainerbeforeshow", function(event, data) {
            var listview, form;
            // We only handle the appearance of a dialog generated by a filterable selectmenu
            if (!pageIsSelectmenuDialog(data.toPage)) {
                return;
            }
            listview = data.toPage.find("ul");
            form = listview.jqmData("filter-form");
            // Attach a reference to the listview as a data item to the dialog, because during the
            // pagecontainerhide handler below the selectmenu widget will already have returned the
            // listview to the popup, so we won't be able to find it inside the dialog with a selector.
            data.toPage.jqmData("listview", listview);
            // Place the form before the listview in the dialog.
            listview.before(form);
        })
        // After the dialog is closed, the form containing the filter input is returned to the popup.
        .on("pagecontainerhide", function(event, data) {
            var listview, form;
            // We only handle the disappearance of a dialog generated by a filterable selectmenu
            if (!pageIsSelectmenuDialog(data.toPage)) {
                return;
            }
            listview = data.prevPage.jqmData("listview"),
                form = listview.jqmData("filter-form");
            // Put the form back in the popup. It goes ahead of the listview.
            listview.before(form);
        });



})(jQuery);