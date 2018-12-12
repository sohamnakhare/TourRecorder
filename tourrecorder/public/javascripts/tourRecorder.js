(function () {
    
    var addEmptyIFrame = function() {
        var iframe = document.createElement('iframe');
        iframe.style.display = "none";
        iframe.id = "dap-tour-recorder-iframe";
        document.body.appendChild(iframe);
    }

    var injectVueScript = function() {
        var myScript = document.createElement("script");
        myScript.src = "https://cdn.jsdelivr.net/npm/vue";
        myScript.onload = function() {
            renderTourRecorderTemplate();
        };
        document.head.appendChild(myScript);
    };

    var injectPopper = function() {
        var myScript = document.createElement("script");
        myScript.src = "https://unpkg.com/popper.js/dist/umd/popper.min.js";
        document.head.appendChild(myScript);
    }

    var injectXPathFinder = function() {
        var myScript = document.createElement("script");
        myScript.src = "http://localhost:3000/javascripts/elementXPath.js";
        document.head.appendChild(myScript);
    }

    var tourRecorderForm = function() {
        return `
        <div style="background:white;height:100%">
            <div style="width:100%;height:40px;padding:8px;
                background:#1591f7;text-align:center">
                <h2 style="color:white">Tour Recorder</h3>                    
            </div>
            <div style="margin-top:15px;padding:8px;">
                <button style="width:100%;height:40px"
                    v-on:click="createNewTour">
                Create new tour</button>
            </div>
            <div v-if="showTourGeneratorForm" style="margin-top:15px;padding:8px;">
                <div>
                    <input type="text" style="width:100%;height:40px;padding:8px"
                        placeholder="enter tour name"/>
                </div>
                <div style="margin-top:15px;text-align:center;">
                    <button style="height:40px;border:none;
                        background:green;color:white"
                        v-on:click="startRecording">
                        Start Recording</button>
                </div>
            </div>
        </div>
        `;
    }

    var tourRecordingPanel = function() {
        return `
            <div style="background:white;height:100%">
                <div style="width:100%;height:40px;padding:8px;
                    background:#1591f7;text-align:center">
                    <h2 style="color:white">Recording</h3>                    
                </div>
                <div style="width:50%;box-sizing:border-box;float:left;padding:8px">
                    <button style="width:100%;height:40px;border:none;
                        background:red;color:white"
                        v-on:click="abortRecording">Abort</button>
                </div>
                <div style="width:50%;box-sizing:border-box;float:left;padding:8px">
                    <button style="width:100%;height:40px;border:none;
                        background:green;color:white">Done</button>
                </div>
            </div>
        `;
    }

    var stepInformationBubble = function() {
        return `
            <div id="tour-step-info-bubble"
                style="background-color:#1591f7;width:250px; height:200px;padding:8px;
                    box-shadow: -2px 4px 8px grey;z-index:999">
                <div>
                    <input type="text"
                        placeholder="enter title" 
                        style="background:white;width:100%;height:40px;padding:8px"/>
                </div>
                <div style="margin-top:15px">
                    <textarea placeholder="enter description"
                        style="background:white;width:100%;height:80px;padding:8px"></textarea>
                </div>
                <div style="margin-top:10px">
                    <div style="float:left;width:50%;padding:5px">
                        <button style="width:100%;height:30px">Cancel</button>
                    </div>
                    <div style="float:left;width:50%;padding:5px">
                        <button style="width:100%;height:30px">Next</button>
                    </div>
                </div>
            </div>
        `
    }

    var renderTourRecorderTemplate = function() {
        var markUp = `
            <div id="tour-recorder-container">
                <div v-if="!tourRecording"
                    style="height:500px;width:300px;top:0;right:0;position:fixed;
                    box-shadow: -2px 4px 8px grey;z-index:999">
                    ${tourRecorderForm()}
                </div>
                <div v-if="tourRecording"
                    style="width:300px;height:100px;top:0;right:0;position:fixed;
                        box-shadow: -2px 4px 8px grey;z-index:999">
                        ${tourRecordingPanel()}
                </div>
                ${stepInformationBubble()}
            </div>
        `;
        var tourRecorderElement = document.createElement("div");
        tourRecorderElement.innerHTML = markUp;
        document.body.appendChild(tourRecorderElement);
        var app = new Vue({
            el: '#tour-recorder-container',
            data: {
                showTourGeneratorForm: false,
                tourRecording: false,
                tourDetails: []
            },
            methods: {
                createNewTour: function() {
                    this.showTourGeneratorForm = true;
                },
                handleElementSelect: function(ev) {
                    ev.preventDefault();
                    ev.stopPropagation();
                    var reference = ev.target;
                    var popper = document.querySelector('#tour-step-info-bubble');
                    var popperInstance = new Popper(reference, popper, {
                        placement: 'bottom',
                        modifiers: {
                            arrow: {
                                enabled: true
                            },
                            flip: {
                                behavior: ['right','left', 'top']
                            }
                        }
                    });
                    console.log('x path: ', this.getElementXPath(ev.target));
                },
                handleElementHover: function(ev){
                    var element = ev.target;
                    element.style.border = "2px solid #1591f7";
                },
                handleElementMouseOut: function(ev){
                    var element = ev.target;
                    element.style.border = "none";
                },
                startRecording: function(ev) {
                    this.tourRecording = true;
                    ev.stopPropagation();
                    document.addEventListener('click', this.handleElementSelect);
                    document.addEventListener('mouseover', this.handleElementHover);
                    document.addEventListener('mouseout', this.handleElementMouseOut);
                },
                abortRecording: function(ev) {
                    ev.stopPropagation();
                    this.tourRecording = false;
                    this.showTourGeneratorForm = false;
                    document.removeEventListener('click', this.handleElementSelect);
                    document.removeEventListener('mouseover', this.handleElementHover);
                    document.removeEventListener('mouseout', this.handleElementMouseOut);
                },
                getElementXPath: function(element) {
                    return getElementXpath(element);
                }
            }
          });
    }

    injectXPathFinder();
    addEmptyIFrame();
    injectVueScript();
    injectPopper();
})();
