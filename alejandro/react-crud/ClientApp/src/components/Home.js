import React, { Component } from 'react';

export class Crear extends Component {
  displayName = Crear.name

  render() {
      return (
          <div class="row">
              <div class="card card-body col-md-12">
                  <label class="card-title"><h1 class="text-center">Crear usuario</h1></label>
                  <div class="form-group row">
                      <div class="col-sm-3">
                          <label for="id">ID</label>
                      </div>
                      <div class="col-sm-9">
                          <input type="text" class="form-control" id="id" placeholder="ID del Usuario"></input>
                      </div>
                  </div>
                  <div class="form-group row">
                      <div class="col-sm-3">
                          <label for="name">Nombre</label>
                      </div>
                      <div class="col-sm-9">
                          <input type="text" class="form-control" id="name" placeholder="Nombre del usuario"></input>
                      </div>
                  </div>
                  <div class="form-group row">
                      <div class="col-sm-3">
                          <label for="age">Edad</label>
                      </div>
                      <div class="col-sm-9">
                          <input type="number" class="form-control" id="age" placeholder="Edad del usuario"></input>
                      </div>
                  </div>

                  <div class="form-group row">
                      <div class="col-sm-3">
                          <label for="gender">Sexo</label>
                      </div>
                      <div class="col-sm-9">
                          <select id="gender" width="70%" class="form-control select2">
                              <option value="0">---</option>
                              <option value="male">Masculino</option>
                              <option value="female">Femenino</option>
                          </select>
                      </div>
                  </div>
                  <div class="row text-center">
                      <button type="submit" class="btn btn-success waves">Registrar</button>
                  </div>
              </div>
          </div>
    );
  }
}
