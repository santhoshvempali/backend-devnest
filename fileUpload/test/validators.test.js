const { validateName,validateEmail,validatePassword } = require("../utils/validators");

var expect=require("chai").expect;

describe("testing validators",function(){
    it("should return true for a valid name",function(){
        expect(validateName("santhosh")).to.equal(true)
    })
    it("should return false for a invalid name",function(){
        expect(validateName("santhosh123")).to.equal(false)
    })
    it("shoud returs true for valid mail",function(){
        expect(validateEmail("vepali@gmil.com")).to.equal(true)
    })
    it("should return false for invalid mail id",function(){
        expect(validateEmail("123456.gamail.com")).to.equal(false)
    })
    it("should return true for strong password",function(){
        expect(validatePassword("HelloWorld@6")).to.equal(true)
    })
    it("should return false for weak password",function(){
        expect(validatePassword("12345678")).to.equal(false)
    })
})