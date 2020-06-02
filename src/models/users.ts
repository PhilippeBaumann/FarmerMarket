/*
 * Copyright (c) 2020. - Philippe Baumann , All rights reserved.
 */

export class User {

    public _id: number;
    public _firstname: string;
    public _lastname: string;
    public _phone: string;
    public _token: string;

    constructor(firstname: string, lastname: string, token: string, phone: string) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.phone = phone;
        this.token = token;
    }

    // Getters & setters

    get firstname(): string {
        return this.firstname;
    }

    set firstname(value: string) {
        this.firstname = value;
    }

    get lastname(): string {
        return this.lastname;
    }

    set lastname(value: string) {
        this.lastname = value;
    }

    get phone(): string {
        return this.phone;
    }

    set phone(value: string) {
        this.phone = value;
    }
    
    get token(): string {
        return this.token;
    }

    set token(value: string) {
        this.token = value;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }
}