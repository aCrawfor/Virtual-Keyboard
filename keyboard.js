/*
*
* */

$(function(){
    var $write = $('#write');
    var browser = navigator.appName; // will need to get more efficient name

    //Initialization function
    var init = function(){
        setupEventListeners();
    };

    var setupEventListeners = function(){
        //Setup the active region for the touch events
        var containerElement = document.getElementById('container');        // Get Container Region
        var activeRegion = new ZingTouch.Region(containerElement);
        var keyboardRegion = document.getElementById('keyboard');         // Get Keyboard Region DOM element

        //attach event listener for pan (touch and drag event)
        activeRegion.bind(keyboardRegion, 'pan', function(e){
            writeToTextPad(e, 'pan');
        });

        //attach event listener for tap( similar to the click function)
        activeRegion.bind(keyboardRegion, 'tap', function(e){
            writeToTextPad(e, 'tap');
        });
    };

    function writeToTextPad(event, gestureName){
        console.log(event);
        var target = event.detail.events['0'].originalEvent.target;
        //var target= event.detail.events["0"].originalEvent.path["0"];
        var operationType = getOperationType(target);

        switch(operationType){
            case 1:
                addCharacterToTextPad(target);
                break;
            case 2:
                addSpaceToTextPad();
                break;
            case 3:
                deleteLastCharacterFromTextPad(target);
                break;
            default:
                break;
        }

    }

    function getOperationType(target){
        var operation = null;
        var className =target.className;

        if(className === 'letter'){
            operation = 1;
        }
        if(className === 'space'){
            operation = 2;
        }

        if(operation === 'delete'){
            operation = 3
        }
        return operation;
    }

    function addCharacterToTextPad(target){
        // Add the character
        var character = target.innerHTML;
        $write.html($write.html() + character);
    }

    function deleteLastCharacterFromTextPad(){
        // Delete
        var html = $write.html();
        $write.html(html.substr(0, html.length - 1));
    }

    init();
});
