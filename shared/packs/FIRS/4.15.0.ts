import { VanillaEconomy } from "../Vanilla/vanilla";
import { Economy, IndustryVersion } from "../economyModel";

class FIRS_4_15_0_Steeltown extends VanillaEconomy {
    constructor() {
        super();
        this.name = 'Steeltown'
        this.industryHexColors = {
            'Arable Farm': '90e05cff',
            'Assembly Plant': '8c68fcff',
            'Basic Oxygen Furnace': 'fcbcc0ff',
            'Blast Furnace': 'a8a8a8ff',
            'Body Plant': 'fc9c00ff',
            'Brewery': 'fcfc00ff',
            'Builders Yard': 'fcf4ecff',
            'Bulk Terminal': 'e8d0fcff',
            'Carbon Black Plant': '3c0000ff',
            'Cement Plant': '6c7484ff',
            'Chemical Plant': 'fcfc00ff',
            'Chlor-alkali Plant': 'fcfc00ff',
            'Cider Mill': 'fcfc00ff',
            'Clay Pit': 'bc546cff',
            'Coal Mine': '101010ff',
            'Coffee Estate': '200400ff',
            'Coke Oven': 'e00000ff',
            'Component Factory': 'fc907cff',
            'Copper Mine': 'a8a8a8ff',
            'Copper Smelter': 'b87818ff',
            'Cryo Plant': 'fcc000ff',
            'Dairy': 'fcf4ecff',
            'Dairy Farm': 'fc3434ff',
            'Diamond Mine': 'fcfcc0ff',
            'Dredging Site': 'fc9c00ff',
            'Electric Arc Furnace': 'fc6c00ff',
            'Engine Plant': 'bc546cff',
            'Farm': '548414ff',
            'Fishing Grounds': '9cccdcff',
            'Fishing Harbour': 'fcf4ecff',
            'Fish Farm': '9cccdcff',
            'Flour Mill': 'fcbcc0ff',
            'Food Processor': '',
            'Forest': '306004ff',
            'Fruit Plantation': '6cb040ff',
            'General Store': 'fcd8c8ff',
            'Glass Works': '58a8f0ff',
            'Hardware Store': 'fcf4ecff',
            'Herding Coop': '',
            'Hotel': 'fcc000ff',
            'Integrated Steel Mill': '',
            'Iron Ore Mine': '74581cff',
            'Limestone Mine': 'fcfcc0ff',
            'Lime Kiln': 'd49470ff',
            'Liquids Terminal': 'fc3434ff',
            'Manganese Mine': '343c48ff',
            'Metal Workshop': 'fc907cff',
            'Nitrate Mine': 'ecbc94ff',
            'Oil Rig': '58a8f0ff',
            'Oil Wells': '58a8f0ff',
            'Orchard Piggery': '',
            'Paper Mill': 'fc3434ff',
            'Peatlands': '541c10ff',
            'Petrol Pump': '',
            'Phosphate Mine': 'bc546cff',
            'Plaza': '',
            'Port': 'fc6c00ff',
            'Potash Mine': '8c4c40ff',
            'Power Plant': 'fcd8c8ff',
            'Pyrite Mine': 'a00000ff',
            'Pyrite Smelter': '6c7484ff',
            'Quarry': 'fc9c00ff',
            'Ranch': 'fcd8c8ff',
            'Sawmill': 'fc9c00ff',
            'Scrap Yard': 'b87818ff',
            'Sheet and Pipe Mill': '9cccdcff',
            'Slag Grinding Plant': '6c7484ff',
            'Soda Ash Mine': 'fcf4ecff',
            'Stockyard': 'e8d0fcff',
            'Supply Yard': 'bca8fcff',
            'Textile Mill': '',
            'Timber Yard': '882034ff',
            'Trading Post': 'b8a078ff',
            'Tyre Plant': 'bca8fcff',
            'Vehicle Distributor': '6cb040ff',
            'Vineyard': '548414ff',
            'Wharf': 'b8a078ff',
            'Wire and Section Mill': '882034ff',
        }
        this.cargoData = {
            'ACID': {
                penalty_lowerbound: 24,
                single_penalty_length: 48,
                price_factor: 109,
            },
            'BEER': {
                penalty_lowerbound: 9,
                single_penalty_length: 36,
                price_factor: 166,
            },
            'STAL': {
                penalty_lowerbound: 14,
                single_penalty_length: 255,
                price_factor: 128,
            },
            'ALO_': {
                penalty_lowerbound: 15,
                single_penalty_length: 255,
                price_factor: 101,
            },
            'ALUM': {
                penalty_lowerbound: 7,
                single_penalty_length: 255,
                price_factor: 140,
            },
            'NH3_': {
                penalty_lowerbound: 32,
                single_penalty_length: 64,
                price_factor: 109,
            },
            'NHNO': {
                penalty_lowerbound: 32,
                single_penalty_length: 64,
                price_factor: 109,
            },
            'AORE': {
                penalty_lowerbound: 30,
                single_penalty_length: 255,
                price_factor: 81,
            },
            'BEAN': {
                penalty_lowerbound: 4,
                single_penalty_length: 40,
                price_factor: 119,
            },
            'BDMT': {
                penalty_lowerbound: 12,
                single_penalty_length: 255,
                price_factor: 133,
            },
            'CBLK': {
                penalty_lowerbound: 40,
                single_penalty_length: 255,
                price_factor: 153,
            },
            'STCB': {
                penalty_lowerbound: 14,
                single_penalty_length: 255,
                price_factor: 127,
            },
            'CASS': {
                penalty_lowerbound: 4,
                single_penalty_length: 40,
                price_factor: 105,
            },
            'CSTI': {
                penalty_lowerbound: 15,
                single_penalty_length: 255,
                price_factor: 120,
            },
            'CMNT': {
                penalty_lowerbound: 18,
                single_penalty_length: 255,
                price_factor: 118,
            },
            'RFPR': {
                penalty_lowerbound: 20,
                single_penalty_length: 255,
                price_factor: 115,
            },
            'CHLO': {
                penalty_lowerbound: 20,
                single_penalty_length: 40,
                price_factor: 115,
            },
            'CHRO': {
                penalty_lowerbound: 30,
                single_penalty_length: 255,
                price_factor: 58,
            },
            'CLAY': {
                penalty_lowerbound: 30,
                single_penalty_length: 255,
                price_factor: 100,
            },
            'SOAP': {
                penalty_lowerbound: 20,
                single_penalty_length: 255,
                price_factor: 121,
            },
            'COAL': {
                penalty_lowerbound: 40,
                single_penalty_length: 255,
                price_factor: 86,
            },
            'CTAR': {
                penalty_lowerbound: 64,
                single_penalty_length: 255,
                price_factor: 98,
            },
            'JAVA': {
                penalty_lowerbound: 0,
                single_penalty_length: 26,
                price_factor: 173,
            },
            'COKE': {
                penalty_lowerbound: 30,
                single_penalty_length: 255,
                price_factor: 97,
            },
            'COPR': {
                penalty_lowerbound: 7,
                single_penalty_length: 255,
                price_factor: 146,
            },
            'COCO': {
                penalty_lowerbound: 30,
                single_penalty_length: 255,
                price_factor: 109,
            },
            'CORE': {
                penalty_lowerbound: 30,
                single_penalty_length: 255,
                price_factor: 89,
            },
            'DIAM': {
                penalty_lowerbound: 30,
                single_penalty_length: 255,
                price_factor: 162,
            },
            'EOIL': {
                penalty_lowerbound: 20,
                single_penalty_length: 128,
                price_factor: 116,
            },
            'POWR': {
                penalty_lowerbound: 7,
                single_penalty_length: 255,
                price_factor: 148,
            },
            'ENSP': {
                penalty_lowerbound: 2,
                single_penalty_length: 32,
                price_factor: 172,
            },
            'C2H4': {
                penalty_lowerbound: 20,
                single_penalty_length: 40,
                price_factor: 157,
            },
            'BOOM': {
                penalty_lowerbound: 6,
                single_penalty_length: 42,
                price_factor: 158,
            },
            'FMSP': {
                penalty_lowerbound: 2,
                single_penalty_length: 32,
                price_factor: 170,
            },
            'FECR': {
                penalty_lowerbound: 40,
                single_penalty_length: 255,
                price_factor: 106,
            },
            'FERT': {
                penalty_lowerbound: 22,
                single_penalty_length: 44,
                price_factor: 123,
            },
            'FISH': {
                penalty_lowerbound: 0,
                single_penalty_length: 18,
                price_factor: 134,
            },
            'FOOD': {
                penalty_lowerbound: 0,
                single_penalty_length: 20,
                price_factor: 178,
            },
            'ENUM': {
                penalty_lowerbound: 20,
                single_penalty_length: 255,
                price_factor: 117,
            },
            'FORM': {
                penalty_lowerbound: 30,
                single_penalty_length: 255,
                price_factor: 109,
            },
            'FRUT': {
                penalty_lowerbound: 0,
                single_penalty_length: 26,
                price_factor: 124,
            },
            'FURN': {
                penalty_lowerbound: 12,
                single_penalty_length: 255,
                price_factor: 146,
            },
            'GLAS': {
                penalty_lowerbound: 12,
                single_penalty_length: 180,
                price_factor: 132,
            },
            'GOLD': {
                penalty_lowerbound: 30,
                single_penalty_length: 255,
                price_factor: 152,
            },
            'GOOD': {
                penalty_lowerbound: 10,
                single_penalty_length: 56,
                price_factor: 163,
            },
            'GRAI': {
                penalty_lowerbound: 4,
                single_penalty_length: 40,
                price_factor: 114,
            },
            'HYAC': {
                penalty_lowerbound: 24,
                single_penalty_length: 48,
                price_factor: 109,
            },
            'IORE': {
                penalty_lowerbound: 40,
                single_penalty_length: 255,
                price_factor: 90,
            },
            'KAOL': {
                penalty_lowerbound: 30,
                single_penalty_length: 255,
                price_factor: 100,
            },
            'LIME': {
                penalty_lowerbound: 38,
                single_penalty_length: 255,
                price_factor: 92,
            },
            'LVST': {
                penalty_lowerbound: 0,
                single_penalty_length: 15,
                price_factor: 122,
            },
            'WOOD': {
                penalty_lowerbound: 24,
                single_penalty_length: 255,
                price_factor: 104,
            },
            'LYE_': {
                penalty_lowerbound: 30,
                single_penalty_length: 255,
                price_factor: 108,
            },
            'MAIL': {
                penalty_lowerbound: 6,
                single_penalty_length: 24,
                price_factor: 167,
            },
            'MAIZ': {
                penalty_lowerbound: 4,
                single_penalty_length: 40,
                price_factor: 111,
            },
            'MNO2': {
                penalty_lowerbound: 30,
                single_penalty_length: 255,
                price_factor: 95,
            },
            'METL': {
                penalty_lowerbound: 7,
                single_penalty_length: 255,
                price_factor: 135,
            },
            'MEOH': {
                penalty_lowerbound: 20,
                single_penalty_length: 40,
                price_factor: 157,
            },
            'MILK': {
                penalty_lowerbound: 0,
                single_penalty_length: 16,
                price_factor: 131,
            },
            'NAPH': {
                penalty_lowerbound: 18,
                single_penalty_length: 255,
                price_factor: 103,
            },
            'NICK': {
                penalty_lowerbound: 15,
                single_penalty_length: 255,
                price_factor: 141,
            },
            'NITR': {
                penalty_lowerbound: 30,
                single_penalty_length: 255,
                price_factor: 103,
            },
            'O2__': {
                penalty_lowerbound: 22,
                single_penalty_length: 44,
                price_factor: 152,
            },
            'NUTS': {
                penalty_lowerbound: 4,
                single_penalty_length: 40,
                price_factor: 113,
            },
            'OIL_': {
                penalty_lowerbound: 30,
                single_penalty_length: 255,
                price_factor: 101,
            },
            'MNSP': {
                penalty_lowerbound: 16,
                single_penalty_length: 120,
                price_factor: 131,
            },
            'COAT': {
                penalty_lowerbound: 20,
                single_penalty_length: 255,
                price_factor: 135,
            },
            'PAPR': {
                penalty_lowerbound: 12,
                single_penalty_length: 60,
                price_factor: 143,
            },
            'PASS': {
                penalty_lowerbound: 0,
                single_penalty_length: 22,
                price_factor: 137,
            },
            'PEAT': {
                penalty_lowerbound: 30,
                single_penalty_length: 255,
                price_factor: 89,
            },
            'PETR': {
                penalty_lowerbound: 18,
                single_penalty_length: 255,
                price_factor: 145,
            },
            'PHOS': {
                penalty_lowerbound: 30,
                single_penalty_length: 255,
                price_factor: 99,
            },
            'PHAC': {
                penalty_lowerbound: 24,
                single_penalty_length: 48,
                price_factor: 109,
            },
            'IRON': {
                penalty_lowerbound: 8,
                single_penalty_length: 64,
                price_factor: 119,
            },
            'PIPE': {
                penalty_lowerbound: 30,
                single_penalty_length: 42,
                price_factor: 144,
            },
            'FICR': {
                penalty_lowerbound: 10,
                single_penalty_length: 36,
                price_factor: 107,
            },
            'PLAS': {
                penalty_lowerbound: 12,
                single_penalty_length: 36,
                price_factor: 141,
            },
            'POTA': {
                penalty_lowerbound: 30,
                single_penalty_length: 255,
                price_factor: 102,
            },
            'C3H6': {
                penalty_lowerbound: 20,
                single_penalty_length: 40,
                price_factor: 157,
            },
            'PORE': {
                penalty_lowerbound: 30,
                single_penalty_length: 255,
                price_factor: 87,
            },
            'QLME': {
                penalty_lowerbound: 8,
                single_penalty_length: 255,
                price_factor: 112,
            },
            'LATX': {
                penalty_lowerbound: 10,
                single_penalty_length: 36,
                price_factor: 110,
            },
            'RBAR': {
                penalty_lowerbound: 30,
                single_penalty_length: 42,
                price_factor: 150,
            },
            'RCYC': {
                penalty_lowerbound: 10,
                single_penalty_length: 128,
                price_factor: 100,
            },
            'RUBR': {
                penalty_lowerbound: 10,
                single_penalty_length: 36,
                price_factor: 110,
            },
            'SALT': {
                penalty_lowerbound: 36,
                single_penalty_length: 255,
                price_factor: 94,
            },
            'SAND': {
                penalty_lowerbound: 64,
                single_penalty_length: 255,
                price_factor: 93,
            },
            'SCMT': {
                penalty_lowerbound: 36,
                single_penalty_length: 255,
                price_factor: 107,
            },
            'SLAG': {
                penalty_lowerbound: 64,
                single_penalty_length: 255,
                price_factor: 85,
            },
            'SASH': {
                penalty_lowerbound: 14,
                single_penalty_length: 255,
                price_factor: 96,
            },
            'STST': {
                penalty_lowerbound: 16,
                single_penalty_length: 255,
                price_factor: 130,
            },
            'STEL': {
                penalty_lowerbound: 14,
                single_penalty_length: 255,
                price_factor: 127,
            },
            'STSE': {
                penalty_lowerbound: 14,
                single_penalty_length: 255,
                price_factor: 142,
            },
            'STSH': {
                penalty_lowerbound: 14,
                single_penalty_length: 255,
                price_factor: 139,
            },
            'STWR': {
                penalty_lowerbound: 30,
                single_penalty_length: 42,
                price_factor: 138,
            },
            'GRVL': {
                penalty_lowerbound: 30,
                single_penalty_length: 255,
                price_factor: 92,
            },
            'SGCN': {
                penalty_lowerbound: 5,
                single_penalty_length: 30,
                price_factor: 116,
            },
            'SGBT': {
                penalty_lowerbound: 5,
                single_penalty_length: 30,
                price_factor: 99,
            },
            'SULP': {
                penalty_lowerbound: 30,
                single_penalty_length: 255,
                price_factor: 105,
            },
            'SUAC': {
                penalty_lowerbound: 24,
                single_penalty_length: 48,
                price_factor: 109,
            },
            'TEXT': {
                penalty_lowerbound: 7,
                single_penalty_length: 255,
                price_factor: 151,
            },
            'WDPR': {
                penalty_lowerbound: 18,
                single_penalty_length: 255,
                price_factor: 117,
            },
            'TIN_': {
                penalty_lowerbound: 12,
                single_penalty_length: 255,
                price_factor: 141,
            },
            'TINP': {
                penalty_lowerbound: 14,
                single_penalty_length: 255,
                price_factor: 153,
            },
            'TYRE': {
                penalty_lowerbound: 8,
                single_penalty_length: 255,
                price_factor: 149,
            },
            'UREA': {
                penalty_lowerbound: 20,
                single_penalty_length: 255,
                price_factor: 117,
            },
            'VEHI': {
                penalty_lowerbound: 15,
                single_penalty_length: 128,
                price_factor: 164,
            },
            'VBOD': {
                penalty_lowerbound: 5,
                single_penalty_length: 255,
                price_factor: 147,
            },
            'VENG': {
                penalty_lowerbound: 6,
                single_penalty_length: 255,
                price_factor: 151,
            },
            'VPTS': {
                penalty_lowerbound: 7,
                single_penalty_length: 255,
                price_factor: 150,
            },
            'WOOL': {
                penalty_lowerbound: 8,
                single_penalty_length: 48,
                price_factor: 111,
            },
            'YARN': {
                penalty_lowerbound: 8,
                single_penalty_length: 90,
                price_factor: 98,
            },
            'ZINC': {
                penalty_lowerbound: 12,
                single_penalty_length: 255,
                price_factor: 126,
            },

        }
    }
}

const FIRS_4_15_0: IndustryVersion = {
    version: '4.15.0',
    economies: new Map<string, new () => Economy<any>>([
        ['Steeltown', FIRS_4_15_0_Steeltown]
    ])
}

export default FIRS_4_15_0;