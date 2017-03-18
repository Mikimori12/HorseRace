/*
  ◆jm.SNSG_horse
　競馬ゲームのレースシミュレータ
*/
(function ($) {
	$.fn.extend({

		//◆関数：メイン関数
		SNSG_controler : function () {
			var fq = this;
			var dd = fq.def;
			var nA = fq.defAnim;
			var rcEnt = dd.rcEntry;
			var uMember = fq.horseGroup[ rcEnt[6] ];
			var uMemL = uMember.length;
			var hD = dd.entHD;
			var rh = dd.hID;
			var iID = dd.infoID;
			var dID = dd.dataID;
			var dID2 = dd.dataID2;
			var aF = nA.animeFrame;
			var nSeD = rcEnt[2];

			//▼馬、初期描画
			$('div#raceField').css({'width':nA.canWid,'height':nA.canHei});
			var fID = dd.fID;
			fq.createCanvas( nA.canWid, nA.canHei );
			aF['scale'] = 50/aF['late'];
			var Xscale = aF['scale'];
			nA.bgX = nA.uWid - nA.LWid + nA.uDX;
			var bgX = nA.bgX;
			//▼実況コメントの設置、アクションボタンの一時非表示
			fq.drawScene( bgX, Xscale );
			fq.showAnnounce(0);
			$('div#opeBtn').hide();

			//▼表組みその１:thの設置
			var nTH = [
				['sTH',iID, 'waku', ''],['sTH',iID, 'horseName', '馬名'],
				['sTH',iID, 'fTime', '作戦'],['sTH',iID, 'STM', 'STM'],
				['sTH',iID, 'MAXSPD', 'MSPD'],['sTH',iID, 'SPD', 'SPD'],
				['sTH',iID, 'ACC', 'ACC'],['sTH',iID, 'KONJO', 'NEB'],
				['sTH',iID, 'aTIME', 'タイム'],['sTH',dID, 'waku', ''],
			];
			var did = dID;
			for( var i=50; i<=rcEnt[2]; i+=50) {
				//ファストラップを99999で設置
				dd.fastLap[i] = 99999;
				//各ファロンTHを設置
				nTH.push(['sTH',did, 'fTime', i]);
			}
			fq.setInfoGroup( nTH );
			//▼表組みその２馬名、馬データの格納・作成
			for(var i=0;i<=uMemL;i++){
				var nNum = rh+(i+1);
				var nop = '';
				hD[ nNum ] =[];
				if( i==uMemL ){
					//マイホース情報
					hD[nNum]['rHD'] = fq.horse['myHorse'];
					hD[nNum]['rOP'] = [];
					nop = '手動';
				} else {
					//CPU馬情報
					hD[nNum]['rHD'] = fq.horse[ uMember[i][0] ];
					hD[nNum]['rOP'] = fq.operate[ rcEnt[2] ][ uMember[i][1] ];
					nop = dd.operateName[ uMember[i][1] ];
				}
				//レース用能力の算出
				hD[nNum]['rrD'] = fq.calRaceStatus( hD[nNum]['rHD'] );
				//表組み
				var nTD = [
					['sTR',iID, nNum],['sTR',dID, nNum],['sTR',dID2, nNum],
					['sWK',iID, nNum, dd.waku[i]],['sWK',dID, nNum,dd.waku[i]],
					['sTD',iID, hD[nNum]['rHD']['horseName'], nNum, 'nCn'],
					['sTD',iID, nop, nNum, 'nCn'],
					['sTD',iID, hD[nNum]['rrD'][5][0], nNum, 'STM'],
					['sTD',iID, hD[nNum]['rrD'][0], nNum, 'MAXSPD'],
					['sTD',iID, hD[nNum]['rrD'][1], nNum, 'SPD'],
					['sTD',iID, hD[nNum]['rrD'][2], nNum, 'ACC'],
					['sTD',iID, hD[nNum]['rrD'][3], nNum, 'KONJO'],
					['sTD',iID, hD[nNum]['rrD'][7], nNum, 'aTIME'],
				];
				fq.setInfoGroup( nTD );
				//馬□の設置
				fq.drawFill( nA.uDX, nA.uDY1+(i*nA.uDY2), dd.waku[i] );
			}

			//▼アクションボタンの設置
			$('div#opeBtn').show();
			//マウスオーバーした時、ボタンの背景色を変更
			var nColor;
			$('div#opeBtn').hover(
				function () {
					nColor = $(this).css('background-color');
					$(this).css('background-color','#d0ffd0');
				},
				function () {
					$(this).css('background-color',nColor);
				}
			);
			//アクションボタンの挙動
			var nowDis = 0;
			var dcnt = 0;
			var nACT = '';
			$('div#opeBtn').bind('click', function () {
				var nOP = $(this).attr('class');
				$('div#opeBtn').hide();
				GoRace(nOP);
			});

			//▼アクションボタンを押したらレース処理
			function GoRace( nAC ) {
				//レース中
				if( nowDis < rcEnt[2] ) {
					nowDis += 200;
					var did = dID;
					//▼各馬の５０ｍラップ算出
					for(var i=0;i<=uMemL;i++) {
							var nhn = rh+(i+1);
							if( i== uMemL ) {
								nACT = nAC;
							} else {
								nACT = hD[nhn]['rOP'][nowDis]
							}
						for(var j=50;j<=200;j+=50) {
							var nJ = j+nowDis-200
							fq.calcurateLap( hD[nhn]['rrD'], nACT, nJ, dd.fastLap );
							fq.setInfoGroup([['sTD', did, hD[nhn]['rrD'][6][nJ], nhn, 'nCn']]);
						}
					}
					//canvasの表示
					fq.startAnimation( nowDis );
					//アナウンステキストの表示
					fq.showAnnounce(nowDis);
				} else {
					if( nowDis != rcEnt[2] ) {
						$('div#opeBtn').show();
					}
				}
			}//END function GoRace()

		},//END ();

		//◆関数：50mごとのラップを算出
		calcurateLap : function ( nrd, nACT, jm ) {
			var rDis = (4000 - this.def.rcEntry[2])*0.00008;
			//nrd:0最高スピード、1マイペース、2加速度、3粘り、4登板、5スタミナ
			//、6ラップ、7合計タイム、8前回までの合計タイム、9フレーム当たりの移動距離、10合計移動距離
			//▼前５０ｍのラップ
			var nTime = nrd[6][jm-50];
			//▼スタミナの定常消費
			nrd[5][0] -= 100;
			//▼アクションによる加速値とスタミナ消費値
			var nAction = {
				//【追い】
				HUP : function() {
					nTime -= nrd[2];
					nrd[5][0] -= 5;
				},
				//【控え】
				MNT : function() {
					//スタミナが半分以上の時に控えると、最高速アップ
					if( nrd[5][0] >= nrd[5][1]*0.4 ) {
						nrd[0] -= nrd[2]*rDis;
						nrd[2] *= (1+rDis);
						if( nrd[2] > 230 ) {
							nrd[2] = 230;
						}
						nrd[5][0] += 100;
					}
						nTime += nrd[3]*0.5;
						nrd[5][0] -= 50;
				},
				//【スキル】
				SKL : function() {
					nTime -= 1.5*nrd[2];
					nrd[5][0] -= 50;
				},
			};
			nAction[ nACT ]();
			//最高速が200より速い時は200にする
			if( nrd[0] < 200 ){
				nrd[0] = 200;
				nrd[5][0] += 100;
			}
			//加速度が150より速い時は150にする
			if( nrd[2] > 150 ){
				nrd[2] = 150;
				nrd[5][0] += 100;
			}
			//マイペースより速いときはスタミナを減算
			if( nTime <= (nrd[1]-nrd[3]) ) {
				nrd[5][0] -= 50;
				nrd[0] += nrd[3]*0.2
			}
			//スタミナが0以下の時は粘り分だけ最高速を減速、粘り分減速
			if( nrd[5][0] <= 0) {
				nrd[0] += nrd[3];
				nTime += nrd[3];
			}
			//最高速度より速いときは最高速度に設定
			if( nTime <= nrd[0] ) {
				nTime = nrd[0];
				nrd[5][0] -= 20;
			}
			//ラップの決定
			nrd[6][jm] = Math.floor(nTime);
			nrd[7] += Math.floor(nTime);
			nrd[8][jm] = nrd[7];
			nrd[0] = Math.floor(nrd[0]);
			nrd[1] = Math.floor(nrd[1]);
			nrd[2] = Math.floor(nrd[2]);
			nrd[3] = Math.floor(nrd[3]);
			if( this.def.fastLap[jm] > nrd[7] ) {
				this.def.fastLap[jm] = nrd[7];
			}
		},//END ();

		//◆関数：1フレームあたりの移動距離の算出
		calGoDistance : function ( nH, nD ) {
			var fq = this;
			var aF = fq.defAnim.animeFrame;
			var nFr = aF['late'];
			var nDS = nD * aF['scale'];
			var fastT = fq.def.fastLap[nD];
			var nHD = fq.def.entHD[nH]['rrD']
			var nAllT = nHD[8][nD];
			var nP = nHD[10];
			nHD[9] = (nDS-nP-(nDS*(nAllT-fastT))/nAllT)/nFr;
		},//END ();

		//◆各馬の定数：レース能力値
		calRaceStatus : function ( uData ) {
			return [
			//0:最高スピード
			Math.floor( 275 - uData['SPD']*0.0025 - uData['ACC']*0.0005 - uData['PWR']*0.0005 - uData['DPN']*0.0001 ),
			//1:マイペース
			Math.floor( 325 - uData['SPD']*0.0012 - uData['ACC']*0.0001 - uData['PWR']*0.0001 - uData['DPN']*0.0005 ),
			//2:加速度
			Math.floor( uData['SPD']*0.0002 + uData['ACC']*0.001 + uData['PWR']*0.0004 + uData['DPN']*0.0004 ),
			//3:粘り
			Math.floor( 10 - (uData['SPD']*0.0002 + uData['ACC']*0.0001 + uData['PWR']*0.0002 + uData['DPN']*0.0005) ),
			//4:登板補正値
			Math.floor( 10 - (uData['ACC']*0.0002 + uData['PWR']*0.0005 + uData['DPN']*0.0003) ),
			//5:スタミナ
			[Math.floor( uData['STM'] ),Math.floor( uData['STM'] )],
			//6:現在のラップ
			[340],
			//7:合計タイム
			0,
			//8:50mごとの合計タイム
			[],
			//9:1フレームあたりの移動距離
			0,
			//10:現在の走破距離
			0
			];
		},//END ();

		//◆関数：table表示
		setInfoGroup : function ( sD ) {
			var tAC = {
				sTH : function (sd) {
					$('table#'+sd[1]+' > thead').append( $('<th class="'+sd[2]+'">').append(sd[3]) );
				},
				sTR : function (sd) {
					$('table#'+sd[1]+' > tbody').append( $('<tr class="'+sd[2]+'">') );
				},
				sTD : function (sd) {
					$('table#'+sd[1]+' > tbody > tr.'+sd[3]).append( $('<td class="'+sd[4]+'">').append(sd[2]) );
				},
				reTD : function (sd) {
					$('table#'+sd[1]+' > tbody > tr.'+sd[3]+' > td.'+sd[4]).html( sd[2] );
				},
				sWK : function (sd) {
					$('table#'+sd[1]+' > tbody > tr.'+sd[2]).append( $("<td>").append('　').css('background-color','rgb('+sd[3][0]+','+sd[3][1]+','+sd[3][2]+')') );
				},
			};
			for(var i in sD) {
				tAC[ sD[i][0] ]( sD[i] );
			}
		},//END ();
		showAnnounce : function ( nD ) {
			var fq = this;
			var dd = fq.def;
			$('#raceComent').html(fq.announce[ dd.rcEntry[2] ][nD]);
		},//END ();

	});
})(jQuery);
