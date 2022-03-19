export interface Total {
	nowConfirm: number;
	confirm: number;
	dead: number;
	showRate: boolean;
	heal: number;
	showHeal: boolean;
	wzz: number;
	provinceLocalConfirm: number;
}

export interface Today {
	tip: string;
	wzz_add: number;
	confirm: number;
	confirmCuts: number;
	isUpdated: boolean;
}

export interface Total {
	wzz: number;
	provinceLocalConfirm: number;
	nowConfirm: number;
	confirm: number;
	dead: number;
	showRate: boolean;
	heal: number;
	showHeal: boolean;
}

export interface Today {
	confirm: number;
	confirmCuts: number;
	isUpdated: boolean;
}

export interface Total {
	showRate: boolean;
	heal: number;
	showHeal: boolean;
	wzz: number;
	provinceLocalConfirm: number;
	nowConfirm: number;
	confirm: number;
	dead: number;
}

export interface Children {
	name: string;
	today: Today;
	total: Total;
}

export interface Children {
	name: string;
	today: Today;
	total: Total;
	children: Children[];
}

export interface Today {
	isUpdated: boolean;
	confirm: number;
}

export interface AreaTree {
	total: Total;
	children: Children[];
	name: string;
	today: Today;
}

export interface ChinaTotal {
	showLocalConfirm: number;
	localConfirm: number;
	nowSevere: number;
	importedCase: number;
	noInfectH5: number;
	localConfirmH5: number;
	confirm: number;
	nowConfirm: number;
	suspect: number;
	showlocalinfeciton: number;
	local_acc_confirm: number;
	heal: number;
	dead: number;
	noInfect: number;
}

export interface ChinaAdd {
	heal: number;
	dead: number;
	nowConfirm: number;
	noInfect: number;
	localConfirm: number;
	localConfirmH5: number;
	confirm: number;
	suspect: number;
	nowSevere: number;
	importedCase: number;
	noInfectH5: number;
}

export interface ShowAddSwitch {
	all: boolean;
	dead: boolean;
	heal: boolean;
	localinfeciton: boolean;
	confirm: boolean;
	suspect: boolean;
	nowConfirm: boolean;
	nowSevere: boolean;
	importedCase: boolean;
	noInfect: boolean;
	localConfirm: boolean;
}

export interface Diseaseh5Shelf {
	areaTree: AreaTree[];
	lastUpdateTime: string;
	chinaTotal: ChinaTotal;
	chinaAdd: ChinaAdd;
	isShowAdd: boolean;
	showAddSwitch: ShowAddSwitch;
}

export interface StatisGradeCityDetail {
	heal: number;
	syear: number;
	city: string;
	confirmAdd: number;
	confirm: number;
	dead: number;
	sdate: string;
	province: string;
	nowConfirm: number;
	grade: string;
	date: string;
}

export interface RootObject {
	diseaseh5Shelf: Diseaseh5Shelf;
	statisGradeCityDetail: StatisGradeCityDetail[];
}