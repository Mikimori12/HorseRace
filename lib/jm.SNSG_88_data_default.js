/*
  ◆jm.SNSG
　競馬ゲームのデフォルトとなる初期定数など
*/
(function ($) {
	$.fn.extend({

		//◆race関連
		def : {
			hID : 'hID', fID : 'raceAnim',
			infoID : 'horseInfo',
			dataID : 'dataLap', dataID2 : 'dataLap2',
			operateName : { LED:'逃げ',　BNT:'先行', CNT:'中団', TIL:'後方' },
			actionName : { HUP:'追い',　MNT:'控え', SKL:'スキル' },
			rcEntry :[ 1, 0, 1600, 0, 4, 0, 1 ],//0左右、1芝ダ、2距離、3坂有り無し、4出走数、5グレード、6出走グループ
			entHD : {},
			waku : [
				[255,255,255],[20,20,20],[200,0,0],[0,0,200],
				[255,255,0],[0,200,0],[255,200,0],[255,200,255],
			],
			fastLap : [],
		},

		course : {
				0 : [ 1220, 1400 ],//基準ラップ：[芝,ダート]
				1200 : {
				 200:["NCU","NOS"],  400:["NCU","NOS"],  600:["LCU","NOS"],  800:["LCU","UPS"],
				1000:["NCU","NOS"], 1200:["NCU","NOS"],
				},
		},


		slope : {
		  NOS : 0, UPS : 1, DNS : -1
		},

		grade : {
		  0:20,//新馬、未勝利
		  1:18,//500
		  2:16,//1000
		  3:14,//1600
		  4:11,//G3,OP
		  5:9,//G2
		  6:5,//G1
		  7:10//海外G1
		},

	//◆canvas関連
	defAnim : {
		Cvs : {},
		Ctx : {},
		Div : {},
		animeFrame : {all:1,late:40,bg:38,move:180,scale:0},
		canWid:700,canHei:220, bgX:0,bgY:2, uDX:2,uDY1:30,uDY2:23,
		uWid:15,uHei:15, LWid:4,LHei:216,
	},

	});
})(jQuery);
