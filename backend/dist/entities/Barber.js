"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Barber = void 0;
const typeorm_1 = require("typeorm");
const Appointment_1 = require("./Appointment");
let Barber = class Barber {
    constructor(name, email, password, number, adminplus = false) {
        if (name)
            this.name = name;
        if (email)
            this.email = email;
        if (password)
            this.password = password;
        if (number !== undefined)
            this.number = number;
        this.adminplus = adminplus;
    }
};
exports.Barber = Barber;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Barber.prototype, "id_barber", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Barber.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, nullable: false }),
    __metadata("design:type", String)
], Barber.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Barber.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Barber.prototype, "number", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: 'barber' }),
    __metadata("design:type", String)
], Barber.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: false }),
    __metadata("design:type", Boolean)
], Barber.prototype, "adminplus", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Appointment_1.Appointment, appointment => appointment.barber),
    __metadata("design:type", Array)
], Barber.prototype, "appointments", void 0);
exports.Barber = Barber = __decorate([
    (0, typeorm_1.Entity)("barbers"),
    __metadata("design:paramtypes", [String, String, String, String, Boolean])
], Barber);
