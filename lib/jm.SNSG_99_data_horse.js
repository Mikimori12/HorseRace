/*
  ◆jm.SNSG_horse
　競馬ゲームのレースシミュレータ
*/
(function ($) {
	$.fn.extend({

		//◆初期定数
		horse : {
			myHorse : {
			horseName : "マイホース",
			OPR:2,
			BLD:4,
			STM:4000, SPD:4000, PWR:4000, ACC:4000, DPN:4000,
			TRF:500, DRT:500, HVY:500,
			LCU:500, RCU:500, NCU:1000,
			},
			1 : {
			horseName : "コウホウタイキ",
			OPR:1,
			BLD:1,
			STM:4000, SPD:4000, PWR:4000, ACC:4000, DPN:4000,
			TRF:500, DRT:500, HVY:500,
			LCU:500, RCU:500, NCU:1000
			},
			2 : {
			horseName : "サシミアジ",
			OPR:1,
			BLD:2,
			STM:4000, SPD:4000, PWR:4000, ACC:4000, DPN:4000,
			TRF:500, DRT:500, HVY:500,
			LCU:500, RCU:500, NCU:1000
			},
			3 : {
			horseName : "センコウイッテ",
			OPR:1,
			BLD:3,
			STM:4000, SPD:4000, PWR:4000, ACC:4000, DPN:4000,
			TRF:500, DRT:500, HVY:500,
			LCU:500, RCU:500, NCU:1000
			},
			4 : {
			horseName : "ニゲウマイチバン",
			OPR:4,
			BLD:4,
			STM:4000, SPD:4000, PWR:4000, ACC:4000, DPN:4000,
			TRF:500, DRT:500, HVY:500,
			LCU:500, RCU:500, NCU:1000
			},
			5 : {
			horseName : "ヨワスギワロタ",
			OPR:3,
			BLD:5,
			STM:4000, SPD:4000, PWR:4000, ACC:4000, DPN:4000,
			TRF:250, DRT:250, HVY:250,
			LCU:250, RCU:250, NCU:1000
			},
			6 : {
			horseName : "パーフェクトラン",
			OPR:4,
			BLD:6,
			STM:4000, SPD:4000, PWR:4000, ACC:4000, DPN:4000,
			TRF:1000, DRT:1000, HVY:1000,
			LCU:1000, RCU:1000, NCU:1000
			},
			7 : {
			horseName : "ジーワンクラス",
			OPR:2,
			BLD:1,
			STM:4000, SPD:4000, PWR:4000, ACC:4000, DPN:4000,
			TRF:500, DRT:500, HVY:500,
			LCU:500, RCU:500, NCU:1000
			},
		},

		horseGroup : {
			//LED:'逃げ',　BNT:'先行', CNT:'中団', TIL:'後方'
			1:[[1,'TIL'],[2,'CNT'],[3,'BNT'],[4,'LED'],[5,'BNT'],[6,'CNT'],[7,'TIL']],
//			1:[[1,'TIL'],[2,'CNT'],[3,'BNT'],[4,'LED'],[5,'LED'],[6,'BNT'],[7,'CNT']],
		},

//LED:逃げ　2ND:先行　CNT:中団　TIL:後方
//HUP:追い　MNT:折り合い　SKL:スキル
		operate : {
				1200 : {
					LED : { 200:'SKL' , 400:'HUP' , 600:'MNT' , 800:'MNT' , 1000:'HUP' ,1200:'SKL' },
					BNT : { 200:'HUP' , 400:'HUP' , 600:'MNT' , 800:'MNT' , 1000:'HUP' ,1200:'SKL' },
					CNT : { 200:'MNT' , 400:'HUP' , 600:'MNT' , 800:'SKL' , 1000:'HUP' ,1200:'SKL' },
					TIL : { 200:'MNT' , 400:'MNT' , 600:'HUP' , 800:'SKL' , 1000:'SKL' ,1200:'HUP' },
				},
				1400 : {
					LED : { 200:'SKL' , 400:'HUP' , 600:'MNT' , 800:'MNT' , 1000:'MNT' ,1200:'HUP' ,1400:'SKL' },
					BNT : { 200:'HUP' , 400:'HUP' , 600:'MNT' , 800:'MNT' , 1000:'MNT' ,1200:'SKL' ,1400:'SKL' },
					CNT : { 200:'MNT' , 400:'MNT' , 600:'HUP' , 800:'MNT' , 1000:'SKL' ,1200:'HUP' ,1400:'SKL' },
					TIL : { 200:'MNT' , 400:'MNT' , 600:'MNT' , 800:'SKL' , 1000:'SKL' ,1200:'HUP' ,1400:'HUP' },
				},
				1600 : {
					LED : { 200:'SKL' , 400:'HUP' , 600:'MNT' , 800:'MNT' , 1000:'MNT' ,1200:'MNT' ,1400:'HUP' ,1600:'SKL' },
					BNT : { 200:'HUP' , 400:'HUP' , 600:'MNT' , 800:'MNT' , 1000:'MNT' ,1200:'MNT' ,1400:'SKL' ,1600:'SKL' },
					CNT : { 200:'MNT' , 400:'MNT' , 600:'MNT' , 800:'HUP' , 1000:'MNT' ,1200:'SKL' ,1400:'HUP' ,1600:'SKL' },
					TIL : { 200:'MNT' , 400:'MNT' , 600:'MNT' , 800:'MNT' , 1000:'SKL' ,1200:'SKL' ,1400:'HUP' ,1600:'HUP' },
				},
				1800 : {
					LED : { 200:'SKL' , 400:'HUP' , 600:'MNT' , 800:'MNT' , 1000:'MNT' ,1200:'MNT' ,
								 1400:'HUP' ,1600:'SKL', 1800:'HUP' },
					BNT : { 200:'HUP' , 400:'HUP' , 600:'MNT' , 800:'MNT' , 1000:'MNT' ,1200:'MNT' ,
								 1400:'SKL' ,1600:'SKL', 1800:'HUP' },
					CNT : { 200:'MNT' , 400:'MNT' , 600:'MNT' , 800:'HUP' , 1000:'MNT' ,1200:'SKL' ,
								 1400:'HUP' ,1600:'SKL', 1800:'HUP' },
					TIL : { 200:'MNT' , 400:'MNT' , 600:'MNT' , 800:'MNT' , 1000:'SKL' ,1200:'SKL' ,
								 1400:'HUP' ,1600:'HUP', 1800:'HUP' },
				},
				2000 : {
					LED : { 200:'SKL' , 400:'HUP' , 600:'MNT' , 800:'MNT' , 1000:'MNT' ,1200:'MNT' ,
								 1400:'HUP' ,1600:'SKL', 1800:'HUP' ,2000:'HUP' },
					BNT : { 200:'HUP' , 400:'HUP' , 600:'MNT' , 800:'MNT' , 1000:'MNT' ,1200:'MNT' ,
								 1400:'SKL' ,1600:'SKL', 1800:'HUP' ,2000:'HUP' },
					CNT : { 200:'MNT' , 400:'MNT' , 600:'MNT' , 800:'HUP' , 1000:'MNT' ,1200:'SKL' ,
								 1400:'HUP' ,1600:'SKL', 1800:'HUP' ,2000:'HUP' },
					TIL : { 200:'MNT' , 400:'MNT' , 600:'MNT' , 800:'MNT' , 1000:'SKL' ,1200:'SKL' ,
								 1400:'HUP' ,1600:'HUP', 1800:'HUP' ,2000:'HUP' },
				},
				2200 : {
					LED : { 200:'SKL' , 400:'SKL' , 600:'HUP' , 800:'MNT' , 1000:'MNT' ,1200:'MNT' ,
								 1400:'MNT' ,1600:'HUP', 1800:'HUP' ,2000:'HUP' , 2200:'SKL' },
					BNT : { 200:'HUP' , 400:'HUP' , 600:'HUP' , 800:'MNT' , 1000:'MNT' ,1200:'MNT' ,
								 1400:'MNT' ,1600:'MNT', 1800:'SKL' ,2000:'SKL' , 2200:'HUP' },
					CNT : { 200:'MNT' , 400:'MNT' , 600:'MNT' , 800:'HUP' , 1000:'MNT' ,1200:'SKL' ,
								 1400:'MNT' ,1600:'SKL', 1800:'HUP' ,2000:'HUP' , 2200:'SKL' },
					TIL : { 200:'MNT' , 400:'MNT' , 600:'MNT' , 800:'MNT' , 1000:'SKL' ,1200:'SKL' ,
								 1400:'HUP' ,1600:'HUP', 1800:'HUP' ,2000:'HUP' , 2200:'SKL' },
				},
				2400 : {
					LED : { 200:'SKL' , 400:'HUP' , 600:'HUP' , 800:'MNT' , 1000:'MNT' ,1200:'MNT' ,
								 1400:'SKL' ,1600:'MNT', 1800:'MNT' ,2000:'HUP' , 2200:'HUP' ,2400:'SKL' },
					BNT : { 200:'HUP' , 400:'HUP' , 600:'HUP' , 800:'MNT' , 1000:'MNT' ,1200:'MNT' ,
								 1400:'MNT' ,1600:'SKL', 1800:'MNT' ,2000:'HUP' , 2200:'SKL' ,2400:'SKL' },
					CNT : { 200:'MNT' , 400:'MNT' , 600:'MNT' , 800:'SKL' , 1000:'MNT' ,1200:'MNT' ,
								 1400:'HUP' ,1600:'SKL', 1800:'HUP' ,2000:'HUP' , 2200:'HUP' ,2400:'SKL' },
					TIL : { 200:'MNT' , 400:'MNT' , 600:'MNT' , 800:'MNT' , 1000:'MNT' ,1200:'SKL' ,
								 1400:'SKL' ,1600:'HUP', 1800:'HUP' ,2000:'HUP' , 2200:'SKL' ,2400:'HUP' },
				},
		},

	});
})(jQuery);
