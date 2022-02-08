import React from "react";
import {hacerLogin} from "./Login";

describe("Login", async ()  => {
  it("Enviar Login", () => {
    //const tree = renderer.create(<App />).toJSON();
    const res = hacerLogin('emprendedor@gmail.com','12345');
    //console.log(res)
     expect(res).toBe(0);
  });
});