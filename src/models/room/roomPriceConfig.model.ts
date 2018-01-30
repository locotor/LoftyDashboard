export class RoomPriceConfig {
    UID: string;
    private _priceDateStart: Date;
    private _priceDateEnd: Date;
    get PriceDateStart (): Date | string {
        return this._priceDateStart;
    }
    set PriceDateStart (value: Date | string) {
        if (typeof value === "string") {
            let exp: RegExp = /(\/Date\()|(\)\/)/g;
            this._priceDateStart = new Date(+(value.replace(exp, "")));
        } else {
            this._priceDateStart = value;
        }
    }
    get PriceDateEnd (): Date | string {
        return this._priceDateEnd;
    }
    set PriceDateEnd (value: Date | string) {
        if (typeof value === "string") {
            let exp: RegExp = /(\/Date\()|(\)\/)/g;
            this._priceDateEnd = new Date(+(value.replace(exp, "")));
        } else {
            this._priceDateEnd = value;
        }
    }
    PriceDateStartString: string;
    PriceDateEndString: string;
    PricePercent: number;
    ExtraPrice: number;

    constructor(
        UID: string,
        priceDateStart: Date | string,
        priceDateEnd: Date | string,
        priceDateStartString: string,
        priceDateEndString: string,
        pricePercent: number,
        extraPrice: number) {
        this.UID = UID;
        this.PriceDateStart = priceDateStart;
        this.PriceDateEnd = priceDateEnd;
        this.PriceDateStartString = priceDateStartString;
        this.PriceDateEndString = priceDateEndString;
        this.PricePercent = pricePercent;
        this.ExtraPrice = extraPrice;
    }
}