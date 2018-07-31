// 程序入口
import Handler = Laya.Handler;
import Loader = Laya.Loader;
class LayaAir3D {
    private camera:Laya.Camera;
    constructor() {
        //初始化引擎
        Laya3D.init(1334,750, true);
        //激活资源版本控制
        // Laya.loader.load("res/atlas/comp.atlas", Handler.create(null, onLoaded));
        // function onLoaded(){
        //     Laya.stage.addChild( new view.viewPage())
        // }
        Laya.stage.on(laya.events.Event.MOUSE_DOWN,this,this.onmove)
        let taget = new Laya.Image("res/timg.jpg");
        taget.height = 750;
        taget.width = 1334;
        Laya.stage.addChild(taget)
        

        //适配模式
        Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;

        //开启统计信息
        Laya.Stat.show();

        //添加3D场景
        var scene: Laya.Scene = Laya.stage.addChild(new Laya.Scene()) as Laya.Scene;

        //添加照相机
        this.camera = (scene.addChild(new Laya.Camera(0, 0.1, 1000))) as Laya.Camera;
        this.camera.transform.translate(new Laya.Vector3(0, 0, 10),false);
        this.camera.transform.rotate(new Laya.Vector3(10, 0, 0), false, false);

        //添加方向光
        var directionLight: Laya.DirectionLight = scene.addChild(new Laya.DirectionLight()) as Laya.DirectionLight;
        directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
        
        directionLight.transform.translate(new Laya.Vector3(0,1,0),false)
        //directionLight.transform.rotate(new Laya.Vector3(90, 0, 0), false, true);

        //添加自定义模型
        //var box: Laya.MeshSprite3D = scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(10, 5, 2))) as Laya.MeshSprite3D;
        var box: Laya.MeshSprite3D = scene.addChild(new Laya.MeshSprite3D(new laya.d3.resource.models.SphereMesh(1.5,32,32))) as Laya.MeshSprite3D;
        var material: Laya.StandardMaterial = new Laya.StandardMaterial();
        material.diffuseTexture = Laya.Texture2D.load("res/test2.jpg");
        box.meshRender.material = material;
        box.transform.translate(new Laya.Vector3(0,1,0),false);
        box.transform.rotate(new Laya.Vector3(0,0,10),false,true);//角度制,逆时针

        var box1: Laya.MeshSprite3D = scene.addChild(new Laya.MeshSprite3D(new laya.d3.resource.models.SphereMesh(0.5,22,22))) as Laya.MeshSprite3D;
        var material1: Laya.StandardMaterial = new Laya.StandardMaterial();
        material1.diffuseTexture = Laya.Texture2D.load("res/test3.jpg");
        box1.meshRender.material = material1;
        box1.transform.translate(new Laya.Vector3(-3,1.5,0),false);
        box1.transform.rotate(new Laya.Vector3(0,0,10),false,true);//角度制,逆时针

        //每10毫秒旋转一次
        var vect:Laya.Vector3 = new Laya.Vector3(1,-1,0);
        console.log(box.transform.pivot,"中心")
        console.log(box1.transform.pivot,"中心1")
        box1.transform.pivot = new Laya.Vector3(3.5,0,0)
        var vect1:Laya.Vector3 = new Laya.Vector3(0.5,-0.5,0);
        Laya.timer.loop(10,null,function(){
             box.transform.rotate(vect,false,false);
             box1.transform.rotate(vect1,false,false);
        });
        directionLight.direction = box.transform.position;
        directionLight.transform.rotate(new Laya.Vector3(30, 0, 0), false, true);
    }
    private onmove(e:Laya.Event){
        
        //每10毫秒旋转一次
        //this.camera.transform.rotate(vect,false,true);
    }
}
new LayaAir3D();
