/*
 * Copyright (c) 2020. - Philippe Baumann , All rights reserved.
 */

export class Vegetable {

    public _id: number;
    public _name: string;
    public _details: string;
    public _unit_id: number;
    public _stock: number;
    public _picture: string;
    public _price: number;
    public _current: number;
    public _created_at: number;
    public _updated_at: number;

    constructor(name: string, details: string, unit_id: number, stock: number, picture: string, price: number) {
        this.name = name;
        this.details = details;
        this.unit_id = unit_id;
        this.stock = stock;
        this.picture = picture;
        this.price = price;        
    }

    // Getters & setters

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get unit_id(): number {
        return this._unit_id;
    }

    set unit_id(value: number) {
        this._unit_id = value;
    }

    get details(): string {
        return this._details;
    }

    set details(value: string) {
        this._details = value;
    }

    get stock(): number {
        return this._stock;
    }

    set stock(value: number) {
        this._stock = value;
    }

    get picture(): string {
        return this._picture;
    }

    set picture(value: string) {
        this._picture = value;
    }

    get price(): number {
        return this._price;
    }
    set price(value: number) {
        this._price = value;
    }    
}