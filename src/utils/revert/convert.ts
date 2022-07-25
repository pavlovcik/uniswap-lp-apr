/* eslint-disable @typescript-eslint/no-loss-of-precision */
import { DepositAnalytic } from "../get/getDepositFromCache";
export default function revertPositionToDeposit(revertPosition: RevertPosition) {
	const deposit: DepositAnalytic = {
		timestamp: Date.now(),
		liquidity: Number(revertPosition.deposits_value),
		fees: Number(revertPosition.fees_value),
		elapsed: revertPosition.first_mint_ts - Date.now(),
		apr: 0, // undefined, // PositionYield["apr"],
		percentage: 0, // undefined, // PositionYield["percentage"],
	};
	return deposit;
}

interface RevertPosition {
	total_withdrawn1: "0";
	total_fees0: "324.107956";
	in_range: false;
	fees_value: "746.017459757852330594085320";
	total_fees1: "0.3880295638186579";
	first_mint_ts: 1657346491;
	pool: "0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8";
	age: 2.940821759;
	og_owner: "0x4007ce2083c7f3e18097aeb3a39bb8ec149a341d";
	collected_fees0: "324.107956";
	price_upper: "8.708416960237428E-4";
	history_24h: [
		{
			ts: 1657600577;
			token0_price: "1.000000000";
			token1_price: "1087.312780";
			current_amount0: "0";
			current_amount1: "68.59073596";
			total_fees0: "324.107956";
			total_fees1: "0.3880295638186579";
		},
		{
			ts: 1657600157;
			token0_price: "1.000000000";
			token1_price: "1087.250800";
			current_amount0: "0";
			current_amount1: "68.59073596";
			total_fees0: "324.107956";
			total_fees1: "0.3880295638186579";
		},
		{
			ts: 1657600119;
			token0_price: "1.000000000";
			token1_price: "1087.250800";
			current_amount0: "0";
			current_amount1: "68.59073596";
			total_fees0: "324.107956";
			total_fees1: "0.3880295638186579";
		},
		{
			ts: 1657600098;
			token0_price: "1.000000000";
			token1_price: "1087.250800";
			current_amount0: "0";
			current_amount1: "68.59073596";
			total_fees0: "324.107956";
			total_fees1: "0.3880295638186579";
		},
		{
			ts: 1657600073;
			token0_price: "1.000000000";
			token1_price: "1087.250800";
			current_amount0: "0";
			current_amount1: "68.59073596";
			total_fees0: "324.107956";
			total_fees1: "0.3880295638186579";
		},
		{
			ts: 1657599958;
			token0_price: "1.000000000";
			token1_price: "1085.301222";
			current_amount0: "0";
			current_amount1: "68.59073596";
			total_fees0: "324.107956";
			total_fees1: "0.3880295638186579";
		},
		{
			ts: 1657599905;
			token0_price: "1.000000000";
			token1_price: "1084.984034";
			current_amount0: "0";
			current_amount1: "68.59073596";
			total_fees0: "324.107956";
			total_fees1: "0.3880295638186579";
		},
		{
			ts: 1657599782;
			token0_price: "1.000000000";
			token1_price: "1084.984034";
			current_amount0: "0";
			current_amount1: "68.59073596";
			total_fees0: "324.107956";
			total_fees1: "0.3880295638186579";
		},
		{
			ts: 1657596031;
			token0_price: "1.000000000";
			token1_price: "1084.592537";
			current_amount0: "0";
			current_amount1: "68.59073596";
			total_fees0: "324.107956";
			total_fees1: "0.3880295638186579";
		},
		{
			ts: 1657590157;
			token0_price: "1.000000000";
			token1_price: "1090.103111";
			current_amount0: "0";
			current_amount1: "68.59073596";
			total_fees0: "324.107956";
			total_fees1: "0.38802956381865794";
		},
		{
			ts: 1657584354;
			token0_price: "1.000000000";
			token1_price: "1095.464781";
			current_amount0: "0";
			current_amount1: "68.59073596";
			total_fees0: "324.107956";
			total_fees1: "0.38802956381865794";
		},
		{
			ts: 1657578542;
			token0_price: "1.000000000";
			token1_price: "1104.285263";
			current_amount0: "0";
			current_amount1: "68.59073596";
			total_fees0: "324.107956";
			total_fees1: "0.38802956381865794";
		},
		{
			ts: 1657572967;
			token0_price: "1.000000000";
			token1_price: "1138.034141";
			current_amount0: "0";
			current_amount1: "68.59073596";
			total_fees0: "324.107956";
			total_fees1: "0.38802956381865794";
		},
		{
			ts: 1657567411;
			token0_price: "1.000000000";
			token1_price: "1139.486974";
			current_amount0: "0";
			current_amount1: "68.59073596";
			total_fees0: "324.107956";
			total_fees1: "0.38802956381865794";
		},
		{
			ts: 1657561257;
			token0_price: "1.000000000";
			token1_price: "1150.384426";
			current_amount0: "1427.277166";
			current_amount1: "67.34892208";
			total_fees0: "319.300186";
			total_fees1: "0.3801170915346495";
		},
		{
			ts: 1657554029;
			token0_price: "1.000000000";
			token1_price: "1138.570137";
			current_amount0: "0";
			current_amount1: "68.59073596";
			total_fees0: "315.005469";
			total_fees1: "0.3801170915346495";
		},
		{
			ts: 1657548058;
			token0_price: "1.000000000";
			token1_price: "1134.769173";
			current_amount0: "0";
			current_amount1: "68.59073596";
			total_fees0: "315.005469";
			total_fees1: "0.3801170915346495";
		},
		{
			ts: 1657542033;
			token0_price: "1.000000000";
			token1_price: "1136.870500";
			current_amount0: "0";
			current_amount1: "68.59073596";
			total_fees0: "295.528374";
			total_fees1: "0.3632006411786289";
		},
		{
			ts: 1657536503;
			token0_price: "1.000000000";
			token1_price: "1145.094726";
			current_amount0: "0";
			current_amount1: "68.59073596";
			total_fees0: "295.528374";
			total_fees1: "0.3632006411786289";
		},
		{
			ts: 1657531099;
			token0_price: "1.000000000";
			token1_price: "1144.938121";
			current_amount0: "0";
			current_amount1: "68.59073596";
			total_fees0: "295.528374";
			total_fees1: "0.3632006411786289";
		},
		{
			ts: 1657525558;
			token0_price: "1.000000000";
			token1_price: "1141.589077";
			current_amount0: "0";
			current_amount1: "68.59073596";
			total_fees0: "295.528374";
			total_fees1: "0.3632006411786289";
		},
		{
			ts: 1657519665;
			token0_price: "1.000000000";
			token1_price: "1147.105000";
			current_amount0: "0";
			current_amount1: "68.59073596";
			total_fees0: "295.528374";
			total_fees1: "0.3632006411786289";
		},
		{
			ts: 1657513693;
			token0_price: "1.000000000";
			token1_price: "1150.555483";
			current_amount0: "1545.159106";
			current_amount1: "67.2464581";
			total_fees0: "295.390416";
			total_fees1: "0.3590355358738234";
		},
		{
			ts: 1657507863;
			token0_price: "1.000000000";
			token1_price: "1150.863193";
			current_amount0: "1757.191939";
			current_amount1: "67.06219532";
			total_fees0: "272.446954";
			total_fees1: "0.33859048668126646";
		}
	];
	performance: {
		hodl: {
			pnl: "-2816.6637579005071291512499100";
			roi: "-3.604533036383277";
			apr: "-447.7016940";
			pool_pnl: "-2805.260055104218010774207020";
			pool_roi: "-3.5899395218570844";
			pool_apr: "-445.9226628";
			il: "-3551.277514862070341368292340";
			fee_apr: "118.5776185";
		};
		token0: {
			pnl: "-6701.788091619518";
			roi: "-8.170044197300113";
			apr: "-1014.7586801340692";
			pool_pnl: "-6689.67974164633";
			pool_roi: "-8.15528309875672";
			pool_apr: "-1013.0063836826673";
			il: "-7437.09410705787";
		};
		token1: {
			il_token1: "1.0455008786934208";
			pnl: "1.7201404290420836";
			roi: "2.546254190425283";
			apr: "316.2594005604291";
			pool_pnl: "1.7306283981031012";
			pool_roi: "2.5617791061355297";
			pool_apr: "318.21316097201355";
		};
		eth: {
			pnl: "1.720140428474499";
			roi: "2.5462541895642";
			apr: "316.25940045347744";
			pool_pnl: "1.7306283975355166";
			pool_roi: "2.56177910527432";
			pool_apr: "318.21316086765086";
			il: "1.0455008781386503";
		};
		usd: {
			pnl: "-6701.788091619518";
			roi: "-8.170044197300113";
			apr: "-1014.7586801340692";
			pool_pnl: "-6689.67974164633";
			pool_roi: "-8.15528309875672";
			pool_apr: "-1013.0063836826673";
			il: "-7437.09410705787";
		};
	};
	collected_fees1: "0.388029563818657894";
	uncollected_fees1: "0.0";
	nft_id: 266059;
	diffs0: "-44845.438381";
	current_amount0: "0";
	underlying_value: "74579.58379891358";
	token1: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
	token0: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";
	autocompounding_details: null;
	liquidity: "46749211239857097";
	real_owner: "0x4007ce2083c7f3e18097aeb3a39bb8ec149a341d";
	total_deposits1: "30.612555600400134303";
	withdrawals_value: "0";
	pool_tick: 206405;
	now_ts: 1657600577;
	cash_flows: [
		{
			date: "2022-07-09T06:01:31Z";
			tx_hash: "0x40411ba28be2b5b98bf5ba4e2006b1b3a12bc4f5dd89f2f8353d58dc75c38698";
			fee_growth_inside1: 65916253855983167026368017639733813752422;
			amount1: "-17.01166219124453517";
			type: "deposits";
			block_number: "15106628";
			liquidity: 25978941441569353;
			prices: {
				token0: {
					usd: 1.0;
					eth: 0.0008235548768123707885621859663351384;
					token1: 0.0008235548768;
				};
				token1: {
					usd: 1214.248167;
					eth: 1;
					token0: 1214.248167;
				};
			};
			amount0: "-24920.998381";
			timestamp: 1657346491;
			price: 8.188712666277802e-4;
			fee_growth_inside0: 78528876550155255301044632082080;
		},
		{
			amount: "-0.0037281516687598325";
			tx_hash: "0x40411ba28be2b5b98bf5ba4e2006b1b3a12bc4f5dd89f2f8353d58dc75c38698";
			gas_price: 8.602659306e-9;
			type: "gas-costs";
			block_number: "15106628";
			prices: {
				native_token: {
					usd: 1214.248167;
					eth: 1;
					token0: 1214.248167;
					token1: 1;
				};
			};
			gas_used: 433372;
			with_receipt: true;
			amount_usd: "-4.053666955220892";
			timestamp: 1657346491;
		},
		{
			date: "2022-07-09T06:07:46Z";
			tx_hash: "0x8efb704653e280ca70f4eb9ece423a2b498d2b58aed7ac26417785e16796d3b3";
			fee_growth_inside1: 65916253855983167026368017639733813752422;
			amount1: "-13.600893409155599133";
			type: "deposits";
			block_number: "15106657";
			liquidity: 46749211239857097;
			prices: {
				token0: {
					usd: 1.0;
					eth: 0.0008235548768123707885621859663351384;
					token1: 0.0008235548768;
				};
				token1: {
					usd: 1214.248167;
					eth: 1;
					token0: 1214.248167;
				};
			};
			amount0: "-19924.440000";
			timestamp: 1657346866;
			price: 8.188712666277802e-4;
			fee_growth_inside0: 78528876550155255301044632082080;
		},
		{
			amount: "-0.001678978552850943";
			tx_hash: "0x8efb704653e280ca70f4eb9ece423a2b498d2b58aed7ac26417785e16796d3b3";
			gas_price: 8.663951787e-9;
			type: "gas-costs";
			block_number: "15106657";
			prices: {
				native_token: {
					usd: 1214.248167;
					eth: 1;
					token0: 1214.248167;
					token1: 1;
				};
			};
			gas_used: 193789;
			with_receipt: true;
			amount_usd: "-1.8255748378607357";
			timestamp: 1657346866;
		},
		{
			date: "2022-07-12T01:50:28Z";
			tx_hash: "0xc248c28cd521c3e958938f110efb362796fbd26bac4c80c2de8278986877f6cc";
			fee_growth_inside1: 68740678373737145548170619732106710340082;
			amount1: "0.388029563818657894";
			type: "claimed-fees";
			block_number: "15124989";
			liquidity: 46749211239857097;
			prices: {
				token0: {
					usd: 1.0;
					eth: 0.0009166635686604631425743982943562248;
					token1: 0.0009166635687;
				};
				token1: {
					usd: 1090.912778;
					eth: 1;
					token0: 1090.912778;
				};
			};
			amount0: "324.107956";
			timestamp: 1657590628;
			price: 9.220052381284503e-4;
			fee_growth_inside0: 80888022719743473034656257502610;
		},
		{
			amount: "-0.0050808388394069";
			tx_hash: "0xc248c28cd521c3e958938f110efb362796fbd26bac4c80c2de8278986877f6cc";
			gas_price: 2.394024803e-8;
			type: "gas-costs";
			block_number: "15124989";
			prices: {
				native_token: {
					usd: 1090.912778;
					eth: 1;
					token0: 1090.912778;
					token1: 1;
				};
			};
			gas_used: 212230;
			with_receipt: true;
			amount_usd: "-5.52446100320749";
			timestamp: 1657590628;
		},
		{
			amount0: "0.0";
			amount1: "0.0";
			prices: {
				token0: {
					usd: 1.0;
					eth: 0.0009196985617697295030627821186451182;
					token1: 0.0009196985618;
				};
				token1: {
					usd: 1087.31278;
					eth: 1;
					token0: 1087.31278;
				};
			};
			current: true;
			timestamp: 1657600577;
			type: "unclaimed-fees-state";
		},
		{
			timestamp: 1657600578;
			amount0: "0";
			amount1: "68.59073596";
			liquidity: 46749211239857097;
			current_tick: 206405;
			prices: {
				native_token: {
					usd: 1087.31278;
					eth: 1;
					token0: 1087.31278;
					token1: 1;
				};
				token0: {
					usd: 1.0;
					eth: 0.0009196985617697295030627821186451182;
					token1: 0.0009196985618;
				};
				token1: {
					usd: 1087.31278;
					eth: 1;
					token0: 1087.31278;
				};
			};
			current: true;
			type: "current-amount-state";
		}
	];
	exited: false;
	deposits_value: "78130.861313775639141368292340";
	diffs1: "37.97818035959986";
	total_withdrawn0: "0";
	tick_upper: 205860;
	tokens: {
		"0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": {
			decimals: 6;
			symbol: "USDC";
			address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";
			price: "1.000000000";
			prices: {
				usd: "1.000000000";
				source: "uniswapv3";
			};
		};
		"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2": {
			symbol: "WETH";
			address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
			decimals: 18;
			price: "1087.312780";
			prices: {
				usd: "1087.312780";
				source: "uniswapv3";
			};
		};
	};
	network: "mainnet";
	exchange: "uniswapv3";
	current_amount1: "68.59073596";
	pool_price: "9.196985617697295E-4";
	total_deposits0: "44845.438381";
	fee_tier: "3000";
	price_lower: "7.86399796696275E-4";
	autocompounding: false;
	owner: "0x4007ce2083c7f3e18097aeb3a39bb8ec149a341d";
	uncollected_fees0: "0.0";
	tick_lower: 204840;
}
