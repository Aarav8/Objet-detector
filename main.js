object=[];
check="";
function setup()
{
    canvas=createCanvas(640,420);
    canvas.center();

    objectDetector=ml5.objectDetector('cocossd',modelLoaded);

    document.getElementById("button").innerHTML="Status-Detecting Object";
}
function preload()
{
    img=loadImage("dog_cat.jpg");
}
function draw()
{
    image(img,0,0,640,420);
    if(check="true")
    {
        color=["red","black","blue","green"];
        j=0;
        document.getElementById("button").innerHTML="Detected Object";
        for(i=0;i<object.length;i++)
        {
                fill(color[j]);
                j++;
                persentage=Math.floor(object[i].confidence*100);
                text(object[i].label+" "+persentage+"%",object[i].x,object[i].y);
                noFill();
                stroke(color[j]);
                j++;
                rect(object[i].x,object[i].y,object[i].width,object[i].height);
            if(j==4)
            {
                j=0;
            }
        }
    }

}
function modelLoaded()
{
    console.log("Model Loaded!");
    objectDetector.detect(img,gotResults);
}
function gotResults(error,results) 
{
    if (error) 
    {
        console.error(error);
    }
    else
    {
    image(img,0,0,640,420);

        console.log(results);
        object=results;
        check="true";
    }
}
