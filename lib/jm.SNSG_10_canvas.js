/*
*/
(function ($) {
$.fn.extend({

	//◆初期定数

	// ▼アニメーションスタート
	startAnimation : function ( nDis ) {
		var fq = this;
		var nFrame = 1;
		var nA = fq.defAnim;
		var dd = fq.def;
		var fID = dd.fID;
		var rh = dd.hID;
		var hD = dd.entHD;
		var aF = nA.animeFrame
		var Xscale = aF['scale'];
		var iID = dd.infoID;

		nowForward( nDis-200+50 );
		playFrame();

		//アニメーション
		function playFrame () {
			if( nFrame <= aF['late'] ) {
				nFrame++;
				aF['all'] += Xscale;
				//canvasの画像をクリア
				nA.Ctx[fID].clearRect(0,0, nA.canWid, nA.canHei);
				//canvasにスタートラインなどを描画
				if( aF['all'] > aF['move']/Xscale ) {
					nA.bgX -= Xscale;
					nA.uDX -= Xscale;
				}
				fq.drawScene( nA.bgX, Xscale );
				//canvasに馬を描画
				for(var i=1;i<=8;i++) {
					var hNum = rh+i;
					hD[hNum]['rrD'][10] += hD[hNum]['rrD'][9];
					fq.drawFill( hD[hNum]['rrD'][10]+nA.uDX, 30+(i-1)*23, dd.waku[i-1] );
					var rTD = [
						['reTD', iID, hD[hNum]['rrD'][5][0], hNum, 'STM'],
						['reTD', iID, hD[hNum]['rrD'][0], hNum, 'MAXSPD'],
						['reTD', iID, hD[hNum]['rrD'][1], hNum, 'SPD'],
						['reTD', iID, hD[hNum]['rrD'][2], hNum, 'ACC'],
						['reTD', iID, hD[hNum]['rrD'][3], hNum, 'KONJO'],
						['reTD', iID, hD[hNum]['rrD'][7], hNum, 'aTIME'],
					];
					fq.setInfoGroup( rTD );
				}
				//タイマー再帰処理
				setTimeout( playFrame, 10 );
			} else {
				if( aF['all'] <= nDis ) {
					nFrame = 1;
					nowForward( aF['all']-1+50 );
					setTimeout( playFrame, 10 );
				} else {
					if( nDis != dd.rcEntry[2] ) {
						$('div#opeBtn').show();
					}
				}
			}
		}
		//50mごとの移動値の算出
		function nowForward( nDis ) {
			for( var i=1;i<=8;i++ ) {
				fq.calGoDistance( rh+i, nDis );
			}
		}

	},//end startAnimation

	//◆馬□の表示
	drawFill : function ( nX, nY, nC ) {
		var nA = this.defAnim;
		var ctxt = nA.Ctx[ this.def.fID ];
		ctxt.fillStyle='rgb('+nC[0]+','+nC[1]+','+nC[2]+')';
		ctxt.fillRect(nX, nY, nA.uWid, nA.uHei);
	},//END ();


	//◆固定物の表示
	drawScene : function ( bX, defX ) {
		var nA = this.defAnim;
		var tDis = this.def.rcEntry[2];
		var ctxt = nA.Ctx[ this.def.fID ];
		//スタートライン
		ctxt.fillStyle='rgb(200,255,255)';
		ctxt.fillRect(bX, nA.bgY, nA.LWid, nA.LHei);
		//200mおき
		ctxt.fillStyle='rgb(210,245,160)';
		for( var i=200;i<tDis;i+=200) {
			ctxt.fillRect(i*defX+bX, nA.bgY, nA.LWid, nA.LHei);
		}
		//ゴールライン
		ctxt.fillStyle='rgb(200,255,255)';
		ctxt.fillRect(tDis*defX+bX, nA.bgY, nA.LWid, nA.LHei);
	},//END ();

	// ▼生成したCanvasを#raceFieldに表示する
	showCanvas :function ( solid ) {
		$( 'div#raceField' ).append( solid );
	},//END ();
	// ▼メッセージを＃umaAnnouncementに表示する
	showMessage :function ( solid ) {
		$( '#umaAnnouncement' ).empty();
		$( '#umaAnnouncement' ).append( solid );
	},//END ();
	// ▼canvasの生成
	createCanvas : function( dw, dh ) {
		var cv = this.defAnim.Cvs;
		var ct = this.defAnim.Ctx;
		var pg = this.def.fID;
		cv[ pg ] = document.createElement( 'canvas' );
		cv[ pg ].setAttribute( 'width', dw );
		cv[ pg ].setAttribute( 'height', dh );
		cv[ pg ].id = pg;
		cv[ pg ].style.position = 'absolute';
		cv[ pg ].style.overFlow = 'visible';
		ct[ pg ] = cv[ pg ].getContext( '2d' );
		this.showCanvas( cv[ pg ] );
	},//END ();
	// ▼divの生成
	createDiv : function( pg, dw, dh ) {
		var dv = this.defAnim.Div;
		dv[ pg ] = document.createElement( 'div' );
		dv[ pg ].setAttribute( 'width', dw );
		dv[ pg ].setAttribute( 'height', dh );
		dv[ pg ].id = pg;
		dv[ pg ].style.position = 'absolute';
	},//END ();





});
})(jQuery);
