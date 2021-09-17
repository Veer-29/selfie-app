var SpeechRecognition=window.webkitSpeechRecognition;
var recognition=new SpeechRecognition();

function start(){
    document.getElementById("textbox").innerHTML="";
    recognition.start();
}

recognition.onresult=function(event){
    console.log(event);
    var content=event.results[0][0].transcript;
    document.getElementById("textbox").innerHTML=content;
    console.log(content)

    if(content=="take my selfie"){
        console.log("taking selfie");
        speak();
    }
}

function speak(){
    var synth=window.speechSynthesis;
    var speak_data="Taking your selfie in 5 seconds";
    var utter_this=new SpeechSynthesisUtterance(speak_data);
    synth.speak(utter_this);
    Webcam.attach(camera);

    setTimeout(function(){
        snapshot();
        save(); 
    },5000);
}

camera=document.getElementById("camera");
Webcam.set({
    width:360,
    height:250,
    image_format:'png',
    png_quality:90
});

function snapshot(){
    Webcam.snap(function(data_uri){
      document.getElementById("result").innerHTML='<img id="selfie_img" src="'+data_uri+'">'; 
    });   
}

function save(){
    var link=document.getElementById("link");
    var image=document.getElementById("selfie_img").src;
    link.herf=image;
    link.click();
}