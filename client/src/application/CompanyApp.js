import { makeAutoObservable } from 'mobx';

export default class CompanyApp {
  constructor() {
    this._company = {};
    this._balances = [];
    this._selectedBalance = {};
    this._page = 1;
    this._totalCount = 0;
    this._limit = 3;
    makeAutoObservable(this);
  }

  setCompany(company) {
    this._company = company;
  }

  setBalances(balances) {
    this._balances = balances;
  }


  setselectedBalance(balance) {
    this.setPage(1);
    this._selectedBalance = balance;
  }
  setPage(page) {
    this._page = page;
  }
  setTotalCount(count) {
    this._totalCount = count;
  }

  get company() {
    return this._company;
  }

  get balances() {
    return this._balances;
  }

  get selectedBalance() {
    return this._selectedBalance;
  }
  get totalCount() {
    return this._totalCount;
  }
  get page() {
    return this._page;
  }
  get limit() {
    return this._limit;
  }
}


/* id: 1,
name: 'Intel',
logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Intel_logo_%282020%2C_light_blue%29.svg/200px-Intel_logo_%282020%2C_light_blue%29.svg.png',
img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/2200missioncollegeblvd.jpg/274px-2200missioncollegeblvd.jpg',
info: {
	legal_address: 'США: Санта-Клара (Калифорния)',
	industry: [
		'Semiconductors',
		'Computer hardware',
		'Autonomous cars',
		'Automation',
		'Artificial intelligence',
	],
	founded: 'July 18, 1968',
	founders: ['Гордон Мур', 'Роберт Нойс', 'Эндрю Гроув'],
	website: 'https://www.intel.ru',
}, */