// マップ初期化
function prettyDate(dateString){
    const monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

    const date = new Date(dateString);
    const day = date.getDate();
    const mouth = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const hours = (date.getHours() < 10 ? '0' : '') + date.getHours();
    const minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
    const seconds = (date.getSeconds() < 10 ? '0' : '') + date.getSeconds();

    return day + ' ' + mouth + ' ' + year + ' ' + hours + ':' + minutes + ':' + seconds;
}
function initialize() {
    // 表示する場所のidを取得
    const target = document.getElementById("map");
    // 経度：lat，緯度：lngを設定
    const geoLocation = {lat: 43.043692, lng: 141.398372}; // sapporo, japan
    const options = {
        zoom: 12, // 0(smallest) or higher
        center: geoLocation //Mapの中央:上の座標
    };
    // Mapを作成
    const map = new google.maps.Map(target, options);

    /**
     * Mapをクリックした時の動作
     */
    map.addListener("click",function(e){
        // this.setCenter(e.latLng); // クリックする場所をMapの中心にする(画面の移動速度が速い)
        this.panTo(e.latLng); //クリックする場所をMapの中心にする(画面の移動速度がゆっくり)

        // // クリックする場所をマーカーを立てる
        // const click_marker = new google.maps.Marker(
        //     {
        //         position: e.latLng,
        //         map: map,
        //         title: e.latLng.toString(),
        //         animation: google.maps.Animation.DROP // マーカーを立つときのアニメーション
        //     }
        // );
        // // 上で立てたマーカーをもう一度クリックするとマーカーを削除
        // click_marker.addListener("click",function(){
        //     this.setMap(null);
        // });
    });

    // display lightnings as marker
    let element = document.getElementById('map_js');
    const lightnings = JSON.parse(element.dataset.lightnings);
    if(lightnings) {
        for (let i=0; i<lightnings.length; i++) {
            const coordinates = lightnings[i].geo.coordinates;
            console.log('lat', coordinates[0], 'lon', coordinates[1]);
            const latlng = new google.maps.LatLng(coordinates[0],  coordinates[1]);
            const distance = lightnings[i].distance ? +(lightnings[i].distance) : 0;
            const lightningArea = new google.maps.Circle({
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35,
                map: map,
                center: latlng,
                radius: distance,
                draggable:false
            });
            const marker = new google.maps.Marker({
                position: latlng,
                map: map,
                title: prettyDate(lightnings[i].loggedAt)
            });
        }
    }
}
